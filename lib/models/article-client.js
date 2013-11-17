var superagent = require('superagent');
var FeedParser = require('feedparser');

exports.get = function(id, cb) {
  var data = [];
  var count = 0;

  if (!cb) {
    cb = id;
    id = undefined;
  }

  superagent.get('/api/articles.json', function(res) {
    if (id) {
      if (id && data[id]) cb(null, data[id]);
      else cb(new Error("Article not found"));
    } else {
      cb(null, res.body);
    }
  });
};
