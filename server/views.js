/**
 * External dependencies
 */

var Q = require('q');
var hoganjs = require('hogan.js');
var fruitmachine = module.exports = require('fruitmachine');
var readFile = require('fs').readFile;

/**
 * Local variables
 */

var views = ['apple', 'satsuma'];

function register(name) {
  return Q.nfcall(readFile, __dirname + '/../views/partials/' + name + '.html', 'utf8')
    .then(function(raw) {
      var template = hoganjs.compile(raw);
      fruitmachine.define({ name: name, template: template.render.bind(template) });
    });
}

module.exports = function() {
  return Q.all(views.map(function(view) {
    return register(view);
  }));
};
