var model = require('../../models/resource');

module.exports = function(req, res) {
  res.set('Content-Type', 'text/cache-manifest');

  // Unless we have an 'up' cookie don't return a manifest
  if (!req.cookies.up) return res.send(400);

  model.get()
    .then(function(results) {
      var resources = Object.keys(results).map(function(resource) {
        return resource + '?icb=' + results[resource];
      });
      res.render('layouts/manifest', {
        resources: resources
      });
    });
};
