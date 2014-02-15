var Q = require('q');
var fruitmachine = require('fruitmachine');
var model = require('../models/article');
var resources = require('../models/resource');

module.exports = function(req, res) {
  Q.all([resources.get(), model.get()])
    .spread(function(resources, data) {
      var view = fruitmachine({
        module: "satsuma",
        model: { articles: data }
      });
      res.render('layouts/default', { resources: resources, html: view.toHTML(), json: JSON.stringify(view.toJSON()) });
    });
};
