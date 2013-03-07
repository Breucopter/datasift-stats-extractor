'use strict';
var utils = require('../util/utils.js');

module.exports = {

  putStat : function(data) {
    if(data.interaction !== undefined && data.interaction.created_at !== undefined){
 	  	
 	  	// Volume count
 	  	stats.volume = stats.volume || 0;
		stats.volume++;
		
		// First and last date time
		 var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
	 	 if(dateObj === false)
	 	  	return;
	 	  	
		stats.first = stats.first || dateObj;
		
		if(dateObj.getTime() < stats.first.getTime()){
			stats.first = dateObj;
		}

		stats.last = stats.last || dateObj;
		
		if(dateObj.getTime() > stats.last.getTime()){
			stats.last = dateObj;
		}


		// Average Tweet size
		stats.sizes = stats.sizes || [];
		var string = JSON.stringify(data);
  		stats.sizes.push(Buffer.byteLength(string, 'utf8'));	
    }
  },
  
};
