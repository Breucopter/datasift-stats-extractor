'use strict';
var filehandler 		= require('./util/filehandler.js');
var interaction 		= require('../lib/renderers/interaction');
var salience 			= require('../lib/renderers/salience');
var language 			= require('../lib/renderers/language');
var links 				= require('../lib/renderers/links');
var twitter 			= require('../lib/renderers/twitter');
var stats 				= require('../lib/renderers/stats');
var demographics 		= require('../lib/renderers/demographics');

module.exports = {
 
  dumpFiles: function () {
  	
	try {
		
		// Delete any old files
		filehandler.cleanFiles();

		// Renderers
		console.log('(1/20) Rendering stats..');
		stats.renderStat();	
		
		console.log('(2/20) Rendering word count..');
		interaction.renderWords();
		console.log('(3/20) Rendering timestamps..');
		interaction.renderTimestamps();
		console.log('(4/20) Rendering hash tags..');
		interaction.renderHashTags();
		console.log('(5/20) Rendering tags..');
		interaction.renderTags();
		console.log('(6/20) Rendering tags by time..');
		interaction.renderTagsByTime();
		console.log('(7/20) Rendering lat/long..');
		interaction.renderLongLat();
		console.log('(8/20) Rendering tag sentiment..');
		interaction.renderTagSentimentByTime();
		console.log('(9/20) Rendering data types by time..');
		interaction.renderTypeByTime();
		console.log('(10/20) Rendering data types summary..');
		interaction.renderTypes();
		
		console.log('(11/20) Rendering sentiment..');
		salience.renderSentiment();	
		console.log('(12/20) Rendering entity locations..');
		salience.renderLocations();
		console.log('(13/20) Rendering entity quotes..');
		salience.renderQuotes();
		console.log('(14/20) Rendering topics..');
		salience.renderTopics();
		
		console.log('(15/20) Rendering languages..');
		language.renderLanguage();
		
		console.log('(16/20) Rendering domains..');
		links.renderUrlDomains();
		
		console.log('(17/20) Rendering retweets..');
		twitter.renderRetweetRetweeted();
		console.log('(18/20) Rendering twitter id\'s..');	
		twitter.renderTwitterIds();
		console.log('(19/20) Rendering twitter id\s by tag..');
		twitter.renderTwitterIdTags();
		console.log('(20/20) Rendering sample influencer model..');
		twitter.renderInfluencerModel();
		
		console.log('(21/20) Rendering demographics..');
		demographics.renderDemographics();
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


