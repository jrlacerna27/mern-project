const express = require('express');
const path = require('path');
const UserRoutes = require('./UserRoute');
const AuthRoutes = require('./AuthRoute');

const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.use('/api/users', UserRoutes);
router.use('/api/auth', AuthRoutes);

module.exports = router;
