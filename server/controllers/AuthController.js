var config          = require( 'config' ),
    passport        = require( 'passport' ),
    FBStrategy      = require( 'passport-facebook' ),
    GoogleStrategy  = require( 'passport-google-oauth' ).OAuth2Strategy,
    models          = require( '../models' )
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

            models.Guru.get(getRequest, [], function(err, user) {
                done(err, user);
            });
        });

        passport.use(new FBStrategy({
                clientID: config.facebook.clientID,
                clientSecret: config.facebook.clientSecret,
                callbackURL: config.facebook.host + "/auth/facebook/callback"
            }, commonStrategyHandler
        ));

        passport.use(new GoogleStrategy({
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
    },
    //single line middleware(s)
    //declaring here to have single point of reference to passport

    // passport facebook
    passportFBAuthMiddleWare: passport.authenticate('facebook', { scope: ['email'] }),
    passportFBAuthCallbackMiddleWare: passport.authenticate('facebook', { failureRedirect: '/g' }),

    // passport google
    passportGoogleAuthMiddleWare: passport.authenticate('google', {
        scope: 'https://www.googleapis.com/auth/userinfo.email ' +
            'https://www.googleapis.com/auth/userinfo.profile ' +
            'https://www.googleapis.com/auth/youtube.readonly'
//        , accessType: 'offline'
    }),    //sending this option gives back a refresh token
    passportGoogleAuthCallbackMiddleWare: passport.authenticate('google', { failureRedirect: '/g' }),

    authCallbackMiddleWare: function(req, res) {
        if (req.user.exists) {
            res.redirect('/g/schedule');
        } else {
            res.redirect('/g/profile');
        }
    }
};