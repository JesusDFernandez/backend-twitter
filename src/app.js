import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import commentsRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";
import likeRoutes from "./routes/like.routes.js";
import tweetsRoutes from "./routes/tweet.routes.js";
import followRoutes from "./routes/follow.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", tweetsRoutes);
app.use("/api", commentsRoutes);
app.use("/api", userRoutes);
app.use("/api", likeRoutes);
app.use("/api", followRoutes);

export default app;