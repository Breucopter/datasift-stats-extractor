'use strict';
var utils 			= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');

module.exports = {

  renderStat : function(data) {
  	
  	// TOTAL VOLUME
  	if(stats.volume !== undefined){
	  	var stats_txt = '';
	  	if(stats.volume){
			stats_txt += 'Total Volume: ' + JSON.stringify(stats.volume) + "\n";
		}
	}
	
	// FIRST AMD LAST TIMESTAMPS
	if(stats.first !== undefined && stats.last !== undefined){
		// First and last date times
		stats_txt += 'Start Date Time: ' + stats.first.toString() + "\n";
		stats_txt += 'End Date Time: ' + stats.last.toString() + "\n";
	}


	// DEMOGRAPHICS - number of unique users	
	if(demographics.users !== undefined){
		stats_txt += 'Demographic Unique Users: ' + Object.keys(demographics.users).length + "\n";
	}

	
	// AVERAGE TWEET SIZE
	if(stats.sizes !== undefined){
		var total = 0;
		for(var i = 0; i < stats.sizes.length; i++){
		  total += stats.sizes[i];
		}
		stats_txt += 'Average Tweet Size: ' + (total/stats.volume).toFixed(2) + " bytes\n";
		
		// Save data
		filehandler.save('stats.txt', stats_txt);
		stats_txt = null;
	}
 
  },
  
};
