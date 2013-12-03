var fs = require('fs')
	, byline = require('byline')
	, extract = require('./lib/extract')
	, dataexport = require('./lib/dataexport')
	, filehandler = require('./lib/util/filehandler.js')
	, file = filehandler.getSourceFile()
	, counter = 0
	;

var stream = fs.createReadStream(file);
		stream = byline.createStream(stream);

// Data Objects
global.timestamps 	= {};
global.salience 		= {};
global.stats				= {};
global.links				= {};
global.hashtags			= {};
global.influencers	= {};
global.infMentions	= [];
global.infReplies		= [];
global.tags					= {};
global.geo					= [];
global.demographics	= {};
global.language			= {};
global.interaction	= {};
global.twitter			= {};
global.bitly 				= {};
global.facebookpage = {};


console.log('');
console.log('Extracting data from: ' + file);
console.log('');

stream.on('data', function(line) {
  process.stdout.write("Extracting interactions: " + ++counter + " \r");  
  extract.process(line);  
});

stream.on('end', function() {
  console.log("\nBuilding result sets...");
  dataexport.dumpFiles();
});

