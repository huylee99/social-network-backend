import { Request, Response, NextFunction } from "express";
import { parse, ValiError } from "valibot";
import { UserSchema } from "~/models/requests/user.requests";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		parse(UserSchema, req.body);
		next();
	} catch (errors: unknown) {
		if (errors instanceof ValiError) {
			next(errors.issues);
		}
	}
};

export { userMiddleware };
