module.exports = function(model) {
  return function(req, res) {
    model.get(function(err, data) {
      res.json(data);
    });
  };
};
