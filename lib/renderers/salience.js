'use strict';
var utils 			= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');


module.exports = {

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
