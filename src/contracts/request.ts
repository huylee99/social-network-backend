import * as Express from "express";
import { Query } from "express-serve-static-core/index";

export interface RequestBodyType<T> extends Express.Request {
	body: T;
}

export interface RequestQueryType<T extends Query> extends Express.Request {
	params: T;
}
