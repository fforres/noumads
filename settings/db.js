var mongojs = require("mongojs");
var dbConfig = require("./settings");
console.log(dbConfig.Mongo.Url)
var db = mongojs(dbConfig.Mongo.Url);
var rolesArr = [{
	"nombre": "PublicUser"
}, {
	"nombre": "Admin"
}];
exports.CreateRoles = function() {
	var roles = db.collection('roles');
	for (var i in rolesArr) {
		var rol = rolesArr[i];
		console.log(rol);
		roles.update({
				nombre: rol.nombre
			}, {
				$set: {
					nombre: rol.nombre
				}
			}, {
				upsert: true
			},
			function(err, docs, lastErrorObject) {
				if (!err) {
					if (docs.updatedExisting) {
						console.log("updateados Roles");
					} else {
						console.log("creados Roles");
					}
				} else {
					console.log(err);
					console.log("error Roles");
				}
			}
		);

	}
};