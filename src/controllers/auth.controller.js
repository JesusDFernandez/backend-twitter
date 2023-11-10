import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {

    const { fullname, username, password, biography } = req.body;

    const userFound = await User.findOne({ username });

    if (userFound)
      return res.status(400).json({
        message: ["El usuario ya está en uso."],
      });


    const passwordHash = await bcrypt.hash(password, 10);


    const newUser = new User({
      fullname,
      username,
      password: passwordHash,
      biography
    });

    const userSaved = await newUser.save();


    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.json({
      id: userSaved._id,
      fullname: userSaved.fullname,
      username: userSaved.username,
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res.status(400).json({
        message: ["El usuario no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      fullname: userFound.fullname,
    });

    res.json({
      id: userFound._id,
      fullname: userFound.fullname,
      username: userFound.username,
      biography: userFound?.biography,
      token: token,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      fullname: userFound.fullname,
      username: userFound.username,
      biography: userFound?.biography,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
