var http = require('http');
var send = require('send');
var url = require('url');

process.env.port = 8080;

var app = http.createServer(function(req, res){
    // your custom error-handling logic:
    function error(err) {
        res.statusCode = err.status || 500;
        res.end(err.message);
    }

    // your custom directory handling logic:
    function redirect() {
        res.statusCode = 301;
        res.setHeader('Location', req.url + '/');
        res.end('Redirecting to ' + req.url + '/');
    }

    // transfer arbitrary files from within
    // /www/example.com/public/*
    send(req, url.parse(req.url).pathname,{root:'examples'})
        .on('error', error)
        .on('directory', redirect)
        .pipe(res);
}).listen(process.env.port);
