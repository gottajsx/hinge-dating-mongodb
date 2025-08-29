const User = require('../models/user');

exports.getMatches = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let filter = {};
    if (user.gender === 'Men') filter.gender = 'Women';
    else if (user.gender === 'Women') filter.gender = 'Men';
    if (user.type) filter.type = user.type;

    const currentUser = await User.findById(userId)
      .populate('matches', '_id')
      .populate('likedProfiles', '_id');

    const friendIds = currentUser.matches.map(f => f._id);
    const crushIds = currentUser.likedProfiles.map(f => f._id);

    const matches = await User.find(filter)
      .where('_id').nin([userId, ...friendIds, ...crushIds]);

    res.status(200).json({ matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching matches' });
  }
};

exports.likeProfile = async (req, res) => {
  try {
    const { userId, likedUserId, image, comment } = req.body;
    await User.findByIdAndUpdate(likedUserId, {
      $push: { receivedLikes: { userId, image, comment } }
    });
    await User.findByIdAndUpdate(userId, { $push: { likedProfiles: likedUserId } });
    res.status(200).json({ message: 'Profile liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking profile' });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { likedProfiles: currentUserId }
    });
    await User.findByIdAndUpdate(currentUserId, { $push: { matches: selectedUserId } });
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { receivedLikes: { userId: selectedUserId } }
    });
    res.status(200).json({ message: 'Match created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error });
  }
};

exports.getUserMatches = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('matches', 'firstName imageUrls');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ matches: user.matches });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches' });
  }
};