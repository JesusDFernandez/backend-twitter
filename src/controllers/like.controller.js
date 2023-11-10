import Like from "../models/like.model.js";


export const getLikes = async (req, res) => {
    try {

        const likes = await Like.find({ user: req.user.id });

        res.json(likes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createLike = async (req, res) => {
    try {

        const { id, isTweet } = req.body;
        const newLike = new Like({
            id,
            user: req.user.id,
            like: true,
            isTweet,
        });
        await newLike.save();
        res.json(newLike);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateLike = async (req, res) => {
    try {

        const { id, isTweet } = req.body;

        const likeUpdated = await Like.findOneAndUpdate(
            { _id: req.params.id },
            { id, user: req.user.id, isTweet },
            { new: true }
        );

        return res.json(likeUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};