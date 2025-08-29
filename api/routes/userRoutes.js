const express = require('express');
const router = express.Router();
const { getUserById, getReceivedLikes } = require('../controllers/userController');

router.get('/:userId', getUserById);
router.get('/received-likes/:userId', getReceivedLikes);

module.exports = router;