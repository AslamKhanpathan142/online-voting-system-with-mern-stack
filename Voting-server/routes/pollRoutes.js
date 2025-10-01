const express = require('express');
const router = express.Router();
const {
  createPoll,
  getAllPolls,
  getPollById,
  votePoll,
  getMyPolls
} = require('../controllers/pollController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createPoll);         // Create a poll (admin)
router.get('/', protect, getAllPolls);         // Get all polls
router.get('/mypolls', protect, getMyPolls); 
router.get('/:id', protect, getPollById);      // Get poll by ID
router.post('/:id/vote', protect, votePoll);   // Vote on poll

module.exports = router;
