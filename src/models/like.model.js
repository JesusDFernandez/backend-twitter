import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        like: {
            type: Boolean,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        isTweet: {
            type: Boolean,
            required: true
        }

    },

);

export default mongoose.model("Like", likeSchema);
