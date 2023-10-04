import { Request, Response, NextFunction } from "express";
import { object, string, email as emailValidator, minLength, date, isoTimestamp, parse } from "valibot";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const UserSchema = object({
			username: string([minLength(6, "Username must be at least 6 characters")]),
			email: string([emailValidator("Email is invalid")]),
			date_of_birth: string([isoTimestamp("Date of birth is invalid")]),
			password: string([minLength(6, "Password must be at least 6 characters")]),
		});

		parse(UserSchema, req.body);

		next();
	} catch (errors) {
		return res.status(400).json({
			errors,
		});
	}
};

export { userMiddleware };
