var fruitmachine = require('fruitmachine');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(function(err, data) {
    var view = fruitmachine({
      module: "satsuma",
      model: { articles: data }
    });
    res.render('layouts/default', { html: view.toHTML(), json: JSON.stringify(view.toJSON()) });
  });
};
