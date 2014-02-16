/**
 * External dependencies
 */

var app = require('page');

var appcache = require('./client/appcache');
var indexeddb = require('./client/libs/indexeddb');

var index = require('./client/controllers');
var article = require('./client/controllers/article');
var pane = require('./client/pane');

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
