const signup = async (req, res) => {
  if (req.method === "GET") {
    return getData(req, res);
  }
};

const getData = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
    path: "/",
  });

  res.status(200).json({ msg: "Logout successful", auth: false });
};
export default signup;
