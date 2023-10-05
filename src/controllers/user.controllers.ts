import { NextFunction, type Response } from "express";
import userServices from "~/services/users.services";
import { UserRequestBody, LoginRequestBody } from "~/models/requests/user.requests";
import { type RequestBodyType } from "~/contracts/request";

const registerController = async (req: RequestBodyType<UserRequestBody>, res: Response, next: NextFunction) => {
	try {
		const { accessToken, refreshToken, user } = await userServices.register(req.body);

		res.cookie("accessToken", accessToken, {
			sameSite: "strict",
			secure: true,
			httpOnly: true,
		});

		res.cookie("refreshToken", refreshToken, {
			sameSite: "strict",
			secure: true,
			httpOnly: true,
		});

		return res.json({
			message: "Register success",
			result: user,
		});
	} catch (error) {
		next(error);
	}
};

const loginController = async (req: RequestBodyType<LoginRequestBody>, res: Response, next: NextFunction) => {
	try {
		const { accessToken, refreshToken } = await userServices.login(req.body);

		res.cookie("accessToken", accessToken, {
			sameSite: "strict",
			secure: true,
			httpOnly: true,
		});

		res.cookie("refreshToken", refreshToken, {
			sameSite: "strict",
			secure: true,
			httpOnly: true,
		});
	} catch (error) {
		next(error);
	}
};

export { registerController, loginController };
