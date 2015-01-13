var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var users = require('./../model/m_users.js');
var passport = require('passport');

// route middleware that will happen on every request

	
router.route('/sendmail')
    .post(function(req, res) {
		var nodemailer = require('nodemailer');
        var mongojs = require("mongojs");
        var db = mongojs("mongodb://noumads:noumads@ds053080.mongolab.com:53080/noumads");
        var emails = db.collection('emails');
        emails.update({
    			email: req.body.email
    		}, {
    			$set: req.body
    		}, {
    			upsert: true
    		},
    		function(err, docs, lastErrorObject) {
    			if (!err) {
    				if (docs.updatedExisting) {
    					console.log("Los datos fueron actualizados sin problemas.");
    				} else {
    					console.log("Los datos fueron guardados sin problemas.");
    				}
    				res.send(true);
    
    				var transporter = nodemailer.createTransport({
    					service: 'Gmail',
    					auth: {
    						user: 'felipe.torressepulveda@gmail.com',
    						pass: 'GMAIL 1RONLIMON'
    					}
    				});
    
    				var mailOptions = {
    					from: '<' + req.body.email + '>', // sender address
    					to: 'DCORTEZ@noumads.com, felipe.torressepulveda@gmail.com', // list of receivers
    					subject: 'Contacto Noumads', // Subject line
    					html: '<h3>Contáctame</h3> <a href="mailto:' + req.body.email + '">' + req.body.email + '</a>' // html body
    				};
    				transporter.sendMail(mailOptions, function(error, info) {
    					if (error) {
    						console.log(error);
    					} else {
    						console.log('Message sent: ' + info.response);
    					}
    				});
    			} else {
    			    console.log(err);
    				console.log("Tuvimos problemas guardando tus datos. Por favor intenta nuevamente.");
    				res.send(false);
    			}
    		}
    	);
		
		
	});
	
	


router.get('*',function(req,res){
	res.render('landing',{
		title: 'Noumads'
	})
})

module.exports = router;