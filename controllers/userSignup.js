var userSchema = require('./schemas/userSchema');
var hash = require('password-hash');
var path = require('path');

var signup = function(req, res){
    var username = req.body.username,
    name = req.body.name,
    password = req.body.password,
    gender = req.body.gender,
    file = req.body.photo;

    var photoPath = file.replace(/\\/g, '/');
    console.log(photoPath);
    

    var hashPassword = hash.generate(password, {algorithm: 'sha256'});
    var date = new Date();  

    var newestUser = new userSchema({
        name: name,
        gender: gender,
        photo: photoPath,
        bio: 'This is here by default, you can choose to edit it.',
        username: username,
        password: hashPassword,
        date: date
    });

    newestUser.save(function(err){
        if(err){
            res.render('userSignup', {error: 'Username already exists'});
        }
        else{
            userSchema.find({}, function(err, users){
                if(err) throw err;
                else{
                    req.usersession.user = newestUser;
                    res.redirect('/chat');
                }
            });
        }
    });
}

module.exports = signup;