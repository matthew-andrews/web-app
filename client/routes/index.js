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

function onRefreshButtonClick(view) {
  return function() {
    loadArticles(this);
  }
}

// HACK Ensure the refreshbuttonclick listener is attached, but only once
function attachEvents(view) {
    view.off('refreshbuttonclick');
    view.on('refreshbuttonclick', onRefreshButtonClick(view));
};

module.exports = function(req) {
    var view = pane.get();
    if (!req.init) {
      view = new Module();
      view.render();
      loadArticles(view);
      pane.set(view);
    }
    attachEvents(view);
};

module.exports.attachEvents = attachEvents;
