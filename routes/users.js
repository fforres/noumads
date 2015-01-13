var express = require('express'),
	router = express.Router(),
	expressValidator = require('express-validator'),
	_ = require('underscore'),
	users = require('./../model/m_users.js'),
	restaurantes = require('./../model/m_restaurantes.js'),
	passport = require('passport'),
	routeLogin = require('./login');
noumadsApp = require('./app/main');
// route middleware that will happen on every request

router.get('*',function(req,res){
    console.log("asdasd")
	res.render('landing',{
		title: 'Noumads'
	})
})
router.get('/', function(req, res) {
	var a = users.currentUserRole.isAdmin(req);
	if (req.query && req.query["srch-term"]) {
		restaurantes.RestauranteSearch(req.query["srch-term"], req, res);
	} else {
		res.render('index', {
			title: 'Noumads'
		});
	}
});
router.use('/login', routeLogin);
router.use('/app', noumadsApp);
router.route('/register')
	.get(function(req, res) {
		users.ShowCreateUser(req, res);
	})
	.post(function(req, res) {
		users.CreateUser(req, res);
	});
router.route('/profile')
	.get(function(req, res) {
		users.ShowEditUser(req, res);
	})
	.post(function(req, res) {
		users.EditUser(req, res);
	});
router.route('/logout')
	.get(function(req, res) {
		req.logOut();
		res.redirect("/");
	});
router.route("/restaurant/:MongoId")
	.get(function(req, res) {
		console.log("asd");
		restaurantes.ShowPerfilRestaurante(req, res);
	});
module.exports = router;