module.exports = function(io) {
    io.on('connection', function (socket) {
        socket.on('client event', function (clientData) {
            var data = {
                message: clientData.message,
                receiver: clientData.receiver
            };
            io.emit('server event ' + clientData.receiver, data);
            io.emit('server event ' + clientData.sender, data);
            console.log(data);
        });

        socket.on('typing event', function(typing){
            io.emit('typing status ' + typing.receiver, typing);
        });
    });
};