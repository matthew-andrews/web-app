var resources = require('../models/resource');

module.exports = function(res, data) {
  resources.get()
    .then(function(resources) {
      res.render('fruitmachine', {
        resources: resources,
        data: data
      });
    });
};
