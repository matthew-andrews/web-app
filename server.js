/**
 * External dependencies
 */

var express = require('express');
var resources = require('./server/middleware/resources');

// HACK: Force the views to get instantiated
var prepareViews = require('./server/views');

var app = express();
app.use(express.cookieParser());

app.set('view engine', 'html');
app.enable('view cache');
app.set('view', require('./server/view'));
app.engine('html', require('hogan-express'));

// API only endpoints
app.get('/api/articles.json', require('./server/controllers/article-json'));
app.get(/^\/api\/article\/([0-9]+)\.json\/?$/, require('./server/controllers/article-json'));

// Shared endpoints
app.get('/', resources, require('./server/controllers'));
app.get(/^\/([0-9]+)\/?$/, resources, require('./server/controllers/article'));

// Offline endpoints
app.get('/offline/iframe', require('./server/controllers/iframe'));
app.get('/offline/manifest', require('./server/controllers/manifest'));

// Expose static resources
app.use(express.static('public'));

prepareViews().then(function() {
  app.listen(3000);
});
