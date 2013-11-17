var express = require('express');
var app = express();

app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

app.get('/', require('./lib/routes'));
app.get(/^\/([0-9]+)\/?$/, require('./lib/routes/article'));

app.use(express.static('public'));

app.listen(3000);
