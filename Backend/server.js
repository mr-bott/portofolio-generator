const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MongoDB, { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 1 } });

// Middleware
app.use(bodyParser.json());

app.use(cors({
    origin:process.env.FroentendURL
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Upload image to Cloudinary and store URL in MySQL
async function uploadToCloudinary(filepath) {
  const result = await cloudinary.uploader.upload(filepath, {
    folder: 'images', // Optional: specify folder in Cloudinary
  });
  return result.secure_url;
}

app.post('/uploadprojectimage', upload.single('image'), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.path);
    res.json({ imageUrl: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.use(
    session({
      secret: '06/9/2024',
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const gmail = profile.emails[0].value;
          const name = profile.displayName || profile.name.givenName;
          
          // Check if the user already exists in MongoDB by Gmail
          let user = await User.findOne({ 'personalInfo.email': gmail });
  
          if (!user) {
            // Create new user in MongoDB if doesn't exist
            user = new User({
              id: uuidv4(),
              personalInfo: { name, email: gmail },
            });
            await user.save();
          }
          
          done(null, profile);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'], // Adjust scopes as needed
  }));
  
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const token = jwt.sign({ email: req.user.emails[0].value }, 'thepass');
      const url = process.env.FroentendURL;
      res.redirect(`${url}/?token=${token}`);
    }
);

  
  app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.status(200).json({ error: 'Logout success' });
    });
  });

// Define the schema
const userSchema = new mongoose.Schema({
    id: { type: String, unique: true, default: uuidv4 }, // Add default value using uuidv4
    personalInfo: {
        name: String,
        phone: String,
        email:String,
        linkedinUrl: String,
        githubUrl: String,
        role:String,  
      },
    skills: {
        technical: [String],
        soft: [String]
    },
    education: [
        {
            name: String,
            duration: String
        }
    ],
    aboutMe: String,
    services: [
        {
            name: String,
            description: String
        }
    ],
    projects: [
        {
            name: String,
            imageUrl: String,
            projectLink: String
        }
    ]
});

const User = mongoose.model('User', userSchema);


// Create or update user endpoint
app.post('/api/user', async (req, res) => {
    const { email, ...details } = req.body;

    try {
        let user = await User.findOne({ 'personalInfo.email': email });

        if (user) {
            // Update user details if user already exists
            user = await User.findOneAndUpdate(
                { 'personalInfo.email': email },
                { $set: details },
                { new: true }
            );
            res.status(200).json({ message: 'User details updated successfully', user });
        } else {
            // Create a new user
            const newUser = new User({ ...details, id: uuidv4() });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving user data', error });
    }
});

app.put('/api/user/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { 'personalInfo.email': email },
            { $set: updateData },
            { new: true }
        );
        if (updatedUser) {
            res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (err) {
        res.status(500).json({ message: 'Error updating user data', err});
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id }); // Find user by UUID
        // const user = await User.find();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user data', error });
    }
});

// Define the route to get user details by email
app.get('/api/user/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ 'personalInfo.email': req.params.email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user data', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
