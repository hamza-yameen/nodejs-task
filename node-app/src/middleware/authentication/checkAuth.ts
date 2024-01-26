import { Request, Response, NextFunction } from "express";

import ResponseMessages from "../../libs/errorMessages";
import {
	UnAuthorizedException,
	ForbiddenException,
} from "../../libs/httpExceptionSchema";
import { verifyJWT } from "../../helpers/jwtUtils";
import prisma from "../../helpers/prismaBase";

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token: any = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return next(
			new UnAuthorizedException(ResponseMessages.AUTHORIZATION_FAILED)
		);
	}
	const { payload, expired } = await verifyJWT(token);
	if (expired)
		return next(new ForbiddenException(ResponseMessages.TOKEN_EXPIRED));

	req.body.userData = payload;
	next();
};
