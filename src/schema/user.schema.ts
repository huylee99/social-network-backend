import type { ObjectId } from "mongodb";

enum UserVerifyStatus {
	UNVERIFIED,
	VERIFIED,
	BANNED,
}

interface User {
	_id: ObjectId;
	username: string;
	password: string;
	email: string;
	date_of_birth: Date;
	created_at?: Date;
	updated_at?: Date;
	avatar?: string;
	cover?: string;
	bio?: string;
	email_verify_token?: string;
	forgot_password_token?: string;
	verify_status?: UserVerifyStatus;
	website?: string;
	location?: string;
}

class User {
	constructor(user: User) {
		this._id = user._id;
		this.username = user.username;
		this.password = user.password;
		this.email = user.email;
		this.date_of_birth = user.date_of_birth;
		this.created_at = user.created_at;
		this.updated_at = user.updated_at;
		this.avatar = user.avatar;
		this.cover = user.cover;
		this.bio = user.bio;
		this.email_verify_token = user.email_verify_token;
		this.forgot_password_token = user.forgot_password_token;
		this.verify_status = user.verify_status;
		this.website = user.website;
		this.location = user.location;
	}
}

export default User;
