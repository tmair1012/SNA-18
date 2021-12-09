const router = require('express').Router();

// call all api routes
const apiRoutes = require('./api');

// declare url for api routes
router.use('/api', apiRoutes);

// throw error if url path is incorrect
router.use((req, res) => {
    res.status(404).send('Error')
});

module.exports = router;