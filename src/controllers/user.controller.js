import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const getUsers = async (req, res) => {
    try {

        const users = await User.find({}, '-password');

        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrada" });

        res.json({
            id: user._id,
            fullname: user.fullname,
            username: user.username,
            biography: user?.biography
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrada" });

        res.json({
            id: user._id,
            fullname: user.fullname,
            username: user.username,
            biography: user?.biography
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {

        const { fullname, username, password, passwordNew, biography } = req.body;

        const user = await User.findById(req.user.id);

        let passwordHash;

        let message = "Actualizacion exitosa";
        if (password) {

            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                message = "La contraseña es incorrecta";
            }
            if (passwordsMatch) {
                passwordHash = await bcrypt.hash(passwordNew, 10);
            }
        }

        const userUpdated = await User.findOneAndUpdate(
            { _id: req.user.id },
            { fullname, username, password: passwordHash, biography },
            { new: true }
        );
        return res.status(200).json({ message: message });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


