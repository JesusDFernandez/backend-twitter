import Tweet from "../models/tweet.model.js";
import Like from "../models/like.model.js";
import commentModel from "../models/comment.model.js";
import fs from 'fs-extra'
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import { getfollow } from "./follow.controller.js";
import followModel from "../models/follow.model.js";

export const getTweets = async (req, res) => {
    try {

        const userIds = [];

        const follows = await followModel.find({ user: req.user.id });

        for (let i = 0; i < follows.length; i++) {
            const follow = follows[i];
            userIds.push(follow.following);
        }

        const Tweets = await Tweet.find({ $or: [{ user: req.user.id }, { user: { $in: userIds } }] }).populate("user");

        const like = await Like.find({ $and: [{ user: req.user.id }, { isTweet: true }] }).populate("user");

        const likeTweet = await Like.find({ isTweet: true });
        const comment = await commentModel.find({});

        res.json({ Tweets, like, likeTweet, comment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTweet = async (req, res) => {
    try {
        const { text } = req.body;
        const newTweet = new Tweet({
            text,
            user: req.user.id

        });


        if (req.files?.image) {

            const result = await uploadImage(req.files.image.tempFilePath);

            newTweet.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath);
        }


        await newTweet.save();
        res.json(newTweet);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteTweet = async (req, res) => {
    try {

        const deletedTweet = await Tweet.findByIdAndDelete(req.params.id);

        if (!deletedTweet)
            return res.status(404).json({ message: "Tweet no encontrada" });

        await deleteImage(deletedTweet.image.public_id);

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTweetId = async (req, res) => {

    try {

        const Tweets = await Tweet.find({ _id: req.params.id }).populate("user");
        const like = await Like.find({ $and: [{ user: req.user.id }, { isTweet: true }] }).populate("user");
        const likeTweet = await Like.find({ isTweet: true });
        const comment = await commentModel.find({});

        res.json({ Tweets, like, likeTweet, comment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
export const getTweet = async (req, res) => {
    try {

        const Tweets = await Tweet.find({ user: req.params.id }).populate("user");

        const like = await Like.find({ $and: [{ user: req.user.id }, { isTweet: true }] }).populate("user");

        const likeTweet = await Like.find({ isTweet: true });
        const comment = await commentModel.find({});

        res.json({ Tweets, like, likeTweet, comment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


