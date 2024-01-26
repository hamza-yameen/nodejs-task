import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { apiResponseHandler } from "../helpers/apiResponseUtils";
import {
	NotFoundException,
	UnprocessableEntityException,
} from "../libs/httpExceptionSchema";
import ResponseMessages from "../libs/errorMessages";
import prisma from "../helpers/prismaBase";
import { IPost, INewPostCreateResponse } from "../interfaces/post";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	const errors: any = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(400)
			.json(apiResponseHandler(400, { error: errors.array() }));
	}

	const { title, description } = req.body;
	let createNewPost: IPost;
	try {
		createNewPost = await prisma.post.create({
			data: {
				title: title,
				description: description,
			},
		});
	} catch (error) {
		return next(
			new UnprocessableEntityException(ResponseMessages.FAILED_TO_SAVE_POST)
		);
	}

	const data: INewPostCreateResponse = {
		id: createNewPost.id,
		title: createNewPost.title,
		description: createNewPost.description,
		createdAt: createNewPost.createdAt,
	};

	return res.status(200).json(apiResponseHandler(200, data));
};

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
	const posts: IPost[] = await prisma.post.findMany();
	return res
		.status(200)
		.json(apiResponseHandler(200, { posts: posts, totalPost: posts.length }));
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
	const postId = req.params.id;
	const getPost: IPost | null = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});
	if (!getPost) {
		return next(new NotFoundException(ResponseMessages.POST_NO_ROUTE_FOUND));
	}

	return res.status(200).json(apiResponseHandler(200, { post: getPost }));
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	const postId = req.params.id;

	const getPost: IPost | null = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});
	if (!getPost) {
		return next(new NotFoundException(ResponseMessages.POST_NO_ROUTE_FOUND));
	}

	try {
		await prisma.post.delete({
			where: { id: postId },
		});
	} catch (err) {
		return next(
			new UnprocessableEntityException(ResponseMessages.FAILED_TO_DELETE_POST)
		);
	}

	return res
		.status(200)
		.json(apiResponseHandler(200, { message: "Post Deleted" }));
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	const postId = req.params.id;

	const getPost: IPost | null = await prisma.post.findFirst({
		where: {
			id: postId,
		},
	});
	if (!getPost) {
		return next(new NotFoundException(ResponseMessages.POST_NO_ROUTE_FOUND));
	}

	const { title, description } = req.body;
	let updatePost: IPost;
	try {
		updatePost = await prisma.post.update({
			where: { id: postId },
			data: {
				title: title,
				description: description,
			},
		});
	} catch (error) {
		return next(
			new UnprocessableEntityException(ResponseMessages.FAILED_TO_UPDATE_POST)
		);
	}

	return res
		.status(200)
		.json(apiResponseHandler(200, { updatedPost: updatePost }));
};

const postController = {
	createPost,
	getAllPosts,
	getPostById,
	deletePost,
	updatePost,
};

export default postController;
