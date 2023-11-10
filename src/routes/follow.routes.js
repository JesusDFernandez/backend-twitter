import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createFollow, deleteFollow, getfollow } from "../controllers/follow.controller.js";

const router = Router();

router.get("/follows", auth, getfollow);
router.post("/follow", auth, createFollow);
router.delete("/follow/:id", auth, deleteFollow);

export default router;
