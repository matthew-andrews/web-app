var model = require('../../models/resource');

module.exports = function(req, res) {
  res.set('Content-Type', 'text/cache-manifest');

  // HACK: The browser will automatically check for an AppCache update
  // every time a page is loaded that is loaded from manifest file, even
  // if it itself doesn't have a manifest linked to it (durr).  To get
  // back in control force the AppCache update mechanism to fail if there
  // is no 'up' cookie (which is set when we add the iframe).
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
