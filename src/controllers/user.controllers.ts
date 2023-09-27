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
	const { email, password } = req.body;

	if (!email || !password) {
		throw new Error("Email and password are required");
	}

	if (typeof email !== "string" || typeof password !== "string") {
		throw new Error("Email and password must be string");
	}

	try {
		const user = await db.users.insertOne(
			new User({ email, password, _id: new ObjectId(), date_of_birth: new Date(), username: "abc" }),
		);

		return res.json({
			message: "Register success",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error: "Register failed",
		});
	}
};

export { userController, registerController };
