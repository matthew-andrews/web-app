var fruitmachine = require('fruitmachine');
var Module = require('../../modules/list');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(function(err, data) {
    var view = new Module({
      model: new fruitmachine.Model({ articles: data })
    });
    res.render('layout', { yield: view.toHTML() });
  });
};
