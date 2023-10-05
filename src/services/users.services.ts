import { LoginRequestBody, UserRequestBody } from "~/models/requests/user.requests";
import { db } from "./database.services";
import User from "~/schema/user.schema";
import RefreshToken from "~/schema/refresh-token.schema";
import { ObjectId } from "mongodb";
import { hashPassword, comparePassword } from "~/utils/password";
import { signToken } from "~/utils/jwt";

class UsersService {
	private signRefreshToken(userId: string) {
		return signToken({
			payload: {
				userId,
			},
			options: {
				expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
			},
		});
	}
	private signAccessToken(userId: string) {
		return signToken({
			payload: {
				userId,
			},
			options: {
				expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
			},
		});
	}
	async register(data: UserRequestBody) {
		const { email, password, username, date_of_birth } = data;

		const existedEmail = await db.users.findOne({
			$or: [{ email }, { username }],
		});

		if (existedEmail) {
			throw new Error("Email or username already existed");
		}

		const hashedPassword = await hashPassword(password);

		const user = await db.users.insertOne(
			new User({
				email,
				password: hashedPassword,
				_id: new ObjectId(),
				date_of_birth: new Date(date_of_birth),
				username,
			}),
		);

		const [accessToken, refreshToken] = await Promise.all([
			this.signAccessToken(user.insertedId.toString()),
			this.signRefreshToken(user.insertedId.toString()),
		]);

		return { user, accessToken, refreshToken };
	}
	async login(data: LoginRequestBody) {
		const { email, password } = data;

		const user = await db.users.findOne({ email });

		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordCorrect = await comparePassword({
			hashedPassword: user.password,
			password,
		});

		if (!isPasswordCorrect) {
			throw new Error("Password is incorrect");
		}

		const [accessToken, refreshToken] = await Promise.all([
			this.signAccessToken(user._id.toString()),
			this.signRefreshToken(user._id.toString()),
		]);

		if (typeof refreshToken !== "string" || typeof accessToken !== "string") {
			throw new Error("Token is not a string");
		}

		db.refreshToken.insertOne(
			new RefreshToken({
				_id: new ObjectId(),
				created_at: new Date(),
				token: refreshToken,
				user_id: user._id,
			}),
		);

		return { accessToken, refreshToken };
	}
}

const userServices = new UsersService();

export default userServices;
