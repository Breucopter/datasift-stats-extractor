'use strict';
var salience 		= require('../lib/extractors/salience');      
var interaction = require('../lib/extractors/interaction');
var stats 			= require('../lib/extractors/stats');  
var language 		= require('../lib/extractors/language');
var links 			= require('../lib/extractors/links');
var twitter 		= require('../lib/extractors/twitter');    
var demographics 		= require('../lib/extractors/demographics');

module.exports = {
 
  process: function (line) {
  	
  	try {
		var jsonObj = JSON.parse(line)
		
		// Extractors
		stats.putStat(jsonObj);		
		
		interaction.putWords(jsonObj);
		interaction.putTimestamps(jsonObj);	
		interaction.putHashTags(jsonObj);
		interaction.putTagSummary(jsonObj);
		interaction.putTagsByTime(jsonObj);
		interaction.putLongLat(jsonObj);
		
		salience.putSentiment(jsonObj);
		salience.putLocations(jsonObj);
		salience.putTopics(jsonObj);
		
		links.putUrlDomains(jsonObj);
		
		language.putLanguage(jsonObj);
		
		twitter.putInfluencer(jsonObj);
		
		demographics.putDemographics(jsonObj);
		
	}
	catch (e) {
  	  	console.log('ERROR: ' + e);
   	}
  	
  }
  
};

