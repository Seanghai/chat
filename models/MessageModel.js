const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'messages' });

const Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.send = function(data, callback) {
    Message.create(data, callback);
};

module.exports.list = function (condition, callback) {
    Message.find(condition, callback);
};