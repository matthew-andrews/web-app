var express = require('express');
var app = express();

app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

app.get('/', require('./libs/routes'));
app.get(/^\/([0-9]+)\/?$/, require('./libs/routes/article'));

app.use(express.static('public'));

app.listen(3000);
