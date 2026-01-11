const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
  const token = jwt.sign(
    { email: req.user.personalInfo.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const url = process.env.FroentendURL;
  res.redirect(`${url}/?token=${token}`);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.status(200).json({ error: "Logout success" });
  });
};
