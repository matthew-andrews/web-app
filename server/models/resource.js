var Q = require('q');
var fs = require('fs');
var resources = { js: 'web-app.js', css: 'web-app.css' };

function mtime(key, cb) {
  fs.stat(__dirname + '/../../public/' + resources[key], function(err, stats) {
    if (err) return cb(err);
    cb(null, key, stats.mtime.getTime());
  });
}

exports.get = function() {
  return Q.all(Object.keys(resources).map(function(resource) {
    return Q.nfcall(mtime, resource);
  }))
    .then(function(results) {
      return results.reduce(function(previousValue, currentValue) {
        previousValue[currentValue[0]] = currentValue[1];
        return previousValue;
      }, {});
    });
};
