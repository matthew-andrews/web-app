var List = require('../views/list');
var article = require('../models/article');
var pane = require('../pane');

function synchronize(view) {
  article.synchronize()
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
      synchronize(view);
    });
}

module.exports = function(req) {
  var json;
  if (req.init) json = window.json;
  var view = new List(json);
  if (!req.init) synchronize(view);

  pane.set(view);
  attachEvents(view);
};
