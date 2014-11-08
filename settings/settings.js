var Cookie = {
	secret: "COOKIE SECRET BY: FFORR.ES"
}
var Mongo = {
	Db: 'noumads',
	Server: 'localhost',
	SessionCollection: 'sessions'
}
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