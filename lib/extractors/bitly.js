'use strict';
var utils = require('../util/utils.js');
module.exports = {

  putRefererDomains : function(data) {
		
		if (data.interaction === undefined || data.bitly === undefined || data.bitly.referring_domain === undefined) return;

		// Strip www. if present
		if(data.bitly.referring_domain.indexOf('www.') != -1){
			data.bitly.referring_domain = data.bitly.referring_domain.replace(/^www\./i,'');
		}
		
		// Merge any Facebook subdomains
		if(data.bitly.referring_domain.indexOf('facebook.com') != -1){
			data.bitly.referring_domain = 'facebook.com';
		}

		bitly.referingDomain = bitly.referingDomain || {};
		bitly.referingDomain[data.bitly.referring_domain] = bitly.referingDomain[data.bitly.referring_domain] || 0;
		bitly.referingDomain[data.bitly.referring_domain] ++;
	 
	}
  
};
