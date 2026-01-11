const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
  const token = jwt.sign(
    { email: req.user.personalInfo.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: false,
    secure:true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  console.log("JWT cookie set");

  res.redirect(process.env.FroentendURL);
};

// exports.logout = (req, res) => {
//   res.clearCookie("token", {
//     secure: true,
//     sameSite: "none",
//     path: "/"
//   });

//   req.logout?.(() => {
//     res.json({ message: "Logout success" });
//   });
// };
