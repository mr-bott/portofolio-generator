const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: uuidv4 },
  personalInfo: {
    name: String,
    phone: String,
    email: String,
    linkedinUrl: String,
    githubUrl: String,
    role: String,
  },
  skills: {
    technical: [String],
    soft: [String],
  },
  education: [{ name: String, duration: String }],
  aboutMe: String,
  services: [{ name: String, description: String }],
  projects: [{ name: String, imageUrl: String, projectLink: String }],
});

module.exports = mongoose.model('User', userSchema);
