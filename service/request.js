const request = require('request')

var get = function (res, url) {
    request({
        url: url,
        method: 'GET',
        // headers: {'Content-Type': 'text/json'}
        // json: true
    }, function( error, response, body) {
        if(!error && response.statusCode==200){
          res.send(JSON.parse(body));
        }
        res.send(JSON.parse(error));
    })
}

var post = function (res, url, data) {
    request({
        url: url,
        method: 'POST',
        form: data,
        // headers: {'Content-Type': 'text/json'}
        // json: true
    }, function( error, response, body) {
        if(!error && response.statusCode==200){
          res.send(JSON.parse(body));
        }
        res.send(JSON.parse(error));
    })
}

module.exports = {get, post}