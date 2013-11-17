var superagent = require('superagent');
var FeedParser = require('feedparser');

exports.get = function(id, cb) {
  if (!cb) {
    cb = id;
    id = undefined;
  }

  superagent.get('/api/articles.json', function(res) {
    if (id) {
      if (id && res.body[id]) cb(null, res.body[id]);
      else cb(new Error("Article not found"));
    } else {
      cb(null, res.body);
    }
  });
};
