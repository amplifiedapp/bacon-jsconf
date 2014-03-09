// Hacer un listado de modelos filtrables por un input.

var model = new Backbone.Model({
    title: 'A title',
    description: 'A description'
});

// You can create buses as a way to expose setting variables.
model.titleUpdates = new Bacon.Bus();

// That way, it's easy to make functional validations
var validTitleUpdates = model.titleUpdates.filter(function(title) {
    return title != 'A title 5';
});
validTitleUpdates.onValue(model, 'set', 'title');


var modelTitle = modelProperty(model, 'title');
var modelDescription = modelProperty(model, 'description');

var modelTitleView = modelTitle.map('.toUpperCase');

modelTitleView.onValue($('.js-title'), 'text');

modelDescription.onValue($('.js-description'), 'text');

Bacon
    .repeatedly(1000, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    .map(function(val) { return 'A title ' + val; })
    .onValue(model.titleUpdates, 'push');

function modelProperty(model, attr) {
    return eventStream(model, 'change:' + attr).map(function(args) {
        return args[1]; // value
    }).toProperty(model.get(attr));
}

function eventStream(obj, ev) {
    return Bacon.fromBinder(function(sink) {
        var handler = function() { sink(arguments); };
        obj.on(ev, handler);
        return function unsubscribe() {
            obj.off(ev, handler);
        };
    });
}
