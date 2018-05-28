Servo= {};
Servo.connect = function (pin) {
  var interval, currentPos;

  return {move:function(pos, time, callback) {
    if (time===undefined) time = 1000;
    var amt = 0;
    if (currentPos===undefined) currentPos = pos;
    if (interval)
      clearInterval(interval);
    var initial = currentPos;
    interval = setInterval(function() {
      if (amt>1) {
        clearInterval(interval);
        interval = undefined;
        amt = 1;
        if (callback) callback();
      }
      currentPos = pos*amt + initial*(1-amt);
      digitalPulse(pin, 1, 1+E.clip(currentPos,0,1));
      amt += 1000.0 / (20*time);
    }, 20);
  }};
};
