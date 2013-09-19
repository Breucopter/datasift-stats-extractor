'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

  renderBitlyReferingDomains : function() {

		if(utils.isEmpty(bitly.referingDomain) === false){
  		
			bitly.referingDomain = utils.orderObject(bitly.referingDomain);
	    var dump_domains = "Domain,Volume\n";
	  	
			for(var domainIndex in bitly.referingDomain){
	  		dump_domains += '"' + domainIndex + '",' + bitly.referingDomain[domainIndex] + "\n";
	 		}
			filehandler.save('bitly_refering_domains.csv', dump_domains);
			dump_domains = null;
		}
	},
  
};
