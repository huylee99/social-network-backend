import { Request, Response, NextFunction } from "express";
import { parse } from "valibot";
import { UserSchema } from "~/models/requests/user.requests";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		parse(UserSchema, req.body);
		next();
	} catch (errors) {
		return res.status(400).json({
			errors,
		});
	}
};

export { userMiddleware };
