var express = require('express')
	,path = require('path')
	,connect = require('connect')
	,flash = require('connect-flash')
	,favicon = require('static-favicon')
	,logger = require('morgan')
	,bodyParser = require('body-parser')
	,http = require('http')
	,methodOverride = require('method-override')
	// ,cookieSession = require('cookie-session')
	,session    = require('express-session')
	,ejs = require('ejs')
	,create = require('./create')	//加载
	,routes = require('./routes/index');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(flash());
// app.use(cookieSession({secret : 'wuzei'}));
app.use(bodyParser());
app.use(methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use( session({ //提供会话支持
    secret: "wuzei",//这个是session加密需要的，随便写的。
    cookie : {
            maxAge : 60000 * 20 //20 minutes
        }
}));

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	var error = req.flash('error');
	res.locals.error = error.length ? error : null;
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

create.bundle();
app.routes;

module.exports = app;
