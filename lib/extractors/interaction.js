'use strict';

var utils = require('../util/utils.js');

module.exports = {

  // Volume by day, hour, minute
  putTimestamps : function(data) { 	
    if(data.interaction !== undefined && data.interaction.created_at !== undefined){
    	 	  
 	  var dateObj = utils.createDateObjFromStr(data.interaction.created_at);
 	  if(dateObj === false)
 	  	return;
 	  	
 	  // DAY INDEX - format DD-MM-YYYY
	  var dateIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate());
 	  
 	  timestamps.daydata = timestamps.daydata || {};
 	  timestamps.daydata[dateIndex] = timestamps.daydata[dateIndex] || 0;
 	  timestamps.daydata[dateIndex] ++;
 	  
 	  // HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 	  
 	  timestamps.hourdata = timestamps.hourdata || {};
 	  timestamps.hourdata[hourIndex] = timestamps.hourdata[hourIndex] || 0;
 	  timestamps.hourdata[hourIndex] ++; 	  
 	  
 	  // MINUTE INDEX - format DD-MM-YYYY HH:MM:SS
	  var minuteIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':' + dateObj.getUTCMinutes() + ':00');
 	  
 	  timestamps.minutedata = timestamps.minutedata || {};
 	  timestamps.minutedata[minuteIndex] = timestamps.minutedata[minuteIndex] || 0;
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
 	  	hashtags[hashTag[y]] = hashtags[hashTag[y]]	|| 0;
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
  			tags[eachTag] = tags[eachTag] || 0;
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
		 	tags.daydata[dateIndex][eachTag] = tags.daydata[dateIndex][eachTag] || 0;
		 	tags.daydata[dateIndex][eachTag] ++;

 	  		// HOUR INDEX - format DD-MM-YYYY HH:MM:SS
	  		var hourIndex = (dateObj.getUTCFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getUTCDate() + ' ' + (dateObj.getUTCHours()) + ':00:00');
 		 	tags.hourdata = tags.hourdata || {};
		 	tags.hourdata[hourIndex] = tags.hourdata[hourIndex] || {};
		 	tags.hourdata[hourIndex][eachTag] = tags.hourdata[hourIndex][eachTag] || 0;
		 	tags.hourdata[hourIndex][eachTag] ++;	  

 		}		  
    }
  },  
};
