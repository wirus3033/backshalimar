let io;

function setSocketServer(socketServer) {
    io = socketServer;
}

function emit(event, payload) {
    if (io) io.emit(event, payload);
}

module.exports = { setSocketServer, emit };

