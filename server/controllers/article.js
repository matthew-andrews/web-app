var Q = require('q');
var fruitmachine = require('fruitmachine');
var model = require('../models/article');
var _render = require('./_default');

module.exports = function(req, res) {
  model.get(parseInt(req.params[0], 10))
    .then(function(data) {
      _render(res, fruitmachine({
          module: 'apple',
          model: data
        }));
  	  });
};
