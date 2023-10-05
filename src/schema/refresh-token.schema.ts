import type { ObjectId } from "mongodb";

interface RefreshToken {
	_id: ObjectId;
	user_id: ObjectId;
	token: string;
	created_at: Date;
}

class RefreshToken {
	constructor(refreshToken: RefreshToken) {
		this._id = refreshToken._id;
		this.user_id = refreshToken.user_id;
		this.token = refreshToken.token;
		this.created_at = refreshToken.created_at;
	}
}

export default RefreshToken;
