const Poll = require('../models/Poll');
const mongoose = require('mongoose'); // ✅ Add this




// Create poll (admin only)
const createPoll = async (req, res) => {
  const { title, description, options, expiresAt } = req.body;

  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin can create polls' });
    }

    const poll = await Poll.create({
      title,
      description,
      options,
      createdBy: req.user._id,
      expiresAt,
    });

    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all polls
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get single poll by ID
const getPollById = async (req, res) => {
  try {
    // ✅ Step 1: Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid poll ID' });
    }

    // ✅ Step 2: Find poll by ID
    const poll = await Poll.findById(req.params.id);

    // ✅ Step 3: If poll not found
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    // ✅ Step 4: Return poll
    res.status(200).json(poll);
  } catch (err) {
    console.error('Error fetching poll by ID:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Vote on a poll
const votePoll = async (req, res) => {
  const { optionIndex } = req.body;

  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
  

    if (
      typeof optionIndex !== 'number' ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ message: 'Invalid option index' });
    }

    if (poll.voters.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(req.user._id);
    await poll.save();

    res.status(200).json({ message: 'Vote recorded', poll });
  } catch (err) {
    console.error('Vote error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};



const getMyPolls = async (req, res) => {
  try {
    const myPolls = await Poll.find({ createdBy: req.user._id });
    res.status(200).json({ polls: myPolls });
  } catch (error) {
    console.error('Error in getMyPolls:', error.message); // ✅ Check terminal
    res.status(500).json({ message: 'Failed to fetch your polls' });
  }
};


module.exports = {
    createPoll,
    getAllPolls,
    getPollById,
    votePoll,
    getMyPolls,

}