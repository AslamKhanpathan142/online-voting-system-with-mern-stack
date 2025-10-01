const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const signUp = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, isAdmin });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: { id: user._id, name, email, isAdmin },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      user: { id: user._id, name: user.name, email, isAdmin: user.isAdmin },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    signUp,
    login
}