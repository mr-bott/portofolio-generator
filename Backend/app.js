const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./config/passport");

const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.FroentendURL, credentials: true }));
app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     proxy: true,
//     cookie: {
//       httpOnly: true, // 
//       secure: true, // http
//       sameSite: "none",
//     },
//   })
// );

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", require("./routes/user.routes"));
app.use("/upload", require("./routes/upload.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
