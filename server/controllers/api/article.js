var articles = require('../../models/article');

module.exports = function(req, res) {
  var id = parseInt(req.params[0], 10);
  articles.get(id)
    .then(function(data) {
      res.json(data);
    });
};
