const express = require('express');
const router = express.Router();
const {
  getMatches,
  likeProfile,
  createMatch,
  getUserMatches
} = require('../controllers/matchController');

router.get('/', getMatches);
router.post('/like-profile', likeProfile);
router.post('/create-match', createMatch);
router.get('/get-matches/:userId', getUserMatches);

module.exports = router;