module.exports = function(req, res) {
  res.set('Content-Type', 'text/cache-manifest');
  res.render('layouts/manifest', {});
};
