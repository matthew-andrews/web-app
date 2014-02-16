var current;

module.exports = {
  set: function(view) {
    if (current) {
      current.teardown();
    }
    current = view;
  },
  get: function() {
    return current;
  },
  inject: function(view) {
    module.exports.set(view)
    view.render().inject(document.getElementById('js-body'));
  }
};
