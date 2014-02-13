var express = require( 'express' ),
    rendr = require( 'rendr' ),
    config = require( 'config' ),
    passport = require( 'passport' ),
    mongoose = require( 'mongoose'),
    DataAdapter = require( './server/lib/data_adapter'),
    app = express();

/**
 * Initialize Express middleware stack.
 */
app.use( express.compress() );
app.use( express.static( __dirname + '/public' ) );
app.use( express.logger() );
app.use( express.bodyParser() );

/**
 * The `cookieParser` middleware is required for sessions.
 */
app.use(express.cookieParser());

/**
 * Add session support. This will populate `req.session`.
 */
app.use(express.session({
    secret: config.session.secret,

    /**
     * In production apps, you should probably use something like Redis or Memcached
     * to store sessions. Look at the `connect-redis` or `connect-memcached` modules.
     */
    store: null
}));

//app.use(passport.initialize());
//app.use(passport.session());


//var dataAdapterConfig = config.api;

/**
 * Initialize our Rendr server.
 */
var server = rendr.createServer( {
    dataAdapter: new DataAdapter()
} );

server.configure(function (rendrExpressApp) {
//    rendrExpressApp.use(passport.initialize());
//    rendrExpressApp.use(passport.session());

});

app.use( '/api/-/days', function ( req, res ) {
    var daysCollection = [ {
        dayCode: 'mon',
        dayName: 'Monday'
    }, {
        dayCode: 'tue',
        dayName: 'Tuesday'
    }, {
        dayCode: 'wed',
        dayName: 'Wednesday'
    }, {
        dayCode: 'thu',
        dayName: 'Thursday'
    }, {
        dayCode: 'fri',
        dayName: 'Friday'
    }, {
        dayCode: 'sat',
        dayName: 'Saturday'
    }, {
        dayCode: 'sun',
        dayName: 'Sunday'
    } ];

    res.json( daysCollection );

} );

app.use( server );

/**
 * Start the Express server.
 */

initDB();

function start() {
    var port = process.env.PORT || config.server.port;
    app.listen( port );
    console.log( "server pid %s listening on port %s in %s mode",
        process.pid,
        port,
        app.get( 'env' )
    );
}

//Initialize the DB connection
function initDB () {
    var DB = config.DB;
    if ( DB.USER && DB.PASSWORD ) {
        mongoose.connect( 'mongodb://' + DB.USER + ':' + DB.PASSWORD + '@localhost/' + DB.NAME );
    } else {
        mongoose.connect( 'mongodb://localhost/' + DB.NAME );
    }
}

/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if ( require.main === module ) {
    start();
}

exports.app = app;