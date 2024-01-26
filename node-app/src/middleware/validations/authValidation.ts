import { body } from "express-validator";

export const registrationValidationRules = [
	body("email").isEmail().notEmpty(),
	body("password").isLength({ min: 8 }),
	body("userName").isString().notEmpty(),
];

export const loginValidationRules = [
	body("email").isEmail().notEmpty(),
	body("password").notEmpty(),
];
