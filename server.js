const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

require('babel-register');
require('babel-polyfill');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(app.get('port'), () =>
  console.log('Listening on port ', app.get('port'))
);

exports = module.exports = app;
