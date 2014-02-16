var resource = require('../models/resource');

module.exports = function(req, res, next) {
  resource.get()
    .then(function(resources) {
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
