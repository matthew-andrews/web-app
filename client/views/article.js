var fruitmachine = require('fruitmachine');
var template = require('../../views/partials/apple.html');

module.exports = fruitmachine.define({
  name: 'apple',
  template: template
});
