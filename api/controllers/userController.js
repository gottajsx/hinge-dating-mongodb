const User = require('../models/user');

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.getReceivedLikes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate('receivedLikes.userId', 'firstName imageUrls prompts')
      .select('receivedLikes');
    res.status(200).json({ receivedLikes: user.receivedLikes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching received likes' });
  }
};