var fruitmachine = require('fruitmachine');
var Module = require('../../lib/modules/list');
var model = require('../models/article');
var pane = require('../pane');

function loadArticles(view) {
  model.get(function(err, data) {
    view.model.set('articles', data);
    view.render();
    view.setup();
  });
}

module.exports = function() {
    var view = new Module();
    view.on('refreshbuttonclick', function() {
      loadArticles(view);
    });
    view.render();
    pane.set(view);
    loadArticles(view);
};
