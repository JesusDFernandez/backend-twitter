import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createLike, getLikes, updateLike } from "../controllers/like.controller.js";

const router = Router();

router.post("/likes", auth, createLike);
router.get("/likes/:id", auth, getLikes);
router.put("/likes/:id", auth, updateLike);


export default router;
