import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("BODY LOGIN:", req.body); // 👈 Muy importante

    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await comparePassword(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none" // Esto es importante en producción con cookies cross-origin
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });

  } catch (error) {
    console.error("ERROR EN LOGIN:", error); // 👈 Log del error exacto
    res.status(500).json({ message: "Error interno del servidor" });
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
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
