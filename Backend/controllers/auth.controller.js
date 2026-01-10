
const jwt = require('jsonwebtoken');

exports.googleCallback = (req, res) => {
  const token = jwt.sign(
    { email: req.user.personalInfo.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // JS-readable cookie
  res.cookie("token", token, {
    httpOnly: false,        // frontend can read
    secure: process.env.Cookie_Secure,    // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.redirect(process.env.FroentendURL);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logout success" });
  });
};
