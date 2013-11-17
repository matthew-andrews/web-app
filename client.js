var app = window.page = require('page');

var index = require('./lib/routes');
var article = require('./lib/routes/article');
var model = require('./lib/models/article-client');

app.base('/');
app('/', index(model));
app(/^([0-9]+)\/?$/, article(model));

// Dispatch with false because we should already have content,
// unless we don't.
app.start({ dispatch: false });
