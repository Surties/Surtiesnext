const express = require("express");
const UserModel = require("../Auth/auth.schema");
const app = express();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config();
const USER = process.env.USER;
const PASS = process.env.PASS;
app.set("view engine", "ejs");
app.use(express.json());
const NewsModel = require("./news.schema");
const express = require("express");


const singleData = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
  if (req.method === "POST") {
    console.log("last");
    return postData(req, res);
  }
};
const getData = async (req, res) => {};
const postData = async (req, res) => {};
export default singleData;
