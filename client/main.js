/**
 * External dependencies
 */

var app = require('page');

var appcache = require('./libs/appcache');
var indexeddb = require('./libs/indexeddb');

var index = require('./controllers');
var article = require('./controllers/article');
var pane = require('./pane');

app.base('/');
app('/', index);
app(/^([0-9]+)\/?$/, article);

module.exports = function() {
  appcache().then(function(result) {
    if (result === 'updateready') {
      if (confirm("Your app has been updated.  Would you like to restart?")) {
        location.reload();
      }
    }
  });
  indexeddb()
    .then(function() {
      app.start();
      return article.synchronize();
    });
};
