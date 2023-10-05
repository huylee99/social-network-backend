import { type Response } from "express";
import userServices from "~/services/users.services";
import { UserRequestBody } from "~/models/requests/user.requests";
import { type RequestBodyType } from "~/contracts/request";

const registerController = async (req: RequestBodyType<UserRequestBody>, res: Response) => {
	try {
		const user = await userServices.register(req.body);

		return res.json({
			message: "Register success",
			result: user,
		});
	} catch (error) {
		return res.status(400).json({
			error: "Register failed",
		});
	}
};

export { registerController };
