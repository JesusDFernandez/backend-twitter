import { Router } from "express";
import { createComment, getComments, deleteComment, getComment, updateComment } from "../controllers/comment.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCommentSchema } from "../schemas/comment.schema.js";

const router = Router();

router.post("/comments", auth, validateSchema(createCommentSchema), createComment);
router.get("/comments/:id", auth, getComments);
router.get("/comment/:id", auth, getComment);
router.put("/comments/:id", auth, updateComment);
router.delete("/comments/:id", auth, deleteComment);

export default router;
