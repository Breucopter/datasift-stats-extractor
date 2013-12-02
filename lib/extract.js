'use strict';
var salience 			= require('../lib/extractors/salience');      
var interaction 	= require('../lib/extractors/interaction');
var stats 				= require('../lib/extractors/stats');  
var language 			= require('../lib/extractors/language');
var links 				= require('../lib/extractors/links');
var twitter 			= require('../lib/extractors/twitter');    
var demographics 	= require('../lib/extractors/demographics');
var bitly 				= require('../lib/extractors/bitly');
var facebookpage	= require('../lib/extractors/facebookpage');


module.exports = {
 
  process: function (line) {
  	
 	try {
		var jsonObj = JSON.parse(line)
		
		// TODO - remove when DS updated 
		// hack to use correct FB Date-time stamp until fixed in DS platform
		if(jsonObj.interaction !== undefined && jsonObj.interaction.created_at !== undefined && jsonObj.facebook_page && jsonObj.facebook_page.post && jsonObj.facebook_page.post.created_time){
			// reset the TS
			jsonObj.interaction.created_at = jsonObj.facebook_page.post.created_time;
		}
		
		// Extractors
		stats.putStat(jsonObj);		
		
		interaction.putWords(jsonObj);
		interaction.putTimestamps(jsonObj);	
		interaction.putHashTags(jsonObj);
		interaction.putTagSummary(jsonObj);
		interaction.putTagsByTime(jsonObj);
		interaction.putLongLat(jsonObj);
		interaction.putTagSentimentByTime(jsonObj);
		interaction.putTypeByTime(jsonObj);
		interaction.putType(jsonObj);
		
		salience.putSentiment(jsonObj);
		salience.putLocations(jsonObj);
		salience.putQuotes(jsonObj);
		salience.putTopics(jsonObj);
		
		links.putUrlDomains(jsonObj);
		
		language.putLanguage(jsonObj);
		
		twitter.putRetweetRetweeted(jsonObj);
		twitter.putTwitterIdsAndTags(jsonObj);
		twitter.putInfluencerModel(jsonObj);
		
		demographics.putDemographics(jsonObj);
	
	  bitly.putRefererDomains(jsonObj);
	  
	  facebookpage.putTypes(jsonObj);
	  
	  	
	}
	catch (e) {
	  	console.log('ERROR: ' + e);
	  	console.log('');
	  	console.log(line);
   	}
  	
  }
  
};


