var Module = require('../views/list');
var model = require('../models/article');
var pane = require('../pane');

function loadArticles(view) {
  model.get()
    .then(function(data) {
      view.model.set('articles', data);
      view.render();
      view.setup();
    });
}

// HACK Ensure the refreshbuttonclick listener is attached, but only once
function attachEvents(view) {
    view.off('refreshbuttonclick');
    view.on('refreshbuttonclick', function() {
      loadArticles(view);
    });
}

module.exports = function(req) {
  var json;
  if (req.init) json = window.json;
  var view = new Module(json);

  if (!req.init) {
    loadArticles(view);
    view.render();
  }

  pane.set(view);
  attachEvents(view);
};
