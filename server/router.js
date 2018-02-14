var express = require('express');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var userSignin = require('../controllers/userSignin');
var userSignup = require('../controllers/userSignup');

var logout = require('../controllers/logout');
var chatPage = require('../controllers/chatPage');

var viewUsers = require('../controllers/viewUsers');
var search = require('../controllers/search');

var contact = require('../controllers/contact');
var profile = require('../controllers/profile');
var userProfile = require('../controllers/userProfile');

var editBio = require('../controllers/editBio');

var home = require('../controllers/home');

var userSchema = require('../controllers/schemas/userSchema');

var urlEncodedBodyParser = bodyParser.urlencoded({extended: true});
var router = express.Router();

router.use(session({
    cookieName: 'usersession',
    secret: 'abcdefjhi',
    duration: 60*60*1000,
    activeDuration: 30*60*1000
}));

var requireUserLogin = function(req, res, next){
    if(!req.usersession.user){
        res.redirect('/signin');
    }
    else{
        userSchema.findOne({username: req.usersession.user.username}, function(err, user){
            if(err){
                res.redirect('/signup');
            }
            else if(user === null){
                res.redirect('/signup');
            }
            else if(req.usersession.user.password !== user.password){
                res.render('home', {error: 'Some details have changed since your last login, please cnfirm your details.'});
            }
            else{
                next();
            }
        });
    }
}

router.get('/', home);

router.get('/signup', function(req, res){
    res.render('userSignup');
});

router.get('/contact', function(req, res){
    res.render('contact');
});

router.get('/editbio', function(req, res){
    res.render('editBio');
});

router.get('/user/:username', userProfile);

router.get('/chat', requireUserLogin, chatPage);

router.get('/profile', requireUserLogin, profile);

router.get('/logout', requireUserLogin, logout);

router.get('/viewusers', requireUserLogin, viewUsers);

router.get('/search', requireUserLogin, search);

router.post('/create-account', urlEncodedBodyParser, userSignup);

router.post('/login', urlEncodedBodyParser, userSignin);

router.post('/feedback', urlEncodedBodyParser, contact);

router.post('/change-bio', urlEncodedBodyParser, editBio);

module.exports = router;

