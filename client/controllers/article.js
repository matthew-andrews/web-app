var Module = require('../views/article');
var model = require('../models/article');
var pane = require('../pane');

module.exports = function(req) {
  var json;
  if (req.init) json = window.json;
  var view = new Module(json);

  if (!req.init) {
    model.get(parseInt(req.params[0], 10))
      .then(function(data) {
        view.model.set(data);
        view.render();
      });
    view.render();
  }

  pane.set(view);
};
