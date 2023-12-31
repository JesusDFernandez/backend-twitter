import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tweet: {
      type: mongoose.Types.ObjectId,
      ref: 'Tweet',
      required: true
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
