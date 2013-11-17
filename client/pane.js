var fruitmachine = require('fruitmachine');
var current = undefined;

module.exports = {
  set: function(view) {
    if (current) {
      current.teardown();
    }
    current = view;
    view.inject(document.getElementById('js-body'));
    view.setup();
  },
  setup: function(json) {
    var view = fruitmachine(json);
    current = view;
    view.setup();
  },
  get: function() {
    return current;
  }
};
