var http=require('http');

var os = require('os');
var fs = require('fs');
var path = require('path');
var http = require('http');

var interfaces = os.networkInterfaces();
var addresses = {};

for (ifnet in interfaces) {
    for (entry in interfaces[ifnet]) {
	var address = interfaces[ifnet][entry];
	if (address.family == 'IPv4' && !address.internal) {
	    addresses[ifnet] = address.address;
	}
    }
}

//console.log(addresses);

var macs = {};

for (ifnet in addresses) {
    var file = path.join('/sys/class/net', ifnet, "address");
    var mac = fs.readFileSync(file).toString().trim();
    macs[ifnet] = mac;
}

//console.log(macs);

var hostname = fs.readFileSync('/etc/hostname').toString().trim();

//console.log(hostname);

var user = 'Pi3';
var options = {
    hostname: 'students.washington.edu',
    port: 80,
    path: '/svbhave/project/close.php?action=report&ip=' + addresses['wlan0'] +'\
&mac=' + macs['wlan0'] + '&name=' + hostname + '&user=' + user, method: 'GET'
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
	console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
req.end();
