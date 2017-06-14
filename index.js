// express located inside node_modules
var express = require('express');
// declaring app variable so that future functions have access to the modules via the app
var app 	= express();
// declaring http variable so that future functions know what parameters to use
var http	= require('http').Server(app);
// takes advantage of express functionality to load appropriate directories as defined inside the .static function
// sets up the server with files
app.use(express.static(__dirname + '/public'));
// client sends a request to server which will respond with defined files, in this case /index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
// open the specified port and listen for requests through the port and respond appropriately/works on any line???
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});