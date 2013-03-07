'use strict';
var utils = require('../util/utils.js');
module.exports = {

  putUrlDomains : function(data) {
    if(data.interaction !== undefined && data.links !== undefined && data.links.url !== undefined  && data.links.title !== undefined){

	 // URL's'
	 var title = data.links.title.toString().replace(/,/g, '');
	 
	 links.url = links.url || {};
	 links.url[data.links.url] = links.url[data.links.url] || {};
	 links.url[data.links.url].title = links.url[data.links.url].title || title;
	 links.url[data.links.url].count = links.url[data.links.url].count || 0;
	 links.url[data.links.url].count ++;	
	 
	 // Domain names
	 var domain = utils.getDomain(data.links.url)
	 if(typeof(domain) === undefined)
	 	return

	 links.domain = links.domain || {};
	 links.domain[domain] = links.domain[domain] || 0;
	 links.domain[domain] ++;
    }
  },
  
};
