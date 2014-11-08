var LocalStrategy = require('passport-local').Strategy;
var FoursquareStrategy = require('passport-foursquare').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var Users = require('./../../model/m_users.js');
var siteConfig = require('./../../settings/settings.js').Site;
var socialCallbacks = require('./../../settings/settings.js').socialCallbacks;
module.exports = function(app, passport, request) {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(usuario, done) {
		if (usuario._id) {
			Users.findUserById(usuario._id, function(err, user) {
				done(err, user);
			})
		} else if (usuario.provider == "foursquare") {
			Users.findUserByFoursquare(usuario, function(err, user) {
				done(err, user);
			})
		} else if (usuario.provider == "twitter") {
			Users.findUserByTwitter(usuario, function(err, user) {
				done(err, user);
			})
		} else if (usuario.provider == "facebook") {
			Users.findUserByFacebook(usuario, function(err, user) {
				done(err, user);
			})
		}else if (usuario.provider == "sharepoint") {
			Users.findUserBySharepoint(usuario, function(err, user) {
				done(err, user);
			})
		}
	})
	//usar local strategy
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			Users.findUserByEmail({
				email: email,
				password: password
			}, function(err, usuario, data) {
				if (err) {
					return done(err);
				}
				if (!usuario) {
					return done(null, false, {
						message: "No tenemos ningun usuario con ese email"
					});
				}
				if (!Users.authenticate(usuario, data.password)) {
					return done(null, false, {
						message: 'invalid login or password'
					});
				}
				return done(null, usuario);
			})
		}
	));
	passport.use(new FoursquareStrategy({
			clientID: "EZ2RQJH522GDQWLXIBSCXSEXHFZYZVIQ153R0VY0Z2YH3KD1",
			clientSecret: "YOWHEHZIGSQHZHSZZV4BA4SN34X5TZWON1LRIWLJWDACXNOQ",
			callbackURL: socialCallbacks.foursquare,
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				return done(null, profile);
			});
		}
	));
	passport.use(new TwitterStrategy({
			consumerKey: "ZCcJthir16ZAYZzlsAqETApqm",
			consumerSecret: "0ZkVXC9Jy85fqzg4yLv2sz7arQouimCPfTcscYTJkdJb4rAdar",
			callbackURL: socialCallbacks.twitter,
			userAuthorizationURL: 'https://api.twitter.com/oauth/authorize'
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				return done(null, profile);
			});
		}
	));
	passport.use(new FacebookStrategy({
			clientID: "759864120742191",
			clientSecret: "753477508418dee91156907fd993d99b",
			callbackURL: socialCallbacks.facebook
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				return done(null, profile);
			});
		}
	));
}