var Q = require('q');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get()
    .then(function(data) {
      res.json(data);
    });
};
