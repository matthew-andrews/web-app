var express = require('express');

// HACK: Force the views to get instantiated
require('./server/views');

var index = require('./server/controllers');
var article = require('./server/controllers/article');
var articleJson = require('./server/controllers/article-json');

// Offline
var iframe = require('./server/controllers/iframe');
var manifest = require('./server/controllers/manifest');

var app = express();
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// Shared endpoints
app.get('/', index);
app.get(/^\/([0-9]+)\/?$/, article);

// API only endpoints
app.get('/api/articles.json', articleJson);

// Offline endpoints
app.get('/offline/iframe', iframe);
app.get('/offline/manifest', manifest);

app.use(express.static('public'));

app.listen(3000);
