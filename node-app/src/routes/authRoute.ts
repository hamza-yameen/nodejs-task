import express, { Router } from "express";
import authController from "../controllers/authController";
import {
	registrationValidationRules,
	loginValidationRules,
} from "../middleware/validations/authValidation";

const router: Router = express.Router();

router.post("/register", registrationValidationRules, authController.register);
router.post("/login", loginValidationRules, authController.login);

module.exports = router;
