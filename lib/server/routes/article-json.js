var model = require('../models/article');

module.exports = function(req, res) {
  model.get(function(err, data) {
    res.json(data);
  });
};
