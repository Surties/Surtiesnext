const jwt = require("jsonwebtoken");
const JWT_SECERT = process.env.JWT_SECERT;
import { cookies } from "next/headers";
export const isEditor = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(404).json({ message: "No Cookie" });
    }
    const token = cookie.split("=")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECERT);
    if (decoded.role !== "newsEditor" && decoded.role !== "admin") {
      res.status(403).json({
        message: "Forbidden: Only admin and news editor can access this route",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(404).json({ message: "No Cookie" });
    }
    const token = cookie.split("=")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECERT);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only admin can access this route" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export const isUserValid = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.query;

  try {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(404).json({ message: "No Cookie" });
    }
    const token = cookie.split("=")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECERT);

    if (decoded.email !== email) {
      return res.status(403).json({ message: "invalid Token " });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export const verifyToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(404).json({ message: "No Cookie" });
  }
  const token = cookie.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "Token is not found" });
  }
  jwt.verify(String(token), JWT_SECERT, (err, user) => {
    if (err) {
      res.status(400).json({ message: "Invalide Token" });
    }
    req.id = user.id;
  });
  next();
};
export const authFunction = async (user, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    JWT_SECERT
  );

  return res
    .cookies("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 360000 * 27 * 7),
      path: "/",
    })
    .status(200)
    .json({
      msg: "LOGIN SUCCESS",
      auth: true,
      email: user.email,
      userName: user.name,
      id: user._id,
      role: user.role,
      profilePic: user.profilePic,
    });
};
