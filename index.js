var express     = require( 'express' ),
    exphbs      = require( 'express3-handlebars' ),
    namespace   = require( 'express-namespace'),
    config      = require( 'config' ),
    passport    = require( 'passport' ),
    FBStrategy  = require( 'passport-facebook' ),
    mongoose    = require( 'mongoose' ),
    Guru        = require( './server/models/guru' ),
    models      = require( './server/models'),
    app         = express(),
    redis       = require( 'redis' ),
    RedisStore  = require( 'connect-redis' )(express);

redisDB = redis.createClient(config.redis.port, config.redis.host);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FBStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.host + "/auth/facebook/callback"
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

app.get('/about', function(req, res) {
    res.render('about');
});

app.namespace('/g', function() {
    app.get('/schedule', ensureAuthenticated, function(req, res) {
        res.render('guru_schedule', {user: req.user});
    });

    app.get('/courses', ensureAuthenticated, function(req, res) {
        res.render('guru_courses', {user: req.user});
    });

    app.get('/bank', ensureAuthenticated, function(req, res) {
        res.render('guru_bank', {user: req.user});
    });

    app.get('/profile', ensureAuthenticated, function(req, res) {
        res.render('guru_profile', {user: req.user});
    });

});

app.namespace('/auth', function() {
    app.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/g' }),
        function(req, res) {
            // Successful authentication, redirect home.
            if (req.user.exists) {
                res.redirect('/g/schedule');
            } else {
                res.redirect('/g/profile');
            }
        }
    );
});

app.namespace('/api', function() {
    app.get('/user', ensureAuthenticated, function(req, res) {
        res.json(req.user);
    });

    app.post('/signup', function(req, res) {
        var SignupModel = models.Signup;
        SignupModel.post(req, function(err, data) {
            res.json(data);
        });
    });

    app.post('/guru/course', ensureAuthenticated, function(req, res) {
        var CourseModel = models.Course;
        CourseModel.post(req, function(err, data) {
            res.json(data);
        });
    });

    app.get('/guru/courses', ensureAuthenticated, function(req, res) {
        var CourseModel = models.Course;
        CourseModel.getByCreator(req, function(err, data) {
            res.json(data);
        });
    });

    app.post('/guru/bank', ensureAuthenticated, function(req, res) {
        var BankModel = models.Bank;
        BankModel.post(req, function(err, data) {
            res.json(data);
        });
    });

    app.get('/guru/bank', ensureAuthenticated, function(req, res) {
        var BankModel = models.Bank;
        BankModel.getByCreator(req, function(err, data) {
            res.json(data);
        });
    });

    app.get('/guru/schedule', ensureAuthenticated, function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['schedule'], function(err, data) {
            res.json(data);
        })
    });

    app.post('/guru/schedule', ensureAuthenticated, function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['schedule'], function(err, data) {
            res.json(data);
        });
    });

    app.post('/guru/profile', ensureAuthenticated, function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['extras'], function(err, data) {
            res.json(data);
        });
    });

    app.get('/guru/profile', ensureAuthenticated, function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['extras'], function(err, data) {
            res.json(data);
        });
    });
});

app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/g');

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