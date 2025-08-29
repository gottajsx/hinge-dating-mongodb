const Chat = require('../models/message');

exports.setupSocket = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log('User connected');

    socket.on('sendMessage', async data => {
      try {
        const { senderId, receiverId, message } = data;
        const newMessage = new Chat({ senderId, receiverId, message });
        await newMessage.save();
        io.to(receiverId).emit('receiveMessage', newMessage);
      } catch (error) {
        console.error('Error sending message', error);
      }
    });

    socket.on('disconnect', () => console.log('User disconnected'));
  });
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).populate('senderId', '_id name');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};