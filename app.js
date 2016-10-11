// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var player_route  = require('./controller/player');
var tournament_route  = require('./controller/tournament');
var boss_route  = require('./controller/boss');

// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Lab 18');

//configure routes
app.use('/', routes);
app.use('/player', player_route);
app.use('/tournament', tournament_route);
app.use('/boss',boss_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 3000);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));