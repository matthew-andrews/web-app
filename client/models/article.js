var superagent = require('superagent');

exports.get = function(id, cb) {
  if (!cb) {
    cb = id;
    id = undefined;
  }

  if (id) {
    superagent.get('/api/article/' + id + '.json', function(res) {
      cb(null, res.body);
    });
  } else {
    superagent.get('/api/articles.json', function(res) {
      cb(null, res.body);
    });
  }
};
