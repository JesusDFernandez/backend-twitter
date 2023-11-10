import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        following: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    }

);

export default mongoose.model("follow", followSchema);
