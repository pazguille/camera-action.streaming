	
/**
 * module dependencies.
 */

var express = require('express'),
		events = require('events'),
		sys = require('sys'),
		fs = require('fs'),
		port = 3030;

var app = module.exports = express.createServer(),
	io = require("socket.io").listen(app);

/**
* app configuration.
*/
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

/**
 * Index.
 */
app.get("/", function(req, res, next){
	res.render("chat");
});

io.sockets.on("connection", function (socket) {
	socket.on("client", function (data) {
		//io.sockets.emit("server", data);
		socket.broadcast.emit("server", data);

		// socket.emit("server", data); //a una sola persona
		// socket.broadcast.emit("server", data); // todos menos la persona que lo emitio
		// io.sockets.emit("server", data); // a todos los que estan conectados!
	});
});

/**
 * app start
 */
app.listen(port);

/**
 * log
 */
console.log("Express server listening on port %d", app.address().port);
