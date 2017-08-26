module.exports = function(io) {
    const MessageModel = require('../models/MessageModel');
    io.on('connection', function (socket) {
        socket.on('client event', function (clientData) {
            var data = {
                message: clientData.message,
                receiver: clientData.receiver,
                sender: clientData.sender
            };
            MessageModel.send(data, function (err, dataMsg) {
                if (err) {
                    throw err;
                } else {
                    io.emit('server event ' + clientData.receiver, data);
                }
            });
            // io.emit('server event ' + clientData.sender, data);
            // console.log(socket.id);
        });

        socket.on('typing event', function(typing){
            io.emit('typing status ' + typing.receiver, typing);
        });
    });
};