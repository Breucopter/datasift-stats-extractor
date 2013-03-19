'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

  renderLanguage : function() {

	  // URL Volume
  	if(utils.isEmpty(language) === false){
  		
  		// Re-order
		language = utils.orderObject(language);
	    var dump_language = "Tag,Volume\n";
	  	
		for(var languageIndex in language){
	  		dump_language += '"' + languageIndex + '","' + language[languageIndex] + "\n";
	 	}
		filehandler.save('language_volume.csv', dump_language);
		
	}	

	     
  },
  
};
