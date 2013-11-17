var hoganjs = require('hogan.js');
var fruitmachine = module.exports = require('fruitmachine');

// Register fruit for server
var apple = hoganjs.compile(require('fs').readFileSync(__dirname + '/../views/modules/apple.html', { encoding: 'utf8' }));
var satsuma = hoganjs.compile(require('fs').readFileSync(__dirname + '/../views/modules/satsuma.html', { encoding: 'utf8' }));

fruitmachine.define({
  name: 'apple',
  template: apple.render.bind(apple)
});
fruitmachine.define({
  name: 'satsuma',
  template: satsuma.render.bind(satsuma)
});
