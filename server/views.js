/**
 * External dependencies
 */

var Q = require('q');
var hoganjs = require('hogan.js');
var fruitmachine = require('fruitmachine');
var fs = require('fs');

/**
 * Local variables
 */

var directory = __dirname + '/../templates/partials';

function register(name) {
  return Q.nfcall(fs.readFile, directory + '/' + name, 'utf8')
    .then(function(raw) {
      var template = hoganjs.compile(raw);
      fruitmachine.define({ name: name, template: template.render.bind(template) });
    });
}

module.exports = function() {
  return Q.nfcall(fs.readdir, directory)
    .then(function(views) {
      return Q.all(views.map(register));
    });
};
