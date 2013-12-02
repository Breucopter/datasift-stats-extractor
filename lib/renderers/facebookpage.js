'use strict';
var utils 				= require('../util/utils.js');
var filehandler 	= require('../util/filehandler.js');

module.exports = {


  renderPageTypes : function() {

	  // Page types
  	if(utils.isEmpty(facebookpage) === false){
  		
  		var total = 0;
		 	
			for(var pIndex in facebookpage.type){
		  		total += facebookpage.type[pIndex];
		 	}
		 		
		 	var dump_words = "Page_Type,Volume,Percentage\n";
			for(var typeIndex in facebookpage.type){
		  		dump_words += '"' + typeIndex + '",' + facebookpage.type[typeIndex] +  ',' +  (facebookpage.type[typeIndex]/total*100).toFixed(2)  +"\n";
		 	}
			filehandler.save('facebook_page_post_type_volume.csv', dump_words);
			
			}	 
  },
  
    	
  
};
