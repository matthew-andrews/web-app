var List = require('../views/list');
var articles = require('../models/article');
var pane = require('../pane');
var view;

function render(data) {
  view.model.set('articles', data);
  view.render();
  view.setup();
}

module.exports = function(req) {
  var json = req.init ? window.json : undefined;

  if (view) {
    view.model.clear();
  } else {
    view = new List(json);
    view.on('refreshbuttonclick', function() {
      articles.synchronize().then(render);
    });
  }

  if (!req.init || !json) {
    articles.get().then(render);
    pane.inject(view);
  } else {
    pane.set(view);
  }
};
