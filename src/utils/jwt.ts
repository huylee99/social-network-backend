import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
	throw new Error("JWT_SECRET is not defined");
}

const signToken = ({
	payload,
	privateKey = secret,
	options,
}: {
	payload: any;
	privateKey?: string;
	options: jwt.SignOptions;
}): Promise<string | Error | null> => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, function (err, token) {
			if (err) {
				reject(err);
			}
			resolve(token as string);
		});
	});
};

export { signToken };
