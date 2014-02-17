var Q = require('q');
var fs = require('fs');
var resources = { js: 'web-app.js', css: 'web-app.css' };

function mtime(key) {
  return Q.nfcall(fs.stat, __dirname + '/../../public/' + resources[key])
    .then(function(stats) {
      return stats.mtime.getTime();
    });
}

exports.get = function() {
  var keys = Object.keys(resources);
  return Q.all(keys.map(mtime))
    .then(function(resources) {
      return keys.reduce(function(accumlator, key, index) {
        accumlator[key] = resources[index];
        return accumlator;
      }, {});
    });
};
