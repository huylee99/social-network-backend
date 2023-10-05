import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 8;

const hashPassword = async (password: string): Promise<string> => {
	return await hash(password, SALT_ROUNDS);
};

const comparePassword = async ({
	password,
	hashedPassword,
}: {
	password: string;
	hashedPassword: string;
}): Promise<boolean> => {
	return await compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
