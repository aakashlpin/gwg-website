var express     = require( 'express' ),
    exphbs      = require( 'express3-handlebars' ),
    namespace   = require( 'express-namespace'),
    config      = require( 'config' ),
    passport    = require( 'passport' ),
    FBStrategy  = require( 'passport-facebook' ),
    mongoose    = require( 'mongoose' ),
    Guru        = require( './server/models/guru' ),
    models      = require( './server/models'),
    mw          = require( './server/middleware' ),
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
    app.engine( 'handlebars', exphbs({defaultLayout: 'main'}) );
    app.set( 'view engine', 'handlebars' );
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/g', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/g/schedule');

    } else {
        res.render('guru_home');
    }
});

app.namespace('/g', function() {
    app.get('/schedule', ensureAuthenticated, function(req, res) {
        res.render('guru_schedule', {schedule: req.user.schedule});
    });

    app.get('/courses', ensureAuthenticated, function(req, res) {
        res.render('guru_courses');
    });
});

app.namespace('/auth', function() {
    app.get('/facebook', passport.authenticate('facebook'));

    app.get('/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/g' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/g/schedule');
        }
    );
});

app.namespace('/api', function() {
    app.get('/user', function(req, res) {
        res.json(req.user);
    });

    app.post('/signup', function(req, res) {
        var SignupModel = models.Signup;
        SignupModel.post(req, function(err, data) {
            res.json(data);
        });
    });
});

function start() {
    var port = process.env.PORT || config.server.port;
    app.listen( port );
    console.log( "server pid %s listening on port %s in %s mode",
        process.pid,
        port,
        app.get( 'env' )
    );
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();

    } else {
        res.redirect('/g');
    }
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

initDB();
start();

exports.app = app;