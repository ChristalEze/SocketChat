var userSchema = require('./schemas/userSchema');

var viewUserFn = function(req, res){
    userSchema.find().sort({name: 1}).exec(function(err, uers){
        if(err) throw err;
        else{
            var users = {
                users: users
            }
            res.render('viewUsers', users);
        }
    });
}

module.exports = viewUserFn;