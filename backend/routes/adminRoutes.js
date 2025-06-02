const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Bienvenido, admin!' });
});

module.exports = router;
