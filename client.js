var app = window.page = require('page');

var index = require('./lib/routes');
var article = require('./lib/routes/article');
var model = require('./lib/models/article-client');

app.base('/');
app('/', index(model));
app(/^\/([0-9]+)\/?$/, article(model));
