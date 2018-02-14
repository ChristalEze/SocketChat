var userSchema = require('./schemas/userSchema');
var profileFn = function(req, res){
    var username = req.url,
    usernameArray = username.split("/");


    userSchema.findOne({username: usernameArray[2]}, function(err, user){
        if(err) throw err;
        else if(user === null){
            res.redirect('/signup');
        }
        else{
            var name = user.name,
            username = user.username,
            gender = user.gender,
            bio = user.bio,
            photo = user.photo;

            userSchema.find({}, function(err, users){
                if(err) throw err;
                else{
                    var user = {
                        name: name,
                        username: username,
                        gender: gender,
                        bio: bio,
                        photoPath: photo,
                        users: users
                    }

                    console.log(users);
                    
                    res.render('profile', user);
                }
            });
            
        }
    });
}
module.exports = profileFn;