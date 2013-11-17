var fruitmachine = require('fruitmachine');
var Module = require('../../modules/article');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(parseInt(req.params[0], 10), function(err, data) {
    var view = new Module({
      model: new fruitmachine.Model(data)
    });
    res.render('layout', { yield: view.toHTML() });
  });
};
