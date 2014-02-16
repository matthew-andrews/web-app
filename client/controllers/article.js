var Article = require('../views/article');
var articles = require('../models/article');
var pane = require('../lib/pane');
var view;

function render(data) {
  view.model.set(data);
  view.render();
  view.setup();
}

function article(req) {
  if (view) {
    view.model.clear();
  } else {
    view = new Article(req.data);
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
