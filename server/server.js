var express     = require( 'express' ),
    http        = require( 'http' ),
    util        = require( 'util' ),
    path        = require( 'path'),
    hbs         = require('hbs').create(),
    mw          = require( './middleware' ),
    config      = require( 'config' ),
    rendrMw     = require( 'rendr/server/middleware' ),
    mongoose    = require( 'mongoose' ),
    rendrServer = require( 'rendr' ).Server,
    DataAdapter = require( './lib/data_adapter' ),
    viewEngine  = require( 'rendr/server/viewEngine' );

var app = express();

//Initialize our server

exports.init = function init(options, callback) {
    initMiddleware();
    initDB();
    initLibs( function ( err, result ) {
        if ( err ) return callback( err );
        buildRoutes ( app );
        callback ( null, result );
    });
};

function initMiddleware () {
    app.configure(function() {
        //set up views
        app.set('views', __dirname + '/../app/views');
        app.set('view engine', 'hbs');
        app.set('view options', {
            layout: 'layout'
        });
        app.engine('hbs', hbs.__express);

        //set up middleware stack
        app.use( express.compress() );
        app.use( express.static( __dirname + '/../public' ) );
        app.use( express.logger() );
        app.use( express.bodyParser() );
        app.use( app.router );
        app.use( mw.errorHandler() );

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

    })
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

//Initialize the libraries
function initLibs ( callback ) {
    var options = {
        dataAdapter: new DataAdapter(),
        errorHandler: mw.errorHandler()
    };

    rendrServer.init( options, callback );
}

//Routes and middleware

//Attach our routes to our server

function buildRoutes ( app ) {
    buildApiRoutes ( app );
    buildRendrRoutes ( app );
}

var preRendrMiddleware = [
    //initialize the rendrApp with any config vars as per the doc
    rendrMw.initApp(config.rendrApp)
];

function buildApiRoutes ( app ) {
    var fnChain, api, goNext;
    api = 'api';
    goNext = function (req, res, next) {
        next();
    };

    app.post(api    + '/users'      , goNext);
    app.put (api    + '/users/:id'  , goNext);
    app.get (api    + '/users/:id'  , goNext);
    app.post(api    + '/courses'    , goNext);

    fnChain = preRendrMiddleware.concat(rendrMw.apiProxy());
    fnChain.forEach( function( fn ) {
        //created a sequence of middleware /api path will go through
        //first to initApp so that req.renderApp will be populated.
        //then to apiProxy which will proxy to appropraite dataAdapter
        app.use( '/api', fn );
    });
}

function buildRendrRoutes ( app ) {
    var routes, path, definition, fnChain;
    routes = rendrServer.router.buildRoutes();
    routes.forEach( function( args ) {
        path = args.shift();
        definition = args.shift();

        //Additional arguments are more handlers
        fnChain = preRendrMiddleware.concat( args );

        //add error handler at the end
        fnChain.concat(mw.errorHandler());

        app.get(path, fnChain);
    });
}

/**
 * Start the Express server.
 */
exports.start = function start() {
    var port = process.env.PORT || config.server.port;
    app.listen( port );
    console.log( "server pid %s listening on port %s in %s mode",
        process.pid,
        port,
        app.get( 'env' )
    );
};


