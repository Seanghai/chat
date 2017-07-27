const Authentication = module.exports;
const UserModel = require('../models/UserModel');

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/**
 *
 * @param req
 * @param res
 */
Authentication.register = function(req, res) {
    // res.setHeader('Content-Type', 'application/json');
    var userData = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
        term_condition: req.body.term_condition
    };

    UserModel.register(userData, function (err, data) {
        if(err) {
            console.log('Error: ', err);
            return res.status(500).send();
        } else {
            if (data == null) {
                res.redirect('/register');
            } else {
                var id = data._id,
                    newData = {
                        is_login: true,
                        is_active: true
                    },
                    user = {
                        email: userData.email,
                        password: userData.password
                    };
                UserModel.setLogin(user, newData, function(err, data) {
                    if (err) {
                        console.log('Error: ', err);
                        return res.status(500).send();
                    } else {
                        localStorage.setItem('user', JSON.stringify(user));
                        res.redirect('/');
                    }
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
Authentication.login = function(req, res) {
    // res.setHeader('Content-Type', 'application/json');
    var account = {
        email: req.body.email,
        password: req.body.password
    };

    UserModel.login(account, function (err, data) {
        if(err) {
            console.log('Error: ', err);
            return res.status(500).send();
        } else {
            if (data == null) {
                res.redirect('/login');
            } else {
                var id = data._id,
                    newData = {
                        is_login: true,
                        is_active: true
                    },
                    user = {
                        email: data.email,
                        password: data.password
                    };
                UserModel.setLogin(user, newData, function(err, data) {
                    if (err) {
                        console.log('Error: ', err);
                        return res.status(500).send();
                    } else {
                        req.session.userid = id;
                        localStorage.setItem('user', JSON.stringify(user));
                        res.redirect('/');
                    }
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
Authentication.logout = function(req, res) {
    var account = localStorage.getItem('user');
    var user = JSON.parse(account);
        var newData = {
            is_login: false,
            is_active: false
        };
    UserModel.logout(user, newData, function(err, data){
        if (err) {
            console.log('Error: ', err);
            return res.status(500).send();
        } else {
            localStorage.removeItem('user');
            req.session.destroy();
            res.redirect('/');
        }
    });
};

/**
 *
 * @param account
 * @param callback
 */
Authentication.isLogin = function (account, callback) {
    UserModel.isLogin(account, callback);
};