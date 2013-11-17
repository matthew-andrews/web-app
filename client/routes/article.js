var fruitmachine = require('fruitmachine');
var Module = require('../../lib/modules/article');
var model = require('../models/article');
var pane = require('../pane');

module.exports = function(req) {
  if (req.init) return;
  var view = new Module();

  model.get(parseInt(req.params[0], 10), function(err, data) {
    view.model.set(data);
    view.render();
    pane.set(view);
  });
}
