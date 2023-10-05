import { UserRequestBody } from "~/models/requests/user.requests";
import { db } from "./database.services";
import User from "~/schema/user.schema";
import { ObjectId } from "mongodb";

class UsersService {
	async register(data: UserRequestBody) {
		const { email, password, username, date_of_birth } = data;

		const existedEmail = await db.users.findOne({
			$or: [{ email }, { username }],
		});

		if (existedEmail) {
			throw new Error("Email or username already existed");
		}

		const user = await db.users.insertOne(
			new User({
				email,
				password,
				_id: new ObjectId(),
				date_of_birth: new Date(date_of_birth),
				username,
			}),
		);

		return user;
	}
}

const userServices = new UsersService();

export default userServices;
