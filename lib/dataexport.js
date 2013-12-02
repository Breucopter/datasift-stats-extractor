'use strict';
var filehandler 	= require('./util/filehandler.js');
var interaction 	= require('../lib/renderers/interaction');
var salience 			= require('../lib/renderers/salience');
var language 			= require('../lib/renderers/language');
var links 				= require('../lib/renderers/links');
var twitter 			= require('../lib/renderers/twitter');
var stats 				= require('../lib/renderers/stats');
var demographics	= require('../lib/renderers/demographics');
var bitly 				= require('../lib/renderers/bitly');
var facebookpage	= require('../lib/renderers/facebookpage');

module.exports = {
 
  dumpFiles: function () {
  	
	try {
		
		// Delete any old files
		filehandler.cleanFiles();

		// Renderers
		console.log('(1/23) Rendering stats..');
		stats.renderStat();	
		
		console.log('(2/23) Rendering word count..');
		interaction.renderWords();
		console.log('(3/23) Rendering timestamps..');
		interaction.renderTimestamps();
		console.log('(4/23) Rendering hash tags..');
		interaction.renderHashTags();
		console.log('(5/23) Rendering tags..');
		interaction.renderTags();
		console.log('(6/23) Rendering tags by time..');
		interaction.renderTagsByTime();
		console.log('(7/23) Rendering lat/long..');
		interaction.renderLongLat();
		console.log('(8/23) Rendering tag sentiment..');
		interaction.renderTagSentimentByTime();
		console.log('(9/23) Rendering data types by time..');
		interaction.renderTypeByTime();
		console.log('(10/23) Rendering data types summary..');
		interaction.renderTypes();
		
		console.log('(11/23) Rendering sentiment..');
		salience.renderSentiment();	
		console.log('(12/23) Rendering entity locations..');
		salience.renderLocations();
		console.log('(13/23) Rendering entity quotes..');
		salience.renderQuotes();
		console.log('(14/23) Rendering topics..');
		salience.renderTopics();
		
		console.log('(15/23) Rendering languages..');
		language.renderLanguage();
		
		console.log('(16/23) Rendering domains..');
		links.renderUrlDomains();
		
		console.log('(17/23) Rendering retweets..');
		twitter.renderRetweetRetweeted();
		console.log('(18/23) Rendering twitter id\'s..');	
		twitter.renderTwitterIds();
		console.log('(19/23) Rendering twitter id\s by tag..');
		twitter.renderTwitterIdTags();
		console.log('(20/23) Rendering sample influencer model..');
		twitter.renderInfluencerModel();
		
		console.log('(21/23) Rendering demographics..');
		demographics.renderDemographics();
		
		console.log('(22/23) Rendering Bitly refering domains..');
		bitly.renderBitlyReferingDomains();
		
		console.log('(23/23) Rendering Facebook Page types..');
		facebookpage.renderPageTypes();
		
		
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


