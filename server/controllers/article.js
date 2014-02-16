var articles = require('../models/article');

module.exports = function(req, res) {
  articles.get(parseInt(req.params[0], 10))
    .then(function(data) {
      res.render("fruitmachine", {
        module: 'apple',
        model: data
      });
    });
};
