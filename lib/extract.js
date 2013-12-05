'use strict';
var 	salience 			= require('../lib/extractors/salience')
		, interaction 	= require('../lib/extractors/interaction')
		,	stats 				= require('../lib/extractors/stats')
		,	language 			= require('../lib/extractors/language')
		,	links 				= require('../lib/extractors/links')
		, twitter 			= require('../lib/extractors/twitter')
		,	demographics 	= require('../lib/extractors/demographics')
		,	bitly 				= require('../lib/extractors/bitly')
		,	facebookpage	= require('../lib/extractors/facebookpage')
		,	config 				=	require('../lib/config.js')
		, augmentations	= require('../lib/extractors/augmentations.js')
		;


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
		
		interaction.putTimestamps(jsonObj);
		interaction.putTypeByTime(jsonObj);
		interaction.putType(jsonObj);
		interaction.putLongLat(jsonObj);
		
		// Content words
		if(config.get('extractor:content') === true){
			interaction.putHashTags(jsonObj);
			interaction.putWords(jsonObj);	
		}	
		
		// Tags
		if(config.get('extractor:tags') === true){
			interaction.putTagsByTime(jsonObj);
			interaction.putTagSummary(jsonObj);	
			interaction.putTagSentimentByTime(jsonObj);
		}	
		
		// Salience
		if(config.get('extractor:salience') === true){
			salience.putSentiment(jsonObj);
			salience.putLocations(jsonObj);
			salience.putQuotes(jsonObj);
			salience.putTopics(jsonObj);
		}
		
		// Links
		if(config.get('extractor:links') === true){
			links.putUrlDomains(jsonObj);
		}
		
		// Language
		if(config.get('extractor:language') === true){
			language.putLanguage(jsonObj);
		}
		
		// Twitter
		if(config.get('extractor:twitter') === true){
			twitter.putRetweetRetweeted(jsonObj);
			twitter.putTwitterIdsAndTags(jsonObj);
			twitter.putInfluencerModel(jsonObj);
		}
		
		// Demographics
		if(config.get('extractor:demographics') === true){
			demographics.putDemographics(jsonObj);
		}
		
	  bitly.putRefererDomains(jsonObj);
	  
	  // Facebook Pages
	  if(config.get('extractor:facebook_pages') === true){
	  	facebookpage.putPages(jsonObj);
	  }
	  
	  // Augmentation Stats
	  if(config.get('extractor:augmentation_stats') === true){
	  	augmentations.putAugmentationStats(jsonObj);	
	  }
	  	
	}
	catch (e) {
	  	console.log('ERROR: ' + e);
	  	console.log('');
	  	console.log(line);
   	}
  	
  }
  
};


