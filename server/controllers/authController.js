import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(401)
      .json({ success: false, msg: "Semua bagian harus diisi" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, msg: "Email sudah digunakan" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //converted days to hours to minutes to seconds to mili seconds
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, msg: "Semua bagian harus diisi" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, msg: "Email tidak terdaftar" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, msg: "Password salah" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //converted days to hours to minutes to seconds to mili seconds
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, msg: "Log Out" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
