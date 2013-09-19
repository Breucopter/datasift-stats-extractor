'use strict';
var filehandler 		= require('./util/filehandler.js');
var interaction 		= require('../lib/renderers/interaction');
var salience 			= require('../lib/renderers/salience');
var language 			= require('../lib/renderers/language');
var links 				= require('../lib/renderers/links');
var twitter 			= require('../lib/renderers/twitter');
var stats 				= require('../lib/renderers/stats');
var demographics 		= require('../lib/renderers/demographics');
var bitly 				= require('../lib/renderers/bitly');

module.exports = {
 
  dumpFiles: function () {
  	
	try {
		
		// Delete any old files
		filehandler.cleanFiles();

		// Renderers
		console.log('(1/22) Rendering stats..');
		stats.renderStat();	
		
		console.log('(2/22) Rendering word count..');
		interaction.renderWords();
		console.log('(3/22) Rendering timestamps..');
		interaction.renderTimestamps();
		console.log('(4/22) Rendering hash tags..');
		interaction.renderHashTags();
		console.log('(5/22) Rendering tags..');
		interaction.renderTags();
		console.log('(6/22) Rendering tags by time..');
		interaction.renderTagsByTime();
		console.log('(7/22) Rendering lat/long..');
		interaction.renderLongLat();
		console.log('(8/22) Rendering tag sentiment..');
		interaction.renderTagSentimentByTime();
		console.log('(9/22) Rendering data types by time..');
		interaction.renderTypeByTime();
		console.log('(10/22) Rendering data types summary..');
		interaction.renderTypes();
		
		console.log('(11/22) Rendering sentiment..');
		salience.renderSentiment();	
		console.log('(12/22) Rendering entity locations..');
		salience.renderLocations();
		console.log('(13/22) Rendering entity quotes..');
		salience.renderQuotes();
		console.log('(14/22) Rendering topics..');
		salience.renderTopics();
		
		console.log('(15/22) Rendering languages..');
		language.renderLanguage();
		
		console.log('(16/22) Rendering domains..');
		links.renderUrlDomains();
		
		console.log('(17/22) Rendering retweets..');
		twitter.renderRetweetRetweeted();
		console.log('(18/22) Rendering twitter id\'s..');	
		twitter.renderTwitterIds();
		console.log('(19/22) Rendering twitter id\s by tag..');
		twitter.renderTwitterIdTags();
		console.log('(20/22) Rendering sample influencer model..');
		twitter.renderInfluencerModel();
		
		console.log('(21/22) Rendering demographics..');
		demographics.renderDemographics();
		
		console.log('(22/22) Rendering Bitly refering domains..');
		bitly.renderBitlyReferingDomains();
		
		
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


