var app = window.page = require('page');

var index = require('./lib/client/routes');
var article = require('./lib/client/routes/article');
var model = require('./lib/client/models/article');

app.base('/');
app('/', index);
app(/^([0-9]+)\/?$/, article);

// Dispatch with false because we should already have content,
// unless we don't.
app.start({ dispatch: false });
