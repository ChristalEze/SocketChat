var userSchema = require('./schemas/userSchema');

var homeFn = function(req, res){
    if(req.usersession.user){
        userSchema.findOne({username: req.usersession.user.username}, function(err, user){
            if(err) throw err;
            else if(user === null){
                res.render('home');
            }
            else{
                res.redirect('/chat');
            }
        });
    }
    else{
        res.render('home');
    }
}

module.exports = homeFn;