'use strict';

module.exports = {

	putLocations : function(data) {
		if (data.interaction !== undefined && data.salience !== undefined && data.salience.content !== undefined && data.salience.content.entities !== undefined) {
			for (var x in data.salience.content.entities) {
				//console.log(data.salience.content.entities[x]);
				if (data.salience.content.entities[x].type === 'Place') {
					salience.locations = salience.locations || {};
					salience.locations[data.salience.content.entities[x].name] = salience.locations[data.salience.content.entities[x].name] || {};
					salience.locations[data.salience.content.entities[x].name].count = salience.locations[data.salience.content.entities[x].name].count || 1;
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
