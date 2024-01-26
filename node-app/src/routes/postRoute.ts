import express, { Router } from "express";
import postController from "../controllers/postController";
import { postValidationRules } from "../middleware/validations/postValidation";
import { authentication } from "../middleware/authentication/checkAuth";

const router: Router = express.Router();

router.get("/", [authentication], postController.getAllPosts);
router.post(
	"/create",
	[authentication],
	postValidationRules,
	postController.createPost
);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);

module.exports = router;
