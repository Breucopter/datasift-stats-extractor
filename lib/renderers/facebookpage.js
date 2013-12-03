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
			filehandler.save('facebook_page_type_volume.csv', dump_words);
			
			}	 
  },
  
  
	renderPageVolumes : function() {

  	if(utils.isEmpty(facebookpage.pages) === false){
console.log(facebookpage.pages);
			facebookpage.pages = utils.orderObject(facebookpage.pages, 'count');

		  var dump_pages = "Name,Link,Total Volume";
		  var pageTypes = new Array();

		  // Build an array of the page types
		 	for(var pageTypeIndex in facebookpage.pages){
		  		for(var typeIndex in facebookpage.pages[pageTypeIndex].types){
		  			pageTypes.push(typeIndex);
		  		}
		 	}
		  
		  pageTypes.sort();
			
			// Apend the page types to the csv header
		  for (var key in pageTypes) {
				if (key === 'length' || !pageTypes.hasOwnProperty(key)) continue;
			 	dump_pages += pageTypes[key] + ',';
			}
		  	
		  dump_pages += "\n";	
		  	
			for(var pageIndex in facebookpage.pages){
		  		dump_pages += '"' + facebookpage.pages[pageIndex].name + '","' + facebookpage.pages[pageIndex].link + '",' + facebookpage.pages[pageIndex].count;
		  		
		  		// itterate through our ordered array and if we have a match, print the value
		  		for (var k in pageTypes) {

					 	
					 	for(var t in facebookpage.pages[pageIndex].types){
							console.log(t);
							
							if(pageTypes[k] === t){
								console.log(pageTypes[k] + ':' + k);
							}
						
						}
					 	
					}  				
		  		
		  				 	console.log('-----------------');
				  dump_pages += "\n";			
		 	}

			filehandler.save('facebookpage_page_volumes.csv', dump_pages);
			dump_pages = null;	
		}
	},
  
    	
  
};
