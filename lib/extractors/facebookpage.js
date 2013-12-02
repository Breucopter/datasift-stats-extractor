'use strict';

var utils = require('../util/utils.js');

module.exports = {

  // Aggregate facebook page types
  putTypes : function(data) {
		
		if(data.facebook_page !== undefined && data.facebook_page.type !== undefined){
			facebookpage.type = facebookpage.type || {};
			facebookpage.type[data.facebook_page.type] = facebookpage.type[data.facebook_page.type] || 0;
			facebookpage.type[data.facebook_page.type] ++;
		}
  	 	
  		
  },

};
