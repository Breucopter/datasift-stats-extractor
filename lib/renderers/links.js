'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

  renderUrlDomains : function() {

	  // URL Volume
  	if(utils.isEmpty(links.url) === false){
  		
  		// Re-order
		links.url = utils.orderObject(links.url, 'count');
	    var dump_urls = "URL,Title,Volume\n";
	  	
		for(var urlIndex in links.url){
	  		dump_urls += '"' + urlIndex + '","' + links.url[urlIndex].title + '",' + links.url[urlIndex].count  + "\n";
	 	}
		filehandler.save('links_url_volume.csv', dump_urls);
		dump_urls = null;
		
	}	

  	// Domain Volume
  	if(utils.isEmpty(links.domain) === false){
  		// Re-order
		links.domain = utils.orderObject(links.domain);
	  var dump_domains = "Domain,Volume\n";

		for(var domainIndex in links.domain){
	  		dump_domains += domainIndex + ',' + links.domain[domainIndex]  + "\n";
	 	}
		filehandler.save('links_domain_volume.csv', dump_domains);
		dump_domains = null;
	 }	
	     
  },
  
};
