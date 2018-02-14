var userSchema = require('./schemas/userSchema');
var logoutFn = function(req, res){
    var username = req.usersession.user.username;
    userSchema.findOne({username: username}, function(err, user){
        if(err) throw err;
        else{
            req.usersession.user = null;
            res.redirect('/');
        }
    });
}

module.exports = logoutFn;