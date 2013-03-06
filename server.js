var restify = require('restify');

exports.server = server = restify.createServer();

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true })); 


/**
 * Global npm modules
 */
exports.scraper = scraper = require('scraper');
exports.request = request = require('request');
exports.fs = fs = require('fs');
exports.$ = $ = require('jquery');
exports.moment = moment = require('moment');
exports.file = fileModule = require('file');

/**
 * Global helpers
 */
exports.h = h = require('./lib/helpers.js');
exports.e = e = require('./lib/errors.js');


/**
 * Endpoints setup
 */

//Load all endpoints in the endpoints folder
//walk is blocking on purpose because the server can't listen yet
fileModule.walk('./endpoints', function(a, dirPath, dirs, files){
	if(files){
		files.forEach(function(file,key){
			var fileName = file.replace('/index.js','')
								.replace('.js','')
								.replace('endpoints/','')
								.replace('/','.'),
 				requiredData = require('./'+file);
 			h.startEndpointListener(fileName,requiredData);
		})
	}
	
});

/**
 * Phone endpoint
 * Depricated
 */
//server.post({path: '/phone', version: '1.0.0'}, phone.search);
//server.post({path: '/phone', version: '2.0.0'}, phone.search2); //v2
server.post({path: '/phone', version: '1.0.0'}, function(req, res, next){
	res.json(410,{error:"This api endpoint has been closed and it will not be available again."});
	return next();
});
server.post({path: '/phone', version: '2.0.0'}, function(req, res, next){
	res.json(410,{error:"This api endpoint has been closed and it will not be available again."});
	return next();
});

/**
 * Help out endpoint
 */
server.post({path: '/help_out', version: '1.0.0'}, function(req, res, next){
	res.json(200,{message:'Send us mail: apis@apis.is ,thanks for your interest!'});
});

/**
 * Start the server
 */
server.listen(3100);