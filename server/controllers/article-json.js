var Q = require('q');
var model = require('../models/article');

module.exports = function(req, res) {
  Q.all([model.get()])
    .spread(function(data) {
      res.json(data);
    });
};
