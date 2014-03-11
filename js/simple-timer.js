// Set up timer seconds, minutes, and hours
var seconds = Bacon.interval(1000, 'tick')
  .scan(0, function(seconds) {
    return seconds == 59 ? 0 : (seconds + 1);
  })
  .map(toTwoDigitsString);

var minutes = seconds
  .changes()
  .filter(isOClock)
  .scan(0, function(minutes) {
    return minutes == 59 ? 0 : (minutes + 1);
  })
  .map(toTwoDigitsString);

var hours = minutes
  .changes()
  .filter(isOClock)
  .scan(0, function(hours) {
    return hours == 23 ? 0 : (hours + 1);
  })
  .map(toTwoDigitsString);

// Build full hour from the 3 streams
var fullHour = hours.map(Array)
  .combine(minutes.map(Array), '.concat')
  .combine(seconds.map(Array), '.concat')
  .map(function(arr) {
    return arr.join(':');
  });

// Set up alarms
var alarmTime = $('#alarmTime').asEventStream('keypress');
var alarmSet = $('#setAlarm').asEventStream('click');

var currentAlarm = alarmTime.sampledBy(alarmSet)
  .map('.target').map('.value');

var alarmSignal = currentAlarm.flatMap(function(time) {
  return fullHour.filter(function(current) { return current == time; });
});

// Bind everything to the DOM
seconds.assign($("#seconds"), 'text');
minutes.assign($("#minutes"), 'text');
hours.assign($("#hour"), 'text');

currentAlarm.assign(function(alarm) {
  $('#currentAlarm').append('<li>'+alarm+'</li>');
});

// Fire the alarm!!
alarmSignal.onValue(function(time) {
  alert('Alarm sounds! It\'s ' + time);
});
