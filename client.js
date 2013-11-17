var app = require('page');

var index = require('./client/routes');
var article = require('./client/routes/article');
var model = require('./client/models/article');
var pane = require('./client/pane');

app.base('/');
app('/', index);
app(/^([0-9]+)\/?$/, article);

module.exports = function(json) {

  // Dispatch with false because we should already have content, unless we don't.
  app.start({ dispatch: false });
  pane.setup(json);
};
