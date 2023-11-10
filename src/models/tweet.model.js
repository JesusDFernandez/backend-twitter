import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },

        user: { type: mongoose.Types.ObjectId, ref: 'User' },

        image: {
            secure_url: String,
            public_id: String
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Tweet", tweetSchema);
