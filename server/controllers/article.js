var Q = require('q');
var fruitmachine = require('fruitmachine');
var model = require('../models/article');
var resources = require('../models/resource');

module.exports = function(req, res) {
  Q.all([resources.get(), model.get(parseInt(req.params[0], 10))])
    .spread(function(resources, data) {
    console.log("resources", resources);
      var view = fruitmachine({
        module: 'apple',
        model: data
      });
      res.render('layouts/default', { resources: resources, html: view.toHTML(), json: JSON.stringify(view.toJSON()) });
    });
};
