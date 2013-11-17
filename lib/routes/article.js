var fruitmachine = require('fruitmachine');
var Module = require('../modules/article');

module.exports = function(model) {
  return function(req, res) {
    model.get(parseInt(req.params[0], 10), function(err, data) {
      var view = new Module({
        model: new fruitmachine.Model(data)
      });
      if (typeof document === 'undefined') {
        res.render('layout', { yield: view.toHTML() });
      } else {
        document.getElementById('js-body').innerHTML = view.toHTML();
      }
    });
  };
};
