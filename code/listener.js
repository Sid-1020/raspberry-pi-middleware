//a server that listens to 8124 port and changes led status according
//to passed arguments
//type in the browser: http://128.95.141.204:8124/?led=on or http://128.95.141.204:8124/?led=off
//The IP is the global IP of the wireless router

var url = require('url');
var qs = require('querystring');
var sys = require('sys')
var http = require('http');
function puts(error, stdout, stderr) { sys.puts(stdout) }
var exec = require('child_process').exec;
var fs = require('fs'); // file system variable
http.createServer( function(req,res) {

    var query = require('url').parse(req.url).query; // query from url
    // parses and takes the arguments provided to led
    ledtoggle = require('querystring').parse(query).led;
    console.log(ledtoggle);
    // write the parsed data of ip to a file
    fs.writeFile("tmp.txt",ledtoggle, function(err){ 
	if(err){
	    console.log(err);
	}else {
	    console.log("written to file!");
	}
    });
    // report when the client was called
    var currentTime = new Date();
    console.log('Client called at '+currentTime);

    res.writeHead(200, {'Content-Type':'text/plain'});
    // I can use exec function here to give any commands on the terminal
    // exec("Linux command",puts);
    res.end();
    
}).listen('8124'); // listening on port 8124
