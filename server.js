var express = require('express');
var hoganjs = require('hogan.js');
var fruitmachine = require('fruitmachine');

var index = require('./server/routes');
var article = require('./server/routes/article');
var articleJson = require('./server/routes/article-json');

// Register fruit for server
var apple = hoganjs.compile(require('fs').readFileSync(__dirname + '/views/modules/apple.html', { encoding: 'utf8' }));
var satsuma = hoganjs.compile(require('fs').readFileSync(__dirname + '/views/modules/satsuma.html', { encoding: 'utf8' }));

fruitmachine.define({
  name: 'apple',
  template: apple.render.bind(apple)
});
fruitmachine.define({
  name: 'satsuma',
  template: satsuma.render.bind(satsuma)
});

var app = express();
app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// Shared endpoints
app.get('/', index);
app.get(/^\/([0-9]+)\/?$/, article);

// API only endpoints
app.get('/api/articles.json', articleJson);

app.use(express.static('public'));

app.listen(3000);
