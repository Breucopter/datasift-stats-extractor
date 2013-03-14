'use strict';
var filehandler 		= require('./util/filehandler.js');
var interaction 		= require('../lib/renderers/interaction');
var salience 			= require('../lib/renderers/salience');
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
		interaction.renderTimestamps();
		interaction.renderHashTags();
		interaction.renderTags();
		interaction.renderTagsByDay();
		interaction.renderLongLat();	
		salience.renderLocations();
		salience.renderTopics();
		links.renderUrlDomains();
		twitter.renderInfluencer();	
		demographics.renderDemographics();
		
	} catch (e) {
		console.log('ERROR: ' + e);
	}

}

};


