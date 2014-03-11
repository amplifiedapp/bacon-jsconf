// Set up timer seconds, minutes, and hours
var seconds = null;

var minutes = null;

var hours = null;

// Build full hour from the 3 streams
var fullHour = null;

// Set up alarms
var alarmTime = $('#alarmTime').asEventStream('keypress');
var alarmSet = $('#setAlarm').asEventStream('click');

var currentAlarm = null;

var alarmSignal = null;

// Bind everything to the DOM
// #hour, #minutes, #seconds
// Alarms list => #currentAlarm

// Fire the alarm!!


