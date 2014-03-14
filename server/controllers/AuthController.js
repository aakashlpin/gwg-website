var config              = require( 'config' ),
    passport            = require( 'passport' ),
    FBStrategy          = require( 'passport-facebook' ),
    GoogleStrategy      = require( 'passport-google-oauth' ).OAuth2Strategy,
    models              = require( '../models'),
    APIUserController   = require( './APIUserController' )
    ;


module.exports = {
    initAuth: function() {
        passport.serializeUser(function(user, done) {
            if (user) {
                done(null, {u: user._id.toString()})
            } else {
                done(null, {u: "0"});
            }
        });

        passport.deserializeUser(function(obj, done) {
            var id = obj.u,
                getRequest = {user: {_id: id}};

            //attempt to de-serialize by guru and then by user
            models.Guru.get(getRequest, [], function(err, guru) {
                if (err || guru) return done(err, guru);

                return models.User.get(getRequest, [], function(err, user) {
                    return done(err, user);
                });
            });
        });

        passport.use(new FBStrategy({
                clientID: config.facebook.clientID,
                clientSecret: config.facebook.clientSecret,
                callbackURL: config.facebook.host + "/auth/facebook/callback"
            }, commonStrategyHandler
        ));

        passport.use('guruGoogle', new GoogleStrategy({
                clientID: config.google.clientID,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.host + "/auth/google/callback"
            }, commonStrategyHandler
        ));

        function commonStrategyHandler(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                var Guru = models.Guru;
                Guru.findOrCreate(accessToken, refreshToken, profile, function(err, user) {
                    if (err) { return done(err); }
                    done(null, user);
                });
            });
        }

        passport.use('userGoogle', new GoogleStrategy({
                clientID: config.google.clientID,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.host + "/auth/user/google/callback"
            }, userStrategyHandler
        ));

        function userStrategyHandler (accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                var User = models.User;
                User.findOrCreate(accessToken, refreshToken, profile, function(err, user) {
                    if (err) return done(err);
                    done(null, user);
                });
            });
        }
    },
    //single line middleware(s)
    //declaring here to have single point of reference to passport

    // passport facebook
    passportFBAuthMiddleWare: passport.authenticate('facebook', { scope: ['email'] }),
    passportFBAuthCallbackMiddleWare: passport.authenticate('facebook', { failureRedirect: '/g' }),

    // passport google for gurus
    passportGoogleAuthMiddleWare: passport.authenticate('guruGoogle', {
        scope: 'https://www.googleapis.com/auth/userinfo.email ' +
            'https://www.googleapis.com/auth/userinfo.profile ' +
            'https://www.googleapis.com/auth/youtube.readonly'
    }),
    passportGoogleAuthCallbackMiddleWare: passport.authenticate('guruGoogle', { failureRedirect: '/g' }),

    authCallbackMiddleWare: function(req, res) {
        if (req.user.exists) {
            res.redirect('/g/schedule');
        } else {
            res.redirect('/g/profile');
        }
    },

    // passport google for users
    passportUserGoogleAuthMiddleWare: passport.authenticate('userGoogle', {
        scope: 'https://www.googleapis.com/auth/userinfo.email ' +
            'https://www.googleapis.com/auth/userinfo.profile '
    }),
    passportUserGoogleAuthCallbackMiddleWare: passport.authenticate('userGoogle', { failureRedirect: '/door' }),

    authUserCallbackMiddleWare: function(req, res) {
        if (req.session.reserved) {
            //sign up was done after the user selected some schedule
            //use this data and clear off the session var
            var reserved = req.session.reserved;
            delete req.session.reserved;

            APIUserController.saveReservationData(req.user, reserved, function(err, saved) {
                if (err) {
                    reserved.url += '?err=' + err;

                } else {
                    reserved.url += '?courseId=' + reserved.courseId;
                }

                //redirect back to the url that was requested before auth
                res.redirect(reserved.url);
            });
        }
    }
};