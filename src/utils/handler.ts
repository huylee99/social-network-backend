import { RequestHandler, Request, Response, NextFunction } from "express";

const errorHandlerWrapper = (handler: RequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

export { errorHandlerWrapper };
