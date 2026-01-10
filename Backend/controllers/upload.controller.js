
const uploadToCloudinary = require('../utils/uploadToCloudinary');

exports.uploadImage = async (req, res) => {
  try {
    const imageUrl = await uploadToCloudinary(req.file.path);
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};
