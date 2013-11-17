var fruitmachine = require('fruitmachine');
var Module = require('../modules/list');

module.exports = function(model) {
  return function(req, res) {
    model.get(function(err, data) {
      var view = new Module({
        model: new fruitmachine.Model({ articles: data })
      });
      if (typeof document === 'undefined') {
        res.render('layout', { yield: view.toHTML() });
      } else {
        document.getElementById('js-body').innerHTML = view.toHTML();
      }
    });
  };
};
