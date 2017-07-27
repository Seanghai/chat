const express = require('express');
const router = express.Router();
const FrontendController = require('../controllers/FrontendController');
const Authentication = require('../controllers/Authentication');

router.get('/', FrontendController.index);
router.get('/profile', FrontendController.profile);
router.get('/login', FrontendController.login);
router.get('/register', FrontendController.register);
router.post('/register', Authentication.register);
router.post('/login', Authentication.login);
router.get('/logout', Authentication.logout);

module.exports = router;
