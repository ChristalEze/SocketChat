var userSchema = require('./schemas/userSchema');
var editBioFn = function(req, res){
    var username = req.usersession.user.username,
    bio = req.body.bio;

    userSchema.findOne({username: username}, function(err, user){
        if(err) throw err;
        else{
            userSchema.findOneAndUpdate({username: username},
                {
                    name: user.name,
                    gender: user.gender,
                    photo: user.photo,
                    bio: bio,
                    username: username,
                    password: user.password,
                    date: user.date
                }, function(err, updatedInfo){
                    if(err){
                        res.render('profile', {error: "Bio wasn't updated successfully"});
                    }
                    else{
                        res.redirect('/profile');
                    }
                });
        }
    });
}

module.exports = editBioFn;