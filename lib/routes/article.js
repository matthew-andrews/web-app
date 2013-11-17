var fruitmachine = require('fruitmachine');
var model = require('../models/article');
var Module = require('../modules/article');

module.exports = function(req, res) {
  model.get(parseInt(req.params[0], 10), function(err, data) {
    var view = new Module({
      model: new fruitmachine.Model(data)
    });
    res.render('layout', { yield: view.toHTML() });
  });
};
