digitalWrite(NodeMCU.D0,0);
servo= require("servo").connect(2,{range:2});

STEP=0.05;
DIR= 1;
angulo=0;

var sensor = require("HC-SR04").connect(NodeMCU.D1,NodeMCU.D2,function(dist) {
  if (true || dist<250) {
    console.log(angulo+" "+Math.floor(dist)+" cm away");
  }
});

setInterval(function() {
  angulo=angulo+DIR*STEP;
  if (angulo>1) { DIR=-DIR; angulo=1+DIR*STEP; }
  if (angulo<0) { DIR=-DIR; angulo=0+DIR*STEP; }  
  servo.move(angulo,1,function () { sensor.trigger(); });
}, 2000);
