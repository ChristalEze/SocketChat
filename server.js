var express = require('express');
var mongoose = require('mongoose');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var router = require('./server/router');
var exphbs = require('express-handlebars');

mongoose.connect('mongodb://127.0.0.1/socketchat');
app.use(express.static(__dirname + '/public'));
app.use('/', router);

var messageSchema = require('./controllers/schemas/messageSchema');

// var users = [];
// var username;
// io.on('connection', function(socket){
//     console.log('A user connected');
//     socket.on('setUsername', function(data){
//         console.log('setUsername '+ data);
//         username = data;
        
//         if(users.indexOf(data) > -1){
//             socket.emit('userExists', data + ' username has been taken, try some other username.');
//         }
//         else{
//             users.push(data);
//             socket.emit('userSet', data);
//         }
//     });
//     socket.on('msg', function(data){
//         console.log('server' + username);
//         var newMsg = new messageSchema({
//             message: data.message,
//             from: username,
//             date: new Date()
//         });
//         newMsg.save(function(err){
//             if(err) throw err;
//         });
//         io.sockets.emit('newmsg', newMsg);
//     });
    
// });

var users = [];
var username;
//|||||||||||||||||||||||||| On the socket for communication |||||||||||||||||||||||

io.on('connection', function(socket){   //This on's the socket

    console.log('A user connected');
    socket.on('setUsername', function(data){        //Receives the emit and unbundles the data, more of like 
//                                                   intents in Android with the first parameter been the key
        console.log(data);
        username = data;
//         if(users.indexOf(data) > -1){
//             socket.emit('userExists', data + ' username has been taken, try some other username.');     //Emits/sends 
// //                                                                              it to any socket that will receive/on it.
//         }
//         else{
//             users.push(data);
//             socket.emit('userSet', {username: data});
//         }

        users.push(data);
        socket.emit('userSet', {username: data});

    });
    socket.on('msg', function(data){

        var newMsg = new messageSchema({
            message: data.message,
            from: username,
            date: new Date()
        });
        newMsg.save(function(err){
            if(err) throw err;
        });

        io.sockets.emit('newmsg', data);
    });

});


app.get('/chatpage', function(req, res){
    res.render('chatPage');
});

app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

http.listen(5000, function(){
    console.log('SocketChat server up and running at port 5000');
})
