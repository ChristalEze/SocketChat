var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message: {type: String, required: true},
    from: String,
    date: Date
});

messageSchema.pre('save', function(next){
    next();
});

var messageModel = mongoose.model('messages', messageSchema);
module.exports = messageModel;