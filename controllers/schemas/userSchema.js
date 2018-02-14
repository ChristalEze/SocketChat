var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    photo: {type: String, required: true},
    bio: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: Date
});
userSchema.pre('save', function(next){
    next();
})

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;