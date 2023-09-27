import { Request, Response } from "express";

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

export { userController };
