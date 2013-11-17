var superagent = require('superagent');
var FeedParser = require('feedparser');

function streamArticles() {
  var rssStream = superagent.get('http://feeds2.feedburner.com/ft/tech-blog');
  return rssStream.pipe(new FeedParser());
}

exports.get = function(id, cb) {
  var data = [];
  var count = 0;

  if (!cb) {
    cb = id;
    id = undefined;
  }

  streamArticles()
    .on('readable', function() {
      var stream = this, item;
      while ((item = stream.read())) {
        var story = {
          id: ++count,
          headline: item.title,
          author: item['dc:creator']['#'],
          date: item.pubDate,
          body: item.description
        };
        if (id && id === count) {
          cb(null, story);
        } else if (!id) {
          data.push(story);
        }
      }
    })
    .on('end', function() {
      if (id > count) {
        cb(new Error("Article not found"));
      } else if (!id) {
        cb(null, data);
      }
    });
};
