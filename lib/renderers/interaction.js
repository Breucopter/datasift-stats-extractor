'use strict';
var utils 		= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');
var _  = require('underscore');

module.exports = {


  renderWords : function() {

	  // URL Volume
  	if(utils.isEmpty(interaction.words) === false){
  		
  		// Re-order
		interaction.words = utils.orderObject(interaction.words);
	  var dump_words = "String,Volume\n";
	  	
		for(var wordIndex in interaction.words){
	  		dump_words += '"' + wordIndex + '","' + interaction.words[wordIndex] + "\n";
	 	}
		filehandler.save('content_words_volume.csv', dump_words);
		
	}	 
  },
  
  
	renderTimestamps : function() {

		// VOLUME by day
		if(utils.isEmpty(timestamps) === false){
			var dump_ts_day = "date_time,volume\n";
			for(var dayIndex in timestamps.daydata){
		  		dump_ts_day += dayIndex + ',' + timestamps.daydata[dayIndex]  + "\n";
		 	}
			filehandler.save('volume_by_day.csv', dump_ts_day);
			dump_ts_day = '';
		
			// VOLUME by hour
			var dump_ts_hour = "date_time,volume\n";
			for(var hourIndex in timestamps.hourdata){
		  		dump_ts_hour += hourIndex + ',' + timestamps.hourdata[hourIndex]  + "\n";
		 	}
			filehandler.save('volume_by_hour.csv', dump_ts_hour);
			dump_ts_hour = '';
		
			// VOLUME by minute
			var dump_ts_minute = "date_time,volume\n";
			for(var minuteIndex in timestamps.minutedata){
		  		dump_ts_minute += minuteIndex + ',' + timestamps.minutedata[minuteIndex]  + "\n";
		 	}
			filehandler.save('volume_by_minute.csv', dump_ts_minute);
			dump_ts_minute = null;

		}	
	
	
	},


  renderHashTags : function() {
		if(utils.isEmpty(hashtags) === false){
			var ordered_hash_tags = utils.orderObject(hashtags);
			var dump_hashtags = "Hashtag,Volume\n";
			for(var hashIndex in ordered_hash_tags){
		  		dump_hashtags += hashIndex + ',' + ordered_hash_tags[hashIndex]  + "\n";
		 	}
			filehandler.save('hashtag_volume.csv', dump_hashtags);
			dump_hashtags = '';
		}	
  },
  

  renderTags : function() {
		if(utils.isEmpty(tags) === false){
			var dump_tags = "tag,volume\n";
			for(var tag in tags){
			  if(typeof(tags[tag]) !== 'object')
		  	 	dump_tags += '"' + tag + '",' + tags[tag]  + "\n";
		 	}
			filehandler.save('tag_volume.csv', dump_tags);
			dump_tags = '';
		}
  },
  
  
  // TODO - rafactor to cleanup dump JSON obkect to CSV
  renderTagsByTime : function() {
	if(utils.isEmpty(tags.daydata) === false && utils.isEmpty(tags) === false){
		
		var dump_tag_data_day = 'date_time,';	
		var dump_tag_data_hour = '';
		var dump_tag_data_minute = '';
			
		// Build an array of all tags so we can sort alpha.
		var all_tags = [];
		for(var tag in tags)
		  if(typeof(tags[tag]) !== 'object')	
	  	    all_tags.push(tag);
	 	
		all_tags.sort();
		
		// Build a default tag object setting all tags to 0 e.g. { Buy: 0, Invest: 0, Sell: 0 }
		var default_tag_obj = {};
		var tag_string = '';
		for (var i = 0; i < all_tags.length; ++i){
		  default_tag_obj[all_tags[i]] = default_tag_obj[all_tags[i]] || 0;
		  dump_tag_data_day += all_tags[i] + ',';
		}  
		
		dump_tag_data_day = dump_tag_data_day.substring(0, dump_tag_data_day.length - 1);
		dump_tag_data_day +=  "\n";
		dump_tag_data_hour = dump_tag_data_day;
		dump_tag_data_minute=dump_tag_data_day;
		
		
	 	/*
	 	 * DAY VOLUME DATA
	 	 */ 		
		// Build a new object with all tags and update their counts respectivley		
		var output_tag_data = {};
		output_tag_data.daydata = {};

		for(var dayIndex in tags.daydata){
			output_tag_data.daydata[dayIndex] = output_tag_data.daydata[dayIndex] || _.clone(default_tag_obj);			
	 		for(var tagIndex in tags.daydata[dayIndex]){
	 			output_tag_data.daydata[dayIndex][tagIndex] = tags.daydata[dayIndex][tagIndex];
	 			//console.log(dayIndex + ' : ' + tagIndex + ' - ' + tags.daydata[dayIndex][tagIndex]);	
	 		}
	 	}

		// Build the output for file
		for(var dayIndex in output_tag_data.daydata){
			dump_tag_data_day += dayIndex + ',';
			for(var ti in output_tag_data.daydata[dayIndex]){
				dump_tag_data_day +=  output_tag_data.daydata[dayIndex][ti] + ',';
			}	
			dump_tag_data_day = dump_tag_data_day.substring(0, dump_tag_data_day.length - 1)
			dump_tag_data_day +=  "\n";
		}
	 	filehandler.save('tag_volume_by_day.csv', dump_tag_data_day);
	 	
	 	
	 	
	 	 
	 	/*
	 	 * HOUR VOLUME DATA
	 	 */ 
		output_tag_data.hourdata = {};
		for(var hourIndex in tags.hourdata){
			output_tag_data.hourdata[hourIndex] = output_tag_data.hourdata[hourIndex] || _.clone(default_tag_obj);			
	 		for(var tagHourIndex in tags.hourdata[hourIndex]){
	 			output_tag_data.hourdata[hourIndex][tagHourIndex] = tags.hourdata[hourIndex][tagHourIndex];
	 			//console.log(dayIndex + ' : ' + tagIndex + ' - ' + tags.daydata[dayIndex][tagIndex]);	
	 		}
	 	}
	 	
		// Build the output for file	 	
		for(var hourIndex in output_tag_data.hourdata){
			dump_tag_data_hour += hourIndex + ',';
			for(var ti in output_tag_data.hourdata[hourIndex]){
				dump_tag_data_hour +=  output_tag_data.hourdata[hourIndex][ti] + ',';
			}	
			dump_tag_data_hour = dump_tag_data_hour.substring(0, dump_tag_data_hour.length - 1)
			dump_tag_data_hour +=  "\n";
		}
	 	filehandler.save('tag_volume_by_hour.csv', dump_tag_data_hour);
	 	
	 	
	 	
	 	/*
	 	 * MINUTE VOLUME DATA
	 	 */ 
		output_tag_data.minutedata = {};
		for(var minuteIndex in tags.minutedata){
			output_tag_data.minutedata[minuteIndex] = output_tag_data.minutedata[minuteIndex] || _.clone(default_tag_obj);			
	 		for(var tagminuteIndex in tags.minutedata[minuteIndex]){
	 			output_tag_data.minutedata[minuteIndex][tagminuteIndex] = tags.minutedata[minuteIndex][tagminuteIndex];
	 		}
	 	}
	 	
		// Build the output for file	 	
		for(var minuteIndex in output_tag_data.minutedata){
			dump_tag_data_minute += minuteIndex + ',';
			for(var ti in output_tag_data.minutedata[minuteIndex]){
				dump_tag_data_minute +=  output_tag_data.minutedata[minuteIndex][ti] + ',';
			}	
			dump_tag_data_minute = dump_tag_data_minute.substring(0, dump_tag_data_minute.length - 1)
			dump_tag_data_minute +=  "\n";
		}
	 	filehandler.save('tag_volume_by_minute.csv', dump_tag_data_minute);
	}
  },  
  

  renderLongLat : function() {
		if(geo.length !== undefined){
			var dump_geo = "Latitude,Longitude\n";
			
			geo.forEach( function(ll) { 
			     dump_geo += ll  + "\n";
			} )
			
			filehandler.save('geo_latitude_longitude.csv', dump_geo);
			dump_geo = '';
		}
  },	

};
