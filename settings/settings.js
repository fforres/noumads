var Cookie = {
	secret: "COOKIE SECRET BY: FFORR.ES"
}
var Mongo = {
	Db: 'noumads',
	Server: 'ds053080.mongolab.com',
	Port:53080,
	User:"noumads",
	Pass:"noumads",
	SessionCollection: 'sessions',
	Url: "noumads:noumads@ds053080.mongolab.com:53080/noumads"
}
//mongodb://user:pass@host:port/database/collection
var Site = {
	//siteUrl: 'www.noumads.com',
	siteUrl: 'localhost:3003',
	siteProtocol: 'http://'
}

var socialCallbacks = {
	foursquare: Site.siteProtocol + Site.siteUrl + '/login/foursquare/callback',
	twitter: Site.siteProtocol + Site.siteUrl + '/login/twitter/callback',
	facebook: Site.siteProtocol + Site.siteUrl + '/login/facebook/callback'
}
exports.CookieSecret = Cookie.secret;
exports.Mongo = Mongo;
exports.socialCallbacks = socialCallbacks;
exports.Site = Site;