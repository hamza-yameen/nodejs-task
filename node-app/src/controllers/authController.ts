import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import { apiResponseHandler } from "../helpers/apiResponseUtils";
import {
	BadRequestException,
	UnprocessableEntityException,
} from "../libs/httpExceptionSchema";
import ResponseMessages from "../libs/errorMessages";
import prisma from "../helpers/prismaBase";
import { signJWT } from "../helpers/jwtUtils";
import { IUser, IregisterUserResponse } from "../interfaces/user";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const errors: any = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(apiResponseHandler(400, { error: errors.array() }));
	}

	const { userName, email, password } = req.body;
	//Check UserName
	const getUserByName: IUser | null = await prisma.user.findFirst({
		where: {
			userName: userName,
		},
	});
	if (getUserByName)
		return next(
			new BadRequestException(ResponseMessages.USERNAME_ALREADY_EXISTS)
		);

	//Check UserName
	const getUserByEmail: IUser | null = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});
	if (getUserByEmail)
		return next(new BadRequestException(ResponseMessages.EMAIL_ALREADY_EXISTS));

	let createdUser: IUser;
	try {
		createdUser = await prisma.user.create({
			data: {
				userName: userName,
				email: email,
				password: bcrypt.hashSync(password, 8),
			},
		});
	} catch (error) {
		return next(
			new UnprocessableEntityException(ResponseMessages.FAILED_TO_SAVE_USER)
		);
	}

	// Token assign
	const token: any = await signJWT({
		userId: createdUser.id,
		userEmail: createdUser.email,
	});

	const data: IregisterUserResponse = {
		id: createdUser.id,
		userName: createdUser.userName,
		email: createdUser.email,
		token: token,
		createdAt: createdUser.createdAt,
	};

	return res.status(200).json(apiResponseHandler(200, data));
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const errors: any = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(apiResponseHandler(400, { error: errors.array() }));
	}

	// check Email and password
	const { email, password } = req.body;
	const getUser: IUser | null = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});
	if (!getUser) {
		return next(
			new BadRequestException(ResponseMessages.ENTER_VALIDE_CREDENTIALS)
		);
	}
	const passwordIsValid = bcrypt.compareSync(password, getUser.password);
	if (!passwordIsValid) {
		return next(
			new BadRequestException(ResponseMessages.ENTER_VALIDE_CREDENTIALS)
		);
	}

	// Token assign
	const token: any = await signJWT({
		userId: getUser.id,
		userName: getUser.userName,
		userEmail: getUser.email,
	});

	const data: IregisterUserResponse = {
		id: getUser.id,
		userName: getUser.userName,
		email: getUser.email,
		token: token,
		createdAt: getUser.createdAt,
	};

	return res.status(200).json(apiResponseHandler(200, data));
};

const authController = {
	register,
	login,
};

export default authController;
