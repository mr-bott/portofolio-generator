const router = require('express').Router();
const rateLimiter = require('../middlewares/rateLimiter');
const cache = require('../middlewares/cache.middleware');
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', rateLimiter, controller.createOrUpdateUser);
router.put('/email/:email', auth, rateLimiter, controller.updateUserDetails);
router.get('/email/:email', auth, cache, rateLimiter, controller.getUserByEmail);
router.get('/:id', rateLimiter, cache, controller.getUserById);
module.exports = router