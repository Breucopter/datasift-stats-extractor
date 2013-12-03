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
		console.log('(1/24) Rendering stats..');
		stats.renderStat();	
		
		console.log('(2/24) Rendering word count..');
		interaction.renderWords();
		console.log('(3/24) Rendering timestamps..');
		interaction.renderTimestamps();
		console.log('(4/24) Rendering hash tags..');
		interaction.renderHashTags();
		console.log('(5/24) Rendering tags..');
		interaction.renderTags();
		console.log('(6/24) Rendering tags by time..');
		interaction.renderTagsByTime();
		console.log('(7/24) Rendering lat/long..');
		interaction.renderLongLat();
		console.log('(8/24) Rendering tag sentiment..');
		interaction.renderTagSentimentByTime();
		console.log('(9/24) Rendering data types by time..');
		interaction.renderTypeByTime();
		console.log('(10/24) Rendering data types summary..');
		interaction.renderTypes();
		
		console.log('(11/24) Rendering sentiment..');
		salience.renderSentiment();	
		console.log('(12/24) Rendering entity locations..');
		salience.renderLocations();
		console.log('(13/24) Rendering entity quotes..');
		salience.renderQuotes();
		console.log('(14/24) Rendering topics..');
		salience.renderTopics();
		
		console.log('(15/24) Rendering languages..');
		language.renderLanguage();
		
		console.log('(16/24) Rendering domains..');
		links.renderUrlDomains();
		
		console.log('(17/24) Rendering retweets..');
		twitter.renderRetweetRetweeted();
		console.log('(18/24) Rendering twitter id\'s..');	
		twitter.renderTwitterIds();
		console.log('(19/24) Rendering twitter id\s by tag..');
		twitter.renderTwitterIdTags();
		console.log('(20/24) Rendering sample influencer model..');
		twitter.renderInfluencerModel();
		
		console.log('(21/24) Rendering demographics..');
		demographics.renderDemographics();
		
		console.log('(22/24) Rendering Bitly refering domains..');
		bitly.renderBitlyReferingDomains();
		
		console.log('(23/24) Rendering Facebook Page types..');
		facebookpage.renderPageTypes();
		console.log('(24/24) Rendering Facebook Page volumes..');
		facebookpage.renderPageVolumes();
		
		
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


