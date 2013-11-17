var fruitmachine = require('fruitmachine');

module.exports = fruitmachine.define({
  name: 'satsuma',
  template: function(data) {
    var articles = data.articles, i, l, output = '';
    if (!articles.length) {
        return '<p><i>No articles have been found, maybe you haven\'t <b>refreshed the news</b>?</i></p>';
    }
    for (i = 0, l = articles.length; i < l; i = i + 1) {
        output = output
          + '<li>'
          + '<a href="/' + articles[i].id + '">'
          + '<b>' + articles[i].headline + '</b>'
          + '<br />By ' + articles[i].author + ' on ' + articles[i].date + '</a>'
          + '</li>';
    }
    return '<ul>' + output + '</ul>';
  }
});
