var fruitmachine = require('fruitmachine');

// HACK Don't allow delegate to be evaluated by node because it will complain HTML element is undefined
if (typeof window !== 'undefined') {
  var helpers = [require('fruitmachine-ftdomdelegate')];
}

module.exports = fruitmachine.define({
  name: 'satsuma',
  helpers: helpers,
  template: function(data) {
    var articles = data.articles;
    var i;
    var l;
    var output = '<h2>Latest News</h2>'
      + '<button id="js-refresh">Refresh the news</button><ul>';

    if (!articles || !articles.length) {
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
    return output + '</ul>';
  },
  setup: function() {
    var self = this;
    this.delegate.on('click', '#js-refresh', function() {
      self.fire('refreshbuttonclick');
    });
  }
});
