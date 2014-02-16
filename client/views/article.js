var fruitmachine = require('fruitmachine');
var template = require('../../templates/partials/apple.html');

module.exports = fruitmachine.define({
  name: 'apple',
  template: template
});
