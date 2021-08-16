// Require Files
const router = require('express').Router();
const apiRoute = require('./api');
const homeRoute = require('./home-routes.js');
const dashboardRoute = require('./dashboard-routes.js');

// Use Routes
router.use('/api', apiRoute);
router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute);

// Catch all
router.use((req, res) => {
  res.status(404).end();
});

// Export instance of router
module.exports = router;