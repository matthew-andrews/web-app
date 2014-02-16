var Article = require('../views/article');
var articles = require('../models/article');
var pane = require('../pane');
var view;

function render(data) {
  view.model.set(data);
  view.render();
  view.setup();
}

function article(req) {
  var json = req.init ? window.json : undefined;

  if (view) {
    view.model.clear();
  } else {
    view = new Article(json);
  }

  if (!req.init || !json) {
    articles.get(parseInt(req.params[0], 10)).then(render);
    pane.inject(view);
  } else {
    pane.set(view);
  }
}

module.exports = article;
article.synchronize = articles.synchronize;
