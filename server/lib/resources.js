var resource = require('../models/resource');

module.exports = function(req, res, next) {
  resource.get()
    .then(function(resources) {

      // HACK: We add a 'up' cookie during an AppCache manifest update
      // so that on the server we know to return bootstraps instead of
      // content for gui endpoints.  This stops content being cached in
      // the AppCache (content should be inside the local databases)
      if (req.cookies.up) {
        res.render("layouts/default", {
          resources: resources,
          html: 'Please wait',
          json: JSON.stringify('')
        });
      } else {
        res.locals.resources = resources;
        next();
      }
    });
};
