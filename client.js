var app = require('page');

var index = require('./client/controllers');
var article = require('./client/controllers/article');
var pane = require('./client/pane');

app.base('/');
app('/', index);
app(/^([0-9]+)\/?$/, article);

// Dispatch with false because we should already have content, unless we don't.
module.exports = function(json) {
  app.start();
};
