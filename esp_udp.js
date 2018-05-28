servo= Servo.connect(2,{range:2});
//A: el rango es los ms de pulso segun el manual
function onMessage(msg) {
    digitalWrite(NodeMCU.D0,1);
    setTimeout("digitalWrite(NodeMCU.D0,0);",200);
		console.log(msg);
		var m= msg.match(/^([^:]*):\[(-*[0-9.]+)/);
		if (m) { var x= parseFloat(m[2]);
			console.log("X",x);
			servo.move(x,100);
		}	
}

var port = 9876;
let dgram = require('dgram');
let srv = dgram.createSocket('udp4');
srv= srv.bind(port, function() {
  srv.on('message', function(msg, info) {
    console.log("<"+JSON.stringify(msg)); console.log("<"+JSON.stringify(info));
		onMessage(msg);
  });
  setInterval(testSend,1000);
});
srv.on('close', function() { console.log('server disconnected'); });
//U: esperar con $ nc -u -l 7400
function testSend() { srv.send("hola255 "+new Date()+"\n",9876,"255.255.255.255"); }


