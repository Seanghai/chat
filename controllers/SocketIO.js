module.exports = function(io) {
    io.on('connection', function (socket) {
        socket.on('client event', function (clientData) {
            io.emit('server event', clientData);
        });

        socket.on('typing event', function(typing){
            io.emit('typing status', typing);
        });
    });
};