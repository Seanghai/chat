const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    term_condition: {
        type: String,
        required: true
    },
    is_login: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });

const User = module.exports = mongoose.model('User', UserSchema);

/**
 *
 * @param user
 * @param callback
 */
module.exports.register = function(user, callback) {
    User.create(user, callback);
};

/**
 *
 * @param user
 * @param callback
 */
module.exports.login = function(user, callback) {
    var query = {
        'email': user.email,
        'password': user.password
    };
    User.findOne(query, callback);
};

/**
 *
 * @param user
 * @param callback
 */
module.exports.isLogin = function(user, callback) {
    var query = {
        'email': user.email,
        'password': user.password,
        'is_login': true
    };
    var option = {
        is_login: 1
    };
    User.findOne(query, option, callback);
};

/**
 *
 * @param id
 * @param data
 * @param option
 * @param callback
 */
module.exports.setLogin = function(query, data, option, callback) {
    User.findOneAndUpdate(query, data, option, callback);
};

/**
 *
 * @param query
 * @param data
 * @param option
 * @param callback
 */
module.exports.logout = function(query, data, option, callback) {
    User.update(query, data, option, callback);
};

/**
 *
 * @param user
 * @param callback
 */
module.exports.isActive = function(user, callback) {
    var query = {
        'email': user.email,
        'password': user.password
    };
    var option = 'is_active';
    User.findOne(query, option, callback);
};