/**
 * External dependencies
 */

var express = require('express');
var resources = require('./lib/resources');
var prepareViews = require('./views');

var app = express();
app.use(express.cookieParser());

app.set('view engine', 'html');
app.enable('view cache');
app.set('view', require('./lib/view'));
app.engine('html', require('hogan-express'));
app.set('views', 'templates');

// Api only endpoints
app.get('/api/articles.json', require('./controllers/api/article'));
app.get(/^\/api\/article\/([0-9]+)\.json\/?$/, require('./controllers/api/article'));

// Shared endpoints
app.get('/', resources, require('./controllers'));
app.get(/^\/([0-9]+)\/?$/, resources, require('./controllers/article'));

// Offline endpoints
app.get('/offline/iframe', require('./controllers/iframe'));
app.get('/offline/manifest', require('./controllers/manifest'));
app.get('/api/offline', require('./controllers/offline'));

// Expose static resources
app.use(express.static('public'));

prepareViews().then(function() {
  app.listen(3000);
});
