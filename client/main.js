/**
 * External dependencies
 */

var app = require('page');

var appcache = require('./lib/appcache');
var indexeddb = require('./lib/indexeddb');

var index = require('./controllers');
var article = require('./controllers/article');

function middleware(req, next) {
  req.data = req.init ? window.json : undefined;
  delete req.init;
  next();
}

app.base('/');
app('/', middleware, index);
app(/^([0-9]+)\/?$/, middleware, article);

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
