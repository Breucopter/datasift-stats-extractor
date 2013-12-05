'use strict';

var utils = require('../util/utils.js');

module.exports = {

  // Aggregate augmentations by type
  putAugmentationStats : function(data) {
  	
  	// Links
		if(data.links){
				augmentations.links = augmentations.links || 0;
				augmentations.links ++;	
		}
		
		// Gender
		if(data.demographic && data.demographic.gender){
			augmentations.gender = augmentations.gender || 0;
			augmentations.gender ++;	
		}	
			
  	// Salience
		if(data.salience){
			
			augmentations.salience	= augmentations.salience || {};
			
			// Sentiment
			if((data.salience.content && data.salience.content.sentiment) || (data.salience.title && data.salience.title.sentiment)){
				augmentations.salience.sentiment = augmentations.salience.sentiment || 0;
				augmentations.salience.sentiment ++;	
  		}
  		
  		// Entities
  		if((data.salience.content && data.salience.content.entities) || (data.salience.title && data.salience.title)){
				augmentations.salience.entities = augmentations.salience.entities || 0;
				augmentations.salience.entities ++;	
  		}

  		// Topics
  		if((data.salience.content && data.salience.content.topics) || (data.salience.title && data.salience.topics)){
				augmentations.salience.topics = augmentations.salience.topics || 0;
				augmentations.salience.topics ++;	
  		}  		
  	 	
		}
  	 	
  },
  
};
