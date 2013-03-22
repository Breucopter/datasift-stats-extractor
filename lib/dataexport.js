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
		stats.renderStat();	
		
		interaction.renderWords();
		interaction.renderTimestamps();
		interaction.renderHashTags();
		interaction.renderTags();
		interaction.renderTagsByTime();
		interaction.renderLongLat();
		
		salience.renderSentiment();	
		salience.renderLocations();
		salience.renderTopics();
		
		language.renderLanguage();
		
		links.renderUrlDomains();
		
		twitter.renderInfluencer();	
		
		demographics.renderDemographics();
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


