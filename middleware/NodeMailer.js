import nodeMailer from "nodemailer";
const sendMail = async (to, name) => {
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
    from: {
      name: name,
      adress: USER,
    },
    to: "mohd4monish@gmail.com",
    subject: `Job Application for ${postion}`,
    text: "",
    html: `<h2>Contact Information</h2>

    <p>Email: <span">${email}</span></p>
    <p>Name: <span >${name}</span></p>
    <p>Phone Number: <span >${phoneNumber}</span></p>
    <p>Position: <span >${postion}</span></p>
    <p>File: <a href="${file}" >Resume</a></p>`,
  };
  const sendMail = async (transporter, mailOption) => {
    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      return res
        .status(500)
        .send(
          "The server encountered an unexpected condition that prevented it from fulfilling the request."
        );
    }
  };
  await sendMail(transporter, mailOption);
};
export default sendMail;
