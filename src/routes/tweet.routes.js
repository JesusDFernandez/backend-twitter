import { Router } from "express";
import { createTweet, getTweets, getTweet, deleteTweet, getTweetId } from "../controllers/tweet.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTweetSchema } from "../schemas/tweet.schema.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/tweets", auth, getTweets);
router.post("/tweets", auth, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), validateSchema(createTweetSchema), createTweet);
router.get("/tweets/id/:id", auth, getTweet);
router.get("/tweet/:id", auth, getTweetId);
router.delete("/tweets/:id", auth, deleteTweet);

export default router;
