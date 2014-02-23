var express     = require( 'express' ),
    exphbs      = require( 'express3-handlebars' ),
    config      = require( 'config' ),
    passport    = require( 'passport' ),
    mongoose    = require( 'mongoose' ),
    app         = express(),
    RedisStore  = require( 'connect-redis' )(express);

var auth = require( './server/controllers/AuthController' );
auth.initAuth();

app.configure(function() {
    app.use( express.static( __dirname + '/public' ) );
    app.use( express.compress() );
    app.use( express.logger() );
    app.use( express.cookieParser() );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.session({
        secret: config.session.secret,
        cookie: {
            maxAge:86400000
        },
        store: new RedisStore()
    }) );
    app.use( passport.initialize() );
    app.use( passport.session() );
    app.use( app.router );
    app.engine( 'handlebars', exphbs({defaultLayout: 'main'}) );
    app.set( 'view engine', 'handlebars' );

    mongoose.connect( config.DB.path );
});

require('./server/routers')(app);

function start() {
    var port = process.env.PORT || config.server.port;
    app.listen( port );
    console.log( "server pid %s listening on port %s in %s mode",
        process.pid,
        port,
        app.get( 'env' )
    );
}

start();

exports.app = app;