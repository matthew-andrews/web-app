var fruitmachine = require('fruitmachine');

// Define a module
module.exports = fruitmachine.define({
  name: 'apple',
  template: function(data) {
    return '<a href="/">Go back home</a>'
      + '<h2>' + data.headline + '</h2>'
      + '<h3>By ' + data.author + ' on ' + data.date + '</h3>'
      + data.body;
  }
});
