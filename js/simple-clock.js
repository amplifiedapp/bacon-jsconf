// some utility functions

var range = function(i) { return i?range(i-1).concat(i):[] }
var clockLongNumbers = range(59).concat(0);
var clockShortNumbers = range(23).concat(0);

var normalizeNumber = function (val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
}

var clockNumbersGenerator = function (range) {
  var validClockNumbers = range;
  var i = 0;
  while (true) {
    if ( i == validClockNumbers.length) { i = 0; }
    yield normalizeNumber(validClockNumbers[i]);
    i++;
  }
}



// Here is the Bacon!

var minutes = clockNumbersGenerator(clockLongNumbers);
var hours = clockNumbersGenerator(clockShortNumbers);

var secondsBus = new Bacon.Bus();
var minutesBus = new Bacon.Bus();
var hoursBus = new Bacon.Bus();

Bacon.repeatedly(1000, clockLongNumbers)
     .map(normalizeNumber)
     .onValue(function (value) {
       $("#seconds").text(value);
       secondsBus.push(value);
     });

secondsBus.filter(function(value) {
          return value == "00";
        }).onValue(function (value) {
            var minute = minutes.next();
            $("#minutes").text(minute);
            minutesBus.push(minute);
        });

minutesBus.filter(function(value) {
        return value == "00";
      }).onValue(function (value) {
        var hour = hours.next();
        $("#hour").text(hour);
        hoursBus.push(hour);
      });

