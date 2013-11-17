var fruitmachine = require('fruitmachine');
var model = require('../models/article');
var Module = require('../modules/list');

module.exports = function(req, res) {
  model.get(function(err, data) {
    var module = new Module({
      model: new fruitmachine.Model({ articles: data })
    });
    res.render('layout', { yield: module.toHTML() });
  });
};
