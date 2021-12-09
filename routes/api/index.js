// Dependencies and calling routes
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// assigning a url to routes
router.use('/thoughts', thoughtRoutes)
router.use('/users', userRoutes)

//export routes
module.exports = router;