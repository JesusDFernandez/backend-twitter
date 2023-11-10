import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getUser, getUsers, updateUser, getUserId } from "../controllers/user.controller.js";

const router = Router();

router.get("/usersAll/", auth, getUsers);
router.get("/users/", auth, getUser);
router.get("/user/:id", auth, getUserId);
router.put("/users/", auth, updateUser);


export default router;
