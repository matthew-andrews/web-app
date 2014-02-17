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

// Api endpoints
app.get('/api/articles.json', require('./controllers/api/article'));
app.get(/^\/api\/article\/([0-9]+)\.json\/?$/, require('./controllers/api/article'));

// Gui endpoints
app.get('/', resources, require('./controllers'));
app.get(/^\/([0-9]+)\/?$/, resources, require('./controllers/article'));

// Offline endpoints
app.get('/offline/iframe', require('./controllers/offline/iframe'));
app.get('/offline/manifest', require('./controllers/offline/manifest'));
app.get('/api/offline', require('./controllers/offline/api'));

// Static endpoints
app.use(express.static('public'));

// Let's go
prepareViews.then(function() {
  app.listen(3000);
});
