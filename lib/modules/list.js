var fruitmachine = require('fruitmachine');
var template = require('../../views/modules/satsuma.html');

// HACK Don't allow delegate to be evaluated by node because it will complain HTML element is undefined
if (typeof window !== 'undefined') {
  var helpers = [require('fruitmachine-ftdomdelegate')];
}

module.exports = fruitmachine.define({
  name: 'satsuma',
  helpers: helpers,
  template: template,
  initialize: function() {

    // TODO: Find a better way to do this
    if (typeof window === 'undefined') return;

    this.on('initialize', function() {
      var self = this;
      this.delegate.on('click', '#js-refresh', function() {
        self.fire('refreshbuttonclick');
      });
    });
  }
});
