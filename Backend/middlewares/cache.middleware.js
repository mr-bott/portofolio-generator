const redisClient = require("../config/redis");

module.exports = async (req, res, next) => {
  const key = req.originalUrl;

  const cachedData = await redisClient.get(key);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  res.sendResponse = res.json;
  res.json = async (body) => {
    await redisClient.setEx(key, 900, JSON.stringify(body)); // cache for 15 min
    res.sendResponse(body);
  };

  next();
};
