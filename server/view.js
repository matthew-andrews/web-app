/**
 * Module dependencies.
 */

var ExpressView = require('express/lib/view');
var fruitmachine = require('fruitmachine');

/**
 * Expose `View`.
 */

module.exports = View;

function View(name, options) {
  if (name === 'fruitmachine') {
    name = 'layouts/default';
    this.fruitmachine = true;
  }
  ExpressView.apply(this, arguments);
}

View.prototype.lookup = ExpressView.prototype.lookup;

View.prototype.render = function(options, fn) {
  if (this.fruitmachine) {
    var view = fruitmachine(options);
    options.html = view.toHTML();
    options.json = JSON.stringify(view.toJSON());
    options.resources = options._locals.resources;
    delete options.data;
  }
  this.engine(this.path, options, fn);
};
