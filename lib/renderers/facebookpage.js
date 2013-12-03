'use strict';
var utils = require('../util/utils.js')
    , filehandler = require('../util/filehandler.js')
    ,  _ = require('underscore')
    ;

module.exports = {

	renderPageVolumes : function() {

  	if(utils.isEmpty(facebookpage.pages) === false){

			facebookpage.pages = utils.orderObject(facebookpage.pages, 'count');

		  var dump_pages = "Name,Link,Volume,Type Summary\n";

			for(var pageIndex in facebookpage.pages){			  
			  var statSting ='';
			  for(var t in facebookpage.pages[pageIndex].types){
          statSting += t + ' (' + facebookpage.pages[pageIndex].types[t] + ')  |  ';
        }
    
        statSting = statSting.slice(0, -5);
		  	dump_pages += '"' + facebookpage.pages[pageIndex].name + '","' + facebookpage.pages[pageIndex].link + '",' + facebookpage.pages[pageIndex].count + ',' + statSting + "\n";      
      }

			filehandler.save('facebookpage_page_volumes.csv', dump_pages);
			dump_pages = null;	
		}
	},
  
    	
  
};
