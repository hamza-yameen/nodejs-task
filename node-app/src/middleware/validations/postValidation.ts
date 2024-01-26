import { body } from "express-validator";

export const postValidationRules = [
	body("title").isString().notEmpty(),
	body("description").isString().notEmpty(),
];
