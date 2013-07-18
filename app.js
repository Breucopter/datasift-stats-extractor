var fs = require('fs')
	, byline = require('byline')
	, extract = require('./lib/extract')
	, dataexport = require('./lib/dataexport')
	, publish = require('./lib/publish')
	, filehandler = require('./lib/util/filehandler.js')
	, file = filehandler.getSourceFile()
	, counter = 0
	;

var stream = fs.createReadStream(file);
	stream = byline.createStream(stream);

// Data Objects
global.timestamps 		= {};
global.salience 		= {};
global.stats			= {};
global.links			= {};
global.hashtags			= {};
global.influencers		= {};
global.infMentions		= [];
global.infReplies		= [];
global.tags				= {};
global.geo				= [];
global.demographics		= {};
global.config			= filehandler.loadConfig();
global.language			= {};
global.interaction		= {};
global.twitter			= {};


console.log('Extracting data from ' + file);

stream.on('data', function(line) {
  process.stdout.write("Extracting interactions: " + ++counter + " \r");  
  extract.process(line);  
});

stream.on('end', function() {
  console.log("\nBuilding result sets...");
  dataexport.dumpFiles();
  console.log('Exporting webapp...'); 
  publish.render();
});

