// Required Files
const router = require('express').Router();
const userRoute = require('./user-routes');
const postRoute = require('./post-routes');
const commentRoute = require('./comment-routes');

// Using Routes
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

// Export instance of router
module.exports = router;