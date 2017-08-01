const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    user_id_one: {
        type: String,
        required: true
    },
    user_id_two: {
        type: String,
        required: true
    },
    action_user_id: {
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
}, { collection: 'friends' });

const Friend = module.exports = mongoose.model('Friend', FriendSchema);

module.exports.request = function(data, callback) {
    Friend.create(data, callback);
};

module.exports.listFriends = function (condition, callback) {
    Friend.find(condition, callback);
};