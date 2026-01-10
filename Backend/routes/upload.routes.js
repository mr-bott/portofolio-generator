const router = require("express").Router();
const multer = require("multer");
const controller = require("../controllers/upload.controller");
const rateLimiter = require("../middlewares/rateLimiter");
const auth = require("../middlewares/auth.middleware");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/image",
  auth,
  rateLimiter,
  upload.single("image"),
  controller.uploadImage
);

module.exports = router;
