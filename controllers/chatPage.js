var userSchema = require('./schemas/userSchema');
var messageSchema = require('./schemas/messageSchema');
var hash = require('password-hash');
var path = require('path');

var chatFn = function(req, res){
    var username = req.usersession.user.username;

    userSchema.findOne({username: username}, function(err, user){
        if(err) throw err;
        else if(user === null){
            res.redirect('/signup');
        }
        else{
            var allMessages;

            var name = user.name,
            username = user.username,
            gender = user.gender,
            photo = user.photo;

            messageSchema.find().exec(function(err, messages){
                if(err)throw err;
                else{
                    userSchema.find({}, function(err, users){
                        if(err) throw err;
                        
                        else{
                            allMessages = messages;
                            var user = {
                            messages: allMessages,
                            name: name,
                            username: username,
                            gender: gender,
                            photoPath: photo,
                            users: users
                        }
                        res.render('chatPage', user);
                            }
                        });
                    
                }
            });
        }
    });

}

module.exports = chatFn;