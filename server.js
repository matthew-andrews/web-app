var express = require('express');
var offline = require('offline-express');

// HACK: Force the views to get instantiated
require('./server/views');

var index = require('./server/controllers');
var article = require('./server/controllers/article');
var articleJson = require('./server/controllers/article-json');

var app = express();
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// Offline logic
app.use(offline({
  api: 'api',
  bootCallback: function(req, res, next) {

    // TODO: Add bootstrap rendering logic here
    res.send("Offline page hit");
  }
}));

// Shared endpoints
app.get('/', index);
app.get(/^\/([0-9]+)\/?$/, article);

// API only endpoints
app.get('/api/articles.json', articleJson);

app.use(express.static('public'));

app.listen(3000);
