var Q = require('q');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get()
    .then(function(data) {
      data = data.map(function(item) {
        delete item.body;
        return item;
      });
      res.render("fruitmachine", {
        module: "satsuma",
        model: { articles: data }
      });
    });
};
