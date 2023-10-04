import { Request, Response } from "express";
import { db } from "~/services/database.services";
import User from "~/schema/user.schema";
import { ObjectId } from "mongodb";

const userController = (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (email === "123123" && password === "123123") {
		return res.json({
			message: "Login success",
		});
	}

	return res.status(400).json({
		error: "Login failed",
	});
};

const registerController = async (req: Request, res: Response) => {
	const { email, password, username, date_of_birth } = req.body;

	try {
		const existedEmail = await db.users.findOne({
			$or: [{ email }, { username }],
		});

		if (existedEmail) {
			return res.status(400).json({
				error: "Email or username already existed",
			});
		}

		const user = await db.users.insertOne(
			new User({ email, password, _id: new ObjectId(), date_of_birth, username }),
		);

		return res.json({
			message: "Register success",
			result: user,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error: "Register failed",
		});
	}
};

export { userController, registerController };
