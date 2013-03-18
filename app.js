var fs = require('fs')
	, byline = require('byline')
	, extract = require('./lib/extract')
	, dataexport = require('./lib/dataexport')
	, publish = require('./lib/publish')
	, filehandler = require('./lib/util/filehandler.js')
	, file = filehandler.getSourceFile()
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
global.tags				= {};
global.geo				= [];
global.demographics		= {};
global.config			= filehandler.loadConfig();
global.words			= {};

console.log('Extracting data from ' + file);

stream.on('data', function(line) {
  extract.process(line);  
});

stream.on('end', function() {
  console.log('Building result sets...');
  dataexport.dumpFiles();
  console.log('Exporting webapp...'); 
  publish.render();
});