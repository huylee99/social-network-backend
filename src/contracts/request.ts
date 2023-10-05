import * as Express from "express";

export interface RequestBodyType<T> extends Express.Request {
	body: T;
}
