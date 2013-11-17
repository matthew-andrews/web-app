var express = require('express');
var app = express();

var index = require('./server/routes');
var article = require('./server/routes/article');
var articleJson = require('./server/routes/article-json');

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
