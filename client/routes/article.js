var fruitmachine = require('fruitmachine');
var Module = require('../../lib/modules/article');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(parseInt(req.params[0], 10), function(err, data) {
    var view = new Module({
      model: new fruitmachine.Model(data)
    });
    view.render();
    view.inject(document.getElementById('js-body'));
    view.setup();
  });
};
