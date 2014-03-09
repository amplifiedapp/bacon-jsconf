var range = function(i) { return i ? range(i-1).concat(i) : []; };
var secondsNumbers = range(59).concat(0);

var toTwoDigitsString = function (val) {
  return (val < 10 ? "0" : '') + val;
};

function isOClock(time) {
  return time == '00';
}
