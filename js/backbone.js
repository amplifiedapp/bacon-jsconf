// Get an event stream for all add remove and reset events in the collection
var reposProp = eventStream(repos, 'add remove reset').map(function(args) {
    return args[1];

// and make it a property!
}).toProperty(repos);

// Results count is easy!
var resultsCount = reposProp.map('.models').map('.length');

// Render the repos
reposProp.map(renderRepos).assign($('#list'), 'html');
// Render the counts
resultsCount.assign($('#resultsCount'), 'text');

// Create a model for the filter input
var filter = new Backbone.Model({ filter: '' });

// Just for fun, we assign the input to a backbone property
var filterSearches = $('#filter').asEventStream('input')
    .debounce(300)
    .map('.target').map('.value')
    .assign(filter, 'set', 'filter');

// We make it a Bacon Property!
modelProperty(filter, 'filter')
    .skipDuplicates()
    .filter(function(text) {
        return text.length >= 3 || text === '';
    })
    .onValue(function(text) { repos.search(text); });
