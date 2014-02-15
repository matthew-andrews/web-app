/**
 * External dependencies
 */

var express = require('express');
var resources = require('./server/middleware/resources');

// HACK: Force the views to get instantiated
var prepareViews = require('./server/views');

var app = express();
app.set('view engine', 'html');
app.enable('view cache');
app.set('view', require('./server/view'));
app.engine('html', require('hogan-express'));

// Shared endpoints
app.get('/', resources, require('./server/controllers'));
app.get(/^\/([0-9]+)\/?$/, resources, require('./server/controllers/article'));

// API only endpoints
app.get('/api/articles.json', require('./server/controllers/article-json'));

// Offline endpoints
app.get('/offline/iframe', require('./server/controllers/iframe'));
app.get('/offline/manifest', require('./server/controllers/manifest'));

// Expose static resources
app.use(express.static('public'));

prepareViews().then(function() {
  app.listen(3000);
});
