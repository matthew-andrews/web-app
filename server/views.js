var hoganjs = require('hogan.js');
var fruitmachine = module.exports = require('fruitmachine');
var readFileSync = require('fs').readFileSync;

function register(name) {
  var template = hoganjs.compile(readFileSync(__dirname + '/../views/modules/' + name + '.html', { encoding: 'utf8' }));
  fruitmachine.define({
    name: name,
    template: template.render.bind(template)
  });
}

['apple', 'satsuma'].forEach(register);
