var Q = require('q');
var model = require('../models/article');
var _render = require('./_default');

module.exports = function(req, res) {
  model.get()
    .then(function(data) {
      _render(res, {
          module: "satsuma",
          model: { articles: data }
        })
      );
    });
};
