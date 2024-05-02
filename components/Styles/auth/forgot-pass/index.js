const forgotPass = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    return postData(req, res);
  }
};

const postData = async (req, res) => {
  const { email } = req.body;
  console.log(email, USER);

  try {
    const oldDetails = await UserModel.findOne({ email });
    if (!oldDetails) {
      return res.status(404).send({ message: "user does not exits" });
    }

    const token = jwt.sign(
      { email: oldDetails.email, _id: oldDetails._id },
      JWT_SECERT
    );

    const link = `https://surtiesserver.onrender.com/auth/reset-pass/${oldDetails._id}/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.net",
      port: 465,
      secure: true,
      auth: {
        user: USER,
        pass: PASS,
      },
    });
    const mailOption = {
      from: USER,
      to: email,
      subject: `${"Reset Your Password"}`,
      text: link,
    };
    const sendMail = async (transporter, mailOption) => {
      try {
        await transporter.sendMail(mailOption);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send(
            "The server encountered an unexpected condition that prevented it from fulfilling the request."
          );
      }
    };
    sendMail(transporter, mailOption);
    return res.status(200).send("mail has been sent");
  } catch (err) {
    console.log(err);
  }
};
export default forgotPass;
