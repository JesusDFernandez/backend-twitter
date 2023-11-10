import Comment from "../models/comment.model.js";
import Tweet from "../models/tweet.model.js";
import Like from "../models/like.model.js";


export const getComment = async (req, res) => {
  try {

    const comments = await Comment.find({ _id: req.params.id });

    res.json(comments);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {

    const { text, id_tweet } = req.body;
    const newComment = new Comment({
      text,
      tweet: id_tweet,
      user: req.user.id,
    });
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comentario no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const commentUpdated = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { text },
      { new: true }
    );
    return res.json(commentUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getComments = async (req, res) => {
  try {

    const comment = await Comment.find({ tweet: req.params.id }).populate("user")
    const tweet = await Tweet.find({ _id: req.params.id }).populate("user")
    const like = await Like.find({ $and: [{ user: req.user.id }, { isTweet: true }] }).populate("user");
    const likeTweet = await Like.find({ isTweet: true });

    if (!comment) return res.status(404).json({ message: "No encontrada" });

    return res.json({ comment, tweet, like, likeTweet });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
