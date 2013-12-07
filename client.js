var app = require('page');

var index = require('./client/controllers');
var article = require('./client/controllers/article');
var pane = require('./client/pane');

app.base('/');
app('/', index);
app(/^([0-9]+)\/?$/, article);

module.exports = function() {
  app.start();
};
