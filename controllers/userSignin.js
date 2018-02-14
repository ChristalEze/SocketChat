var userSchema = require('./schemas/userSchema');
var hash = require('password-hash');

var signinFn = function(req, res){
    var username = req.body.username,
    plainPassword = req.body.password;

    userSchema.findOne({username: username}, function(err, user){
        if(err) throw err;
        else if(user === null){
            res.render('home', {error: 'Username does not exist, please recheck your username'});
        }
        else{
            if(!hash.verify(plainPassword, user.password)){
                res.render('userSignin', {error: 'Incorrect password'});
            }else{
                
                userSchema.find({}, function(err, users){
                    if(err) throw err;
                    else{
                        req.usersession.user = user;
                        res.redirect('/chat');
                    }
                });
            }
        }
    });
}
module.exports = signinFn;