var toTwoDigitsString = function (val) {
  return (val < 10 ? "0" : '') + val;
};

var isOClock = function (time) {
  return time == '00';
}

var nextSecond = function(second) {
  return second == 59 ? 0 : (second + 1);
}

var nextMinute = nextSecond;
var nextHour = function(hour) {
  return hour == 23 ? 0 : (hour + 1);
}
