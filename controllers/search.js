var userSchema = require('./schemas/userSchema');
var searchFn = function(req, res){
    var query = req.query.search,
    queryArray = query.split(" "),
    paramArray = new Array(),
    number = queryArray.length;

    queryArray.forEach(function(element){
        userSchema.find({$or: [{username: element}, {name: element}, {gender: element}]}, function(err, users){
            if(err) throw err;
            else{
                paramArray.push(users);
                if(queryArray.indexOf(element) === number-1){
                    if(paramArray[0].length === 0){
                        res.render('search', {noResults: 'No results found!'});
                    }else{
                        var contents = {
                            contents: paramArray[0],
                            query: query,
                            searchResults: 'Showing search results for: ' 
                        }
                        console.log(contents);
                        res.render('search', contents);
                    }
                }
            }
        }, this);
    });
}
module.exports = searchFn;