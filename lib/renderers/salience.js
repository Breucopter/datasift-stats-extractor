'use strict';
var utils 			= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');


module.exports = {


	renderSentiment : function() {

		if(utils.isEmpty(salience.sentiment) === false){
			
			// SENTIMENT by day
			var dump_sent_day = "date_time,average_sentiment\n";
			for(var dayIndex in salience.sentiment.daydata){
		  		dump_sent_day += dayIndex + ',' + salience.sentiment.daydata[dayIndex].mean.toFixed(2)  + "\n";
		 	}
			filehandler.save('sentiment_by_day.csv', dump_sent_day);

		
			// SENTIMENT by hour
			var dump_sent_hour = "date_time,average_sentiment\n";
			for(var hourIndex in salience.sentiment.hourdata){
		  		dump_sent_hour += hourIndex + ',' + salience.sentiment.hourdata[hourIndex].mean.toFixed(2)  + "\n";
		 	}
			filehandler.save('sentiment_by_hour.csv', dump_sent_hour);
		
		
			// SENTIMENT by minute
			var dump_sent_minute = "date_time,average_sentiment\n";
			for(var minuteIndex in salience.sentiment.minutedata){
		  		dump_sent_minute += minuteIndex + ',' + salience.sentiment.minutedata[minuteIndex].mean.toFixed(2)  + "\n";
		 	}
			filehandler.save('sentiment_by_minute.csv', dump_sent_minute);

		}	
	
	
	},
	
	
	renderLocations : function() {
	  	// Entity Locations and sentiment
	  	if(utils.isEmpty(salience.locations) === false){
		  	var dump_salience_locations = '';
		  	dump_salience_locations += 'Location,Volume,Sentiment' + "\n";
		  	for(var entLoc in salience.locations){
		  		dump_salience_locations += '"' + entLoc + '",' + salience.locations[entLoc].count + ',' + utils.calculateAverage(salience.locations[entLoc].sentiment) + "\n";
		 	}
			filehandler.save('salience_entity_locations.csv', dump_salience_locations);
			dump_salience_locations = null;
		}	

	},
	
	
	renderTopics : function() {
	  	if(utils.isEmpty(salience.topics) === false){
		  	var dump_salience_topics = '';
		  	dump_salience_topics += 'Topic,Volume' + "\n";
		  	
		  	var ordered_topics = utils.orderObject(salience.topics);
		  	
		  	for(var topicIndex in ordered_topics){
		  		dump_salience_topics += '"' + topicIndex + '",' + ordered_topics[topicIndex] + "\n";
		 	}
			filehandler.save('salience_topics.csv', dump_salience_topics);
			dump_salience_topics = null;
		 }		
	}	

};
