const FrontendController = module.exports;
const Authentication = require('./Authentication');
const FriendModel = require('../models/FriendModel');
const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
const data = {
    app_name: 'Chat',
    header: '../includes/header',
    footer: '../includes/footer'
};

/**
 *
 * @param req
 * @param res
 */
FrontendController.index = function(req, res) {
    data.header = '../includes/header';
    data.uri = req.originalUrl;
    if (!(req.session.user)) {
        return res.render('pages/home', data);
    }
    var user = req.session.user;
    var userId = req.session.userId;

    Authentication.isLogin(user, function(err, row){
        if (err) {
            console.log('Error: ', err);
            return res.status(500).send();
        } else {
            if (row == null) {
                res.render('pages/home', data);
            } else {
                var condition = {
                    $and : [
                        { $or : [ { user_id_one : userId }, { user_id_two : userId } ] },
                        { $or : [ { status : 1 } ] }
                    ]
                };

                // get all friends
                FriendModel.listFriends(condition, function (err, friends) {
                    if (err) {
                        console.log('Error: ', err);
                    }

                    var friendId = [];
                    friends.forEach(function (friend) {
                        if (friend.user_id_one == userId) {
                            friendId.push({id: friend.user_id_two});
                        } else {
                            friendId.push({id: friend.user_id_one});
                        }
                    });

                    data.friends = friendId;
                    data.header = '../includes/headerAuthentication';
                    res.render('pages/friend', data);
                });
            }
        }
    });
};

/**
 *
 * @param req
 * @param res
 */
FrontendController.login = function(req, res) {
    if (req.session.user) {
        return res.redirect('/');
    }

    data.header = '../includes/header';
    data.uri = req.originalUrl;
    res.render('pages/login', data);
};

/**
 *
 * @param req
 * @param res
 */
FrontendController.register = function(req, res) {
    if (req.session.user) {
        return res.redirect('/');
    }

    data.header = '../includes/header';
    data.uri = req.originalUrl;
    res.render('pages/register', data);
};

/**
 *
 * @param req
 * @param res
 */
FrontendController.profile = function(req, res) {
    if (!(req.session.user)) {
        return res.redirect('login');
    }

    data.header = '../includes/headerAuthentication';
    data.uri = req.originalUrl;
    res.render('pages/profile', data);
};

FrontendController.chat = function(req, res) {
    if (!(req.session.user)) {
        return res.redirect('login');
    }

    var condition = { _id : req.params.userId };
    var userId = req.params.userId;

    UserModel.findOne(condition, function (err, friend) {
        if (err) {
            throw err;
        } else {
            var cond = {
                $and : [
                    { $or : [ { sender : userId }, { receiver : userId } ] },
                    { $or : [ { status : 0 } ] }
                ]
            };
            // get all message
            MessageModel.list(cond, function (err, msgs) {
                if (err) {
                    throw err;
                } else {
                    data.messageList = msgs;
                    data.sender = req.session.userId;
                    data.friendId = friend._id;
                    data.header = '../includes/headerAuthentication';
                    data.uri = req.originalUrl;
                    res.render('pages/chat', data);
                }
            });
        }
    });
};