const http = require('http');
const app = require('./app');
const { setupSocket } = require('./controllers/chatController');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});