var resource = require('../models/resource');

module.exports = function(req, res, next) {
  resource.get()
    .then(function(resources) {
      res.locals.resources = resources;
      next();
    });
};
