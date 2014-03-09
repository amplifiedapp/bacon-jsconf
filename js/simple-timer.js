var minutesGen = clockNumbersGenerator(clockLongNumbers);
var hoursGen = clockNumbersGenerator(clockShortNumbers);

var seconds = Bacon.repeatedly(1000, clockLongNumbers)
  .map(normalizeNumber);

seconds.assign($("#seconds"), 'text');

var minutes = seconds
  .filter(function(value) {
    return value == "00";
  })
  .map(function() { return minutesGen.next(); });

minutes.assign($("#minutes"), 'text');

var hours = minutes
  .filter(function(value) {
    return value == "00";
  })
  .map(function() { return hoursGen.next(); });

hours.assign($("#hour"), 'text');

var fullHour = hours.toProperty('00').map(Array)
  .combine(minutes.toProperty('00').map(Array), '.concat')
  .combine(seconds.toProperty('00').map(Array), '.concat')
  .map(function(arr) {
    return arr.join(':');
  });

var alarmTime = $('#alarmTime').asEventStream('keypress');
var alarmSet = $('#setAlarm').asEventStream('click');

var currentAlarm = alarmTime.sampledBy(alarmSet)
  .map('.target').map('.value');

currentAlarm.assign(function(alarm) {
  $('#currentAlarm').append('<li>'+alarm+'</li>');
});

var alarmSignal = currentAlarm.flatMap(function(time) {
  return fullHour.filter(function(current) { return current == time; });
});

alarmSignal.onValue(function(time) {
  alert('Alarm sounds! It\'s ' + time);
});
