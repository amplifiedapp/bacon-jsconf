var range = function(i) { return i?range(i-1).concat(i):[] };
var clockLongNumbers = range(59).concat(0);
var clockShortNumbers = range(23).concat(0);

var normalizeNumber = function (val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return ''+val;
  }
};

var clockNumbersGenerator = function (range) {
  var validClockNumbers = range;
  var i = 0;
  while (true) {
    if ( i == validClockNumbers.length) { i = 0; }
    yield normalizeNumber(validClockNumbers[i]);
    i++;
  }
};
