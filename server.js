const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');
const socket = require('./src/config/socket');

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
const corsOrigin = process.env.NODE_ENV === 'production'
    ? CLIENT_URL.split(',').map(origin => origin.trim())
    : true;
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: corsOrigin, credentials: true }
});

socket.setSocketServer(io);

io.on('connection', (client) => {
    console.log(`Client Socket.IO connecte : ${client.id}`);
    client.on('disconnect', () => console.log(`Client Socket.IO deconnecte : ${client.id}`));
});

server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
