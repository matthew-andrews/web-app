var fruitmachine = require('fruitmachine');
var Module = require('../../lib/modules/list');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(function(err, data) {
    var view = new Module({
      model: new fruitmachine.Model({ articles: data })
    });
    document.getElementById('js-body').innerHTML = view.toHTML();
  });
};
