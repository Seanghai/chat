const FrontendController = module.exports;
const Authentication = require('./Authentication');
const data = {
    app_name: 'Chat',
    header: '../includes/header',
    footer: '../includes/footer'
};

const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/**
 *
 * @param req
 * @param res
 */
FrontendController.index = function(req, res) {
    console.log(req.session.userid);
    data.header = '../includes/header';
    data.uri = req.originalUrl;
    var account = localStorage.getItem('user');
    var user = JSON.parse(account);
    if (user == null) {
        return res.render('pages/home', data);
    }

    Authentication.isLogin(user, function(err, row){
        if (err) {
            console.log('Error: ', err);
            return res.status(500).send();
        } else {
            if (row == null) {
                res.render('pages/home', data);
            } else {
                data.header = '../includes/headerAuthentication';
                res.render('pages/chat', data);
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
    data.header = '../includes/headerAuthentication';
    data.uri = req.originalUrl;
    res.render('pages/profile', data);
};