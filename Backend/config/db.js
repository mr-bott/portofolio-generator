const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 1 },
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
