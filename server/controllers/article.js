var fruitmachine = require('fruitmachine');
var model = require('../models/article');

module.exports = function(req, res) {
  model.get(parseInt(req.params[0], 10), function(err, data) {
    var view = fruitmachine({
      module: 'apple',
      model: data
    });
    res.render('layouts/default', { html: view.toHTML(), json: JSON.stringify(view.toJSON()) });
  });
};
