var express = require('express');

// TODO: Add fruitmachine 'ready' event
require('./server/fruitmachine');

var index = require('./server/routes');
var article = require('./server/routes/article');
var articleJson = require('./server/routes/article-json');

var app = express();
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// Shared endpoints
app.get('/', index);
app.get(/^\/([0-9]+)\/?$/, article);

// API only endpoints
app.get('/api/articles.json', articleJson);

app.use(express.static('public'));

app.listen(3000);
