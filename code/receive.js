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

http.createServer( function(req,res) {

    var query = require('url').parse(req.url).query;
    ledtoggle = require('querystring').parse(query).led;

    var currentTime = new Date();
    console.log('Client called at '+currentTime);



    res.writeHead(200, {'Content-Type':'text/plain'});

    switch( ledtoggle ) {
    case 'on':
	res.write('LED on...\n');
	exec("echo 'hello'>>/home/pi/code/test.txt",puts);
	break;
    case 'off':
	res.write('LED off...\n');
	exec("echo 'hi'>>/home/pi/code/test.txt",puts);
      break
    }

    res.end();

}).listen('8124');
