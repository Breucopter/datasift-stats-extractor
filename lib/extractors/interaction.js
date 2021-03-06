'use strict';

var utils = require('../util/utils.js');

module.exports = {

  // Aggregate words from content
  putWords : function(data) {
  	 if(data.interaction !== undefined && data.interaction.content !== undefined){
  	 	
  	 	var clean_string 	= utils.cleanString(data.interaction.content);
  	 	var words_array 	= utils.cleanStopWords(clean_string);
  	 	
  	 	interaction.words = interaction.words || {};
  	 	
  	 	words_array.forEach(function(item) {
			interaction.words[item] = interaction.words[item] || 0;
			interaction.words[item] ++;	
		});
  	 	
  	 }	
  },
  
  // Volume by day, hour, minute
  putTimestamps : function(data) { 	
    if(data.interaction !== undefined && data.interaction.created_at !== undefined){
    	 	  
 	  var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
 	  if(dateObj === false)
 	  	return;
 	  	
 	  // DAY INDEX - format DD-MM-YYYY
	  var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());
 	  
 	  timestamps.daydata = timestamps.daydata || {};
 	  timestamps.daydata[dateIndex] = timestamps.daydata[dateIndex] || 1;
 	  timestamps.daydata[dateIndex] ++;
 	  
 	  // HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 	  
 	  timestamps.hourdata = timestamps.hourdata || {};
 	  timestamps.hourdata[hourIndex] = timestamps.hourdata[hourIndex] || 1;
 	  timestamps.hourdata[hourIndex] ++; 	  
 	  
 	  // MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	  var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
 	  
 	  timestamps.minutedata = timestamps.minutedata || {};
 	  timestamps.minutedata[minuteIndex] = timestamps.minutedata[minuteIndex] || 1;
 	  timestamps.minutedata[minuteIndex] ++; 	 	

    }

 	
  },
  
  // Hashtags - top hashtags for twitter data
  putHashTags : function(data) {
    if(data.interaction !== undefined && data.interaction.content !== undefined && data.interaction.type !== undefined && data.interaction.type === 'twitter'){
	  
 	  var hashTag = utils.extractHashTags(data.interaction.content);
 	 
 	  if(hashTag === false)
 	    return;
 	  	
 	  for(var y = 0; y < hashTag.length; y++){
 	  	hashtags[hashTag[y]] = hashtags[hashTag[y]]	|| 1;
 	  	hashtags[hashTag[y]] ++;
 	  }		  
    }
  },

  
  // GEO - longitude and latitude 
  putLongLat : function(data) {
  	
  	 if(data.interaction === undefined || data.interaction.geo === undefined || data.interaction.geo.longitude === undefined || data.interaction.geo.latitude === undefined)
  	 	return;
  	
  	 geo.push([data.interaction.geo.latitude, data.interaction.geo.longitude]);
  	
  },	
  
  // Tags - simple tag volume
  putTagSummary : function(data) {
  	
    if(data.interaction !== undefined && data.interaction.tags !== undefined){
	  
	  	for(var tag in data.interaction.tags){
	  		var eachTag = data.interaction.tags[tag];
  			tags[eachTag] = tags[eachTag] || 1;
  			tags[eachTag] ++;
 		}		  
    }
  },
  
  
  // Tags - tag volume by time  
  putTagsByTime : function(data) {
    if(data.interaction !== undefined && data.interaction.tags !== undefined && data.interaction.created_at !== undefined){

		// Attempt to build a valid data object from the string
		var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
		if(dateObj === false)
			return;
					  
	  	for(var tag in data.interaction.tags){
	  		var eachTag = data.interaction.tags[tag];
	  		  	
			// DAY INDEX - format DD-MM-YYYY
			var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());
		 	tags.daydata = tags.daydata || {};
		 	tags.daydata[dateIndex] = tags.daydata[dateIndex] || {};
		 	tags.daydata[dateIndex][eachTag] = tags.daydata[dateIndex][eachTag] || 1;
		 	tags.daydata[dateIndex][eachTag] ++;

 	  		// HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  		var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 		 	tags.hourdata = tags.hourdata || {};
		 	tags.hourdata[hourIndex] = tags.hourdata[hourIndex] || {};
		 	tags.hourdata[hourIndex][eachTag] = tags.hourdata[hourIndex][eachTag] || 1;
		 	tags.hourdata[hourIndex][eachTag] ++;	  

 	  		 // MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	 		var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
	 		
 		 	tags.minutedata = tags.minutedata || {};
		 	tags.minutedata[minuteIndex] = tags.minutedata[minuteIndex] || {};
		 	tags.minutedata[minuteIndex][eachTag] = tags.minutedata[minuteIndex][eachTag] || 1;
		 	tags.minutedata[minuteIndex][eachTag] ++;	

 		}		  
    }
  },


  // Tag sentiment by time
  putTagSentimentByTime : function(data) {
  	
    if(data.interaction === undefined || data.interaction.tags === undefined || data.interaction.created_at === undefined || data.salience === undefined || data.salience.content === undefined || data.salience.content.sentiment === undefined || data.salience.content.sentiment === '') return;

	// Attempt to build a valid data object from the string
	var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
	if(dateObj === false)
		return;
				  
  	for(var tag in data.interaction.tags)
  	{
  		var eachTag = data.interaction.tags[tag];
  	
  		// DAY INDEX - format DD-MM-YYYY
		var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());
	 	  
	 	salience.tagsentiment 									= salience.tagsentiment || {}; 
	 	salience.tagsentiment.daydata 							= salience.tagsentiment.daydata || {};
	 	salience.tagsentiment.daydata[dateIndex] 				= salience.tagsentiment.daydata[dateIndex] || {};
	 	salience.tagsentiment.daydata[dateIndex][eachTag]		= salience.tagsentiment.daydata[dateIndex][eachTag] || []; 
	 	salience.tagsentiment.daydata[dateIndex][eachTag].count = salience.tagsentiment.daydata[dateIndex][eachTag].count || 0; 
	 	salience.tagsentiment.daydata[dateIndex][eachTag].total = salience.tagsentiment.daydata[dateIndex][eachTag].total || 0;
	 	salience.tagsentiment.daydata[dateIndex][eachTag].mean 	= salience.tagsentiment.daydata[dateIndex][eachTag].mean || 0;
	 	
	 	salience.tagsentiment.daydata[dateIndex][eachTag].count ++;
	 	salience.tagsentiment.daydata[dateIndex][eachTag].total +=  data.salience.content.sentiment;
	 	salience.tagsentiment.daydata[dateIndex][eachTag].mean 	= salience.tagsentiment.daydata[dateIndex][eachTag].total / salience.tagsentiment.daydata[dateIndex][eachTag].count;
	 	
	 	
	 	// HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  	var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 	
	 	salience.tagsentiment.hourdata 								= salience.tagsentiment.hourdata || {};
	 	salience.tagsentiment.hourdata[hourIndex] 					= salience.tagsentiment.hourdata[hourIndex] || {};
	 	salience.tagsentiment.hourdata[hourIndex][eachTag]			= salience.tagsentiment.hourdata[hourIndex][eachTag] || [];
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].count 	= salience.tagsentiment.hourdata[hourIndex][eachTag].count || 0; 
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].total 	= salience.tagsentiment.hourdata[hourIndex][eachTag].total || 0;
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].mean 	= salience.tagsentiment.hourdata[hourIndex][eachTag].mean || 0;
	 	
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].count 	++;
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].total	+=  data.salience.content.sentiment;
	 	salience.tagsentiment.hourdata[hourIndex][eachTag].mean 	= salience.tagsentiment.hourdata[hourIndex][eachTag].total / salience.tagsentiment.hourdata[hourIndex][eachTag].count;	 	
	 	
		
		// MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	  	var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
 	  		
	 	salience.tagsentiment.minutedata 								= salience.tagsentiment.minutedata || {};
	 	salience.tagsentiment.minutedata[minuteIndex] 					= salience.tagsentiment.minutedata[minuteIndex] || {};
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag]			= salience.tagsentiment.minutedata[minuteIndex][eachTag] || {};
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].count 	= salience.tagsentiment.minutedata[minuteIndex][eachTag].count || 0; 
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].total 	= salience.tagsentiment.minutedata[minuteIndex][eachTag].total || 0;
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].mean 	= salience.tagsentiment.minutedata[minuteIndex][eachTag].mean || 0;
	 	
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].count 	++;
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].total	+=  data.salience.content.sentiment;
	 	salience.tagsentiment.minutedata[minuteIndex][eachTag].mean 	= salience.tagsentiment.minutedata[minuteIndex][eachTag].total / salience.tagsentiment.minutedata[minuteIndex][eachTag].count;		  	


	}		  
  },


  // interaction type by time
  putTypeByTime : function(data) { 	
	if(data.interaction == undefined || data.interaction.created_at === undefined || data.interaction.type === undefined)
		return;
		 	  
	  var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
	  if(dateObj === false)
	  	return;
	  
	  // A holder object for all of the interaction.type values 
	  interaction.alltypes = interaction.alltypes ||{};
	  interaction.alltypes[data.interaction.type] = data.interaction.type;
	  	
	  // DAY INDEX - format DD-MM-YYYY
	  var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());

	  interaction.type = interaction.type || {};
	  interaction.type.daydata = interaction.type.daydata || {};
	  interaction.type.daydata[dateIndex] = interaction.type.daydata[dateIndex] || {};
	  interaction.type.daydata[dateIndex][data.interaction.type] = interaction.type.daydata[dateIndex][data.interaction.type] || 0;
	  interaction.type.daydata[dateIndex][data.interaction.type] ++;
	  
	  // HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
	  
	  interaction.type.hourdata = interaction.type.hourdata || {};
	  interaction.type.hourdata[hourIndex] = interaction.type.hourdata[hourIndex] || {};
	  interaction.type.hourdata[hourIndex][data.interaction.type] = interaction.type.hourdata[hourIndex][data.interaction.type] || 0;
	  interaction.type.hourdata[hourIndex][data.interaction.type] ++;	  
	  
	  // MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	  var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
	  
	  interaction.type.minute = interaction.type.minute || {};
	  interaction.type.minute[minuteIndex] = interaction.type.minute[minuteIndex] || {};
	  interaction.type.minute[minuteIndex][data.interaction.type] = interaction.type.minute[minuteIndex][data.interaction.type] || 0;
	  interaction.type.minute[minuteIndex][data.interaction.type] ++;

 	
  },  

  // interaction type 
  putType : function(data) { 	
	if(data.interaction == undefined || data.interaction.created_at === undefined || data.interaction.type === undefined)
		return;
	  
	  interaction.types = interaction.types ||{};
	  interaction.types[data.interaction.type] = interaction.types[data.interaction.type] || 0;
	  interaction.types[data.interaction.type] ++;
	   

  },  

};
