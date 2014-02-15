var model = require('../models/resource');

module.exports = function(req, res) {
  res.set('Content-Type', 'text/cache-manifest');

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
