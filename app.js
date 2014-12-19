var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var composer = require('./lib/composer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Test composer');
});

/* GET get composer. */
app.get('/get', function(req, res) {
   composer.get(function(stdout) {
    //JSON.stringify(stdout)
      res.render('index', { title: 'Teste', composer: stdout });
  });
});

app.get('/version', function(req, res) {
    composer.version(function(stdout) {
    //JSON.stringify(stdout)
      console.log(stdout);
      res.render('index', { title: 'Teste', composer: stdout });
    });
});

app.get('/version-json', function(req, res) {
    composer.version_json(function(stdout) {
    //JSON.stringify(stdout)
      var json = { version: stdout};
      res.json(json);
    });
});

app.get('/self-update', function(req, res) {
    composer.self_update(function(stdout) {
    //JSON.stringify(stdout)
      res.render('index', { title: 'Teste', composer: stdout });
    });
});

//app.use('/users', users);
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000, '127.0.0.1', function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now() ), '127.0.0.1', 3000);
});