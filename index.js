var express     = require( 'express' ),
    rendr       = require( 'rendr' ),
    config      = require( 'config' ),
    passport    = require( 'passport' ),
    FBStrategy  = require( 'passport-facebook' ),
    mongoose    = require( 'mongoose' ),
    Guru        = require( './server/models/guru' ),
    DataAdapter = require( './server/lib/data_adapter' ),
    app         = express();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FBStrategy({
        clientID: 424544477675893,
        clientSecret: '1cdade0a6c1ec2038b04bb5606d4337d',
        callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Guru.findOrCreate(profile, function(err, user) {
                if (err) { return done(err); }
                done(null, user);
            });
        });
    }
));

app.configure(function() {
    app.use( express.compress() );
    app.use( express.logger() );
    app.use( express.cookieParser() );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.session({ secret: 'keyboard cat' }) );
    app.use( passport.initialize() );
    app.use( passport.session() );
    app.use( app.router );
    app.use( express.static( __dirname + '/public' ) );

});

var server = rendr.createServer({
    dataAdapter: new DataAdapter()
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

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/g' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/g/courses');
    }
);

app.use( server );

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

if ( require.main === module ) {
    start();
}

exports.app = app;