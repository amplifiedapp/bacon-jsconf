// Some data from trending repos
var reposData = [
    { title: 'neovim/neovim', description: "vim's rebirth for the 21st century"},
    { title: 'sindresorhus/pageres', description: "Get screenshots of websites in different resolutions"},
    { title: 'papers-we-love/papers-we-love', description: "Papers from the computer science community to read and discuss."},
    { title: 'Snugug/north', description: "Design and development standards to align and guide your project."},
    { title: 'mozilla/localForage', description: "Offline storage, improved."},
    { title: 'dieulot/instantclick', description: "InstantClick makes following links in your website instant."},
    { title: 'facebook/Shimmer', description: "An easy way to add a simple shimmering effect to any view in an iOS app, which is particularly useful as an unobtrusive loading indicator."},
    { title: 'sharelatex/sharelatex', description: "A web-based collaborative LaTeX editor"},
    { title: 'kni-labs/rrssb ', description: "Ridiculously Responsive Social Sharing Buttons"},
    { title: 'twbs/ratchet ', description: "Build mobile apps with simple HTML, CSS, and JS components."},
    { title: 'twbs/bootstrap ', description: "The most popular front-end framework for developing responsive, mobile first projects on the web."},
];

var repos = new Backbone.Collection();

// Some fake method that mimics an ajax request.
repos.search = function(text) {
    var that = this;
    setTimeout(function() {
        that.set(_.filter(reposData, function(model) {
            return _.any(['title', 'description'], function(prop) {
                return model[prop].indexOf(text) !== -1;
            });
        }));
    }, 500);
};

function renderRepos(repos) {
    return repos.map(function(repo) {
        return '<li>' + renderRepo(repo) + '</li>';
    });
}

function renderRepo(repo) {
    return '<b>' + repo.get('title') + '</b> <span>' + repo.get('description')  + '</span>';
}

// Core functions to go from Backbone to Bacon and back
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
