var fruitmachine = require('fruitmachine');
var template = require('../../templates/partials/satsuma.html');
var helpers = [require('fruitmachine-ftdomdelegate')];

module.exports = fruitmachine.define({
  name: 'satsuma',
  helpers: helpers,
  template: template,
  initialize: function() {
    this.on('initialize', function() {
      this.delegate.on('click', '#js-refresh', function() {
        this.fire('refreshbuttonclick');
      }.bind(this));
    });
  }
});
