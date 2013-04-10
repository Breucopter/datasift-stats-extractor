'use strict';
var utils = require('../util/utils.js');
module.exports = {

	
	putSentiment : function(data){
		if (data.interaction === undefined || data.salience === undefined || data.salience.content === undefined || data.salience.content.sentiment === undefined || data.salience.content.sentiment === '') return;
		
		var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
	 	if(dateObj === false)
	 		return;
	 	  	
		// DAY INDEX - format DD-MM-YYYY
		var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());
	 	  
	 	salience.sentiment 							= salience.sentiment || {}; 
	 	salience.sentiment.daydata 					= salience.sentiment.daydata || {};
	 	salience.sentiment.daydata[dateIndex] 		= salience.sentiment.daydata[dateIndex] || {};
	 	salience.sentiment.daydata[dateIndex].count = salience.sentiment.daydata[dateIndex].count || 0; 
	 	salience.sentiment.daydata[dateIndex].total = salience.sentiment.daydata[dateIndex].total || 0;
	 	salience.sentiment.daydata[dateIndex].mean 	= salience.sentiment.daydata[dateIndex].mean || 0;
	 	
	 	salience.sentiment.daydata[dateIndex].count ++;
	 	salience.sentiment.daydata[dateIndex].total +=  data.salience.content.sentiment;
	 	salience.sentiment.daydata[dateIndex].mean 	= salience.sentiment.daydata[dateIndex].total / salience.sentiment.daydata[dateIndex].count;
	 	
	 	
	 	// HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  	var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 	
	 	salience.sentiment.hourdata 					= salience.sentiment.hourdata || {};
	 	salience.sentiment.hourdata[hourIndex] 			= salience.sentiment.hourdata[hourIndex] || {};
	 	salience.sentiment.hourdata[hourIndex].count 	= salience.sentiment.hourdata[hourIndex].count || 0; 
	 	salience.sentiment.hourdata[hourIndex].total 	= salience.sentiment.hourdata[hourIndex].total || 0;
	 	salience.sentiment.hourdata[hourIndex].mean 	= salience.sentiment.hourdata[hourIndex].mean || 0;
	 	
	 	salience.sentiment.hourdata[hourIndex].count 	++;
	 	salience.sentiment.hourdata[hourIndex].total	+=  data.salience.content.sentiment;
	 	salience.sentiment.hourdata[hourIndex].mean 	= salience.sentiment.hourdata[hourIndex].total / salience.sentiment.hourdata[hourIndex].count;	 	
	 	
		
		// MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	  	var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
 	  		
	 	salience.sentiment.minutedata 						= salience.sentiment.minutedata || {};
	 	salience.sentiment.minutedata[minuteIndex] 			= salience.sentiment.minutedata[minuteIndex] || {};
	 	salience.sentiment.minutedata[minuteIndex].count 	= salience.sentiment.minutedata[minuteIndex].count || 0; 
	 	salience.sentiment.minutedata[minuteIndex].total 	= salience.sentiment.minutedata[minuteIndex].total || 0;
	 	salience.sentiment.minutedata[minuteIndex].mean 	= salience.sentiment.minutedata[minuteIndex].mean || 0;
	 	
	 	salience.sentiment.minutedata[minuteIndex].count 	++;
	 	salience.sentiment.minutedata[minuteIndex].total	+=  data.salience.content.sentiment;
	 	salience.sentiment.minutedata[minuteIndex].mean 	= salience.sentiment.minutedata[minuteIndex].total / salience.sentiment.minutedata[minuteIndex].count;	
		
	},


	putLocations : function(data) {
		if (data.interaction !== undefined && data.salience !== undefined && data.salience.content !== undefined && data.salience.content.entities !== undefined) {
			for (var x in data.salience.content.entities) {
				//console.log(data.salience.content.entities[x]);
				if (data.salience.content.entities[x].type === 'Place') {
					salience.locations = salience.locations || {};
					salience.locations[data.salience.content.entities[x].name] = salience.locations[data.salience.content.entities[x].name] || {};
					salience.locations[data.salience.content.entities[x].name].count = salience.locations[data.salience.content.entities[x].name].count || 0;
					salience.locations[data.salience.content.entities[x].name].count++;

					// Collect the sentiment
					if (data.salience.content.sentiment !== undefined) {
						salience.locations[data.salience.content.entities[x].name].sentiment = salience.locations[data.salience.content.entities[x].name].sentiment || [];
						salience.locations[data.salience.content.entities[x].name].sentiment.push(data.salience.content.sentiment);
					}
				}
			}
		}

	},
	
	putQuotes : function(data) {
		if (data.interaction === undefined || data.salience === undefined || data.salience.content === undefined || data.salience.content.entities === undefined) return;
		
		for (var x in data.salience.content.entities) {
			if (data.salience.content.entities[x].type === 'Quote') {
				salience.quotes = salience.quotes || {};
				
				// Strip any unwanted characters from the quote
				var quote = data.salience.content.entities[x].name.replace(/[&\/\\#,+()$~%.'"“”:*?<>{}]/g,'');
				
				salience.quotes[quote] = salience.quotes[quote] || {};
				salience.quotes[quote].count = salience.quotes[quote].count || 0;
				salience.quotes[quote].count++;
			}
		}
	},
		
	// Salience Content Topics
	putTopics : function(data) {
		if (data.interaction !== undefined && data.salience !== undefined && data.salience.content !== undefined && data.salience.content.topics !== undefined) {
			for (var x in data.salience.content.topics) {
				salience.topics = salience.topics || {};
				salience.topics[data.salience.content.topics[x].name] = salience.topics[data.salience.content.topics[x].name] || 0;
				salience.topics[data.salience.content.topics[x].name] ++;
		 	}	
		}	
		
	}
	
};
