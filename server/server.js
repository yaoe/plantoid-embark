const fs = require('fs');

const WebSocket = require('ws');
const ws = new WebSocket('wss://ws.blockchain.info/inv');

ws.on('open', function open() {
	ws.send('{"op":"addr_sub", "addr":"16tWKiHkx3D4ncjATYiqjazTSTWRQsYis6"}');
});

ws.on('message', function incoming(data) {
	var data = JSON.parse(data);
	
	var origin = data.x.inputs[0].prev_out.addr;
	var destination = data.x.out[0].addr;
	var refund = data.x.out[1].addr;
	var amount = data.x.out[0].value;

fs.appendFile('BTClog.txt', "transaction origin : " + origin + "<br/>\n", function (err) { if(err) throw err; });
fs.appendFile('BTClog.txt', "transaction destination : " + destination + "<br/>\n", function (err) { if(err) throw err; });
fs.appendFile('BTClog.txt', "transaction refund : " + refund + "<br/>\n", function (err) { if(err) throw err; });
fs.appendFile('BTClog.txt', "amount : " + amount + "<br/>\n", function (err) { if(err) throw err; });

/*	
	console.log("transaction origin : " + origin);
	console.log("transaction destination : " + destination);
	console.log("transaction refund : " + refund);
	console.log("amount : " + amount);
*/
});

