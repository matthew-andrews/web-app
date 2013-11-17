var fruitmachine = require('fruitmachine');
var current = undefined;

module.exports = {
  set: function(view) {
    if (current) {
      current.teardown();
      view.inject(document.getElementById('js-body'));
    }
    current = view;
    view.setup();
  },
  get: function() {
    return current;
  }
};
