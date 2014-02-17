/**
 * External dependencies
 */

var express = require('express');
var resources = require('./lib/resources');
var prepareViews = require('./views')();

var app = express();
app.use(express.cookieParser());

app.set('view engine', 'html');
app.enable('view cache');
app.set('view', require('./lib/view'));
app.engine('html', require('hogan-express'));
app.set('views', 'templates');

/**
 * Api endpoints
 */

app.get('/api/articles.json', require('./controllers/api/article'));
app.get(/^\/api\/article\/([0-9]+)\.json\/?$/, require('./controllers/api/article'));

/**
 * Gui endpoints
 */

app.get('/', resources, require('./controllers'));
app.get(/^\/([0-9]+)\/?$/, resources, require('./controllers/article'));

/**
 * Offline endpoints
 */

// HACK: The iframe in which to attach an AppCache manifest to
app.get('/offline/iframe', require('./controllers/offline/iframe'));

// HACK: Because we use fallbacks ajax request will now never fail - they will always be 200.
// If we are truly offline we need to be able to figure out on the client side that the request
// has failed.  So if the response is 'offline' we know we're offline :)
app.get('/api/offline', require('./controllers/offline/api'));

// The AppCache manifest itself
app.get('/offline/manifest', require('./controllers/offline/manifest'));

// Static endpoints
app.use(express.static('public'));

// Let's go
prepareViews.then(function() {
  app.listen(3000);
});
