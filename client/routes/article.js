var fruitmachine = require('fruitmachine');
var Module = require('../modules/article');
var model = require('../models/article');
var pane = require('../pane');

function loadArticle(id, view) {
    model.get(id, function(err, data) {
      view.model.set(data);
      view.render();
    });
}

module.exports = function(req) {
  var json;
  if (req.init) json = window.json;
  var view = new Module(json);

  if (!req.init) {
    loadArticle(parseInt(req.params[0], 10), view);
    view.render();
  }

  pane.set(view);
}
