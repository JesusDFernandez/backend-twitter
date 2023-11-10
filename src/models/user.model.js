import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    biography: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
