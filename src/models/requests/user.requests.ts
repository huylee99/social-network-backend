import { object, string, email as emailValidator, minLength, isoTimestamp, type Input } from "valibot";

export const UserSchema = object({
	username: string("Your username must be a string", [minLength(6, "Username must be at least 6 characters")]),
	email: string("Your email must be a string", [emailValidator("Email is invalid")]),
	date_of_birth: string([isoTimestamp("Date of birth is invalid")]),
	password: string([
		minLength(1, "Please enter your password"),
		minLength(6, "Password must be at least 6 characters"),
	]),
});

export const LoginSchema = object({
	email: string("Your email must be a string", [emailValidator("Email is invalid")]),
	password: string([
		minLength(1, "Please enter your password"),
		minLength(6, "Password must be at least 6 characters"),
	]),
});

export type UserRequestBody = Input<typeof UserSchema>;
export type LoginRequestBody = Input<typeof LoginSchema>;
