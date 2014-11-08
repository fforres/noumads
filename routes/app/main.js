var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var _ = require('underscore');
var users = require('./../../model/m_users.js');
var restaurantes = require('./../../model/m_restaurantes.js');
var passport = require('passport');
var roleHelper = require('./../../helpers/roleHelper');
// route middleware that will happen on every request
router.use(function(req, res, next) {
	if (roleHelper.isLoggedIn(req)) {
		console.log("SI ESTAS LOGUEADO!")
		res.redirect("/");
		if (req.method == "POST") {
			req.assert("nombre", "required")
				.notEmpty();
			req.assert("apellido", "required")
				.notEmpty();
			req.assert("email", "required")
				.notEmpty();
			req.assert("password", "required")
				.notEmpty()
				.equals(req.body.password, req.body.password2);
			req.assert("password2", "required")
				.notEmpty();
			req.sanitize("nombre")
				.trim();
			req.sanitize("apellido")
				.trim();
			req.sanitize("email")
				.trim();
			req.sanitize("password")
				.trim();
			req.sanitize("password2")
				.trim();
		}
		for (var i in req.validationErrors(true)) {
			if (typeof(req.validationErrors(true)[i].value) != "undefined") {
				req.flash('form', {
					field: req.validationErrors(true)[i]
				});
			}
		}
		next();
	}else{
		console.log("NO ESTAS LOGUEADO :(  Redirigiendo")
		res.redirect("login");
	}
});

router.route('/')
	.get(function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/');
		} else {
			res.render('users/users_login', {
			title: 'Noumads'
			});
		}
	})
	.post(passport.authenticate('local', {
		failureRedirect: '/'
	}), function(req, res) {
		users.session(req, res);
	});
module.exports = router;