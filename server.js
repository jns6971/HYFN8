var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express();

var PORT = 3000;

app.set('port', (process.env.PORT || PORT));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
