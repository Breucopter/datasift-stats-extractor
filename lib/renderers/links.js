'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

  renderUrlDomains : function() {
	  
	  // URL Volume
  	if(utils.isEmpty(links.url) === false){
		  var dump_urls = "URL,Title,Volume\n";
		  var ordered_urls = utils.orderObject(links.url);
		  	
			for(var urlIndex in ordered_urls){
		  		dump_urls += '"' + urlIndex + '","' + ordered_urls[urlIndex].title + '",' + ordered_urls[urlIndex].count  + "\n";
		 	}
			filehandler.save('url_volume.csv', dump_urls);
			dump_urls = null;
			ordered_urls = null;
		}	

  	// Domain Volume
  	if(utils.isEmpty(links.domain) === false){
	  	var dump_domains = "Domain,Volume\n";
	  	var ordered_domains = utils.orderObject(links.domain);
	  	
		for(var domainIndex in ordered_domains){
	  		dump_domains += domainIndex + ',' + ordered_domains[domainIndex]  + "\n";
	 	}
		filehandler.save('domain_volume.csv', dump_domains);
		dump_domains = null;
		ordered_domains = null;	
	 }	
	     
  },
  
};
