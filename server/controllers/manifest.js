var Q = require('q');
var fs = require('fs');

var resources = ['web-app.js', 'css/global.css'];

function mtime(resource, cb) {
  fs.stat(__dirname + '/../../public/' + resource, function(err, stats) {
    if (err) return cb(err);
    cb(null, '/' + resource + '?icb=' + stats.mtime.getTime());
  });
}

module.exports = function(req, res) {
  res.set('Content-Type', 'text/cache-manifest');

  Q.all(resources.map(function(resource) {
    return Q.nfcall(mtime, resource);
  }))
    .then(function(results) {
      res.render('layouts/manifest', {
        resources: results
      });
    });
};
