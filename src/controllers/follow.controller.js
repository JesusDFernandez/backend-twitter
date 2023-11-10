import Follow from "../models/follow.model.js";


export const getfollow = async (req, res) => {
    try {
        const follows = await Follow.find({ user: req.user.id });

        res.json(follows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createFollow = async (req, res) => {
    try {
        const { following } = req.body;
        const newFollow = new Follow({
            user: req.user.id,
            following
        });
        await newFollow.save();
        res.json(newFollow);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteFollow = async (req, res) => {
    try {
        const deletedFollow = await Follow.findByIdAndDelete(req.params.id);
        if (!deletedFollow)
            return res.status(404).json({ message: "No encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};