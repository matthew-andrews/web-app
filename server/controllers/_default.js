var resources = require('../models/resource');

module.exports = function(res, view) {
  resources.get()
    .then(function(resources) {
      res.render('layouts/default', { resources: resources, html: view.toHTML(), json: JSON.stringify(view.toJSON()) });
    });
};
