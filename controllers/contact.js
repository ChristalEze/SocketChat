var contactFn = function(req, res){
    var message = req.body.msg,
    sender = req.body.em;

    res.render('home');

}

module.exports = contactFn;