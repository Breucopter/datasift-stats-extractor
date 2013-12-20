'use strict';
var utils 		= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');

module.exports = {
	
	// Augmentation summary
  renderAugmentationStats : function() {
		if(utils.isEmpty(augmentations) === false){
	  	var dump_words = "Augmentation,Volume\n";
			for(var augIndex in augmentations){
	  		// salience topics/senti/ent will be an object
	  		if(typeof(augmentations[augIndex])=== 'object'){
	  			for(var s in augmentations[augIndex]){
	  				dump_words += '"' + s + '",' + augmentations[augIndex][s] + "\n";
	  			}
	  		} else {
	  			dump_words += '"' + augIndex + '",' + augmentations[augIndex] + "\n";	
	  		}
	 		}
			filehandler.save('augmentations_summary.csv', dump_words);
		}	 
  },
    
};
