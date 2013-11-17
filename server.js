var express = require('express');
var app = express();

var model = require('./lib/server/models/article');

var index = require('./lib/routes');
var article = require('./lib/routes/article');
var articleJson = require('./lib/routes/article-json');

app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// Shared endpoints
app.get('/', index(model));
app.get(/^\/([0-9]+)\/?$/, article(model));

// API only endpoints
app.get('/api/articles.json', articleJson(model));

app.use(express.static('public'));

app.listen(3000);
