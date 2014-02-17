var articles = require('../models/article');

module.exports = function(req, res) {
  articles.get()
    .then(function(data) {
      data.forEach(function(item, index) {
        delete data[index].body;
      });
      res.render("fruitmachine", {
        module: "satsuma",
        model: { articles: data }
      });
    });
};
