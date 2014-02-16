var Q = require('q');
var model = require('../models/article');

module.exports = function(req, res) {
  var id = parseInt(req.params[0], 10);
  model.get(id)
    .then(function(data) {
      res.json(data);
    });
};
