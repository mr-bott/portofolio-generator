const User = require('../models/user.model');

exports.createOrUpdateUser = async (req, res) => {
  const { email, ...details } = req.body;

  const user = await User.findOneAndUpdate(
    { 'personalInfo.email': email },
    { $set: details },
    { new: true, upsert: true }
  );

  res.json(user);
};

exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ 'personalInfo.email': req.params.email });
  user ? res.json(user) : res.status(404).json({ message: "Not found nvggvj" });
};


exports.updateUserDetails  = async (req, res) => {

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

}

exports.getUserById = async (req, res) => {
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

}
