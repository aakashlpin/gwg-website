var config      = require( 'config' ),
    passport    = require( 'passport' ),
    FBStrategy  = require( 'passport-facebook'),
    models      = require( '../models')
    ;


module.exports = {
    initAuth: function() {
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
                    var Guru = models.Guru;
                    Guru.findOrCreate(profile, function(err, user) {
                        if (err) { return done(err); }
                        done(null, user);
                    });
                });
            }
        ));
    },
    //single line middleware(s)
    //declaring here to have single point of reference to passport
    passportAuthMiddleWare: passport.authenticate('facebook', { scope: ['email'] }),
    passportAuthCallbackMiddleWare: passport.authenticate('facebook', { failureRedirect: '/g' }),

    authCallbackMiddleWare: function(req, res) {
        if (req.user.exists) {
            res.redirect('/g/schedule');
        } else {
            res.redirect('/g/profile');
        }
    }
};