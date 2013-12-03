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

  // Aggregate volumes for each page
  putPages : function(data) {
		
		if(data.facebook_page !== undefined && data.facebook_page.page !== undefined && data.facebook_page.page.name !== undefined && data.facebook_page.page.username !== undefined  && data.facebook_page.page.link !== undefined && data.facebook_page.type !== undefined ){

			facebookpage.pages	= facebookpage.pages	|| {};
			facebookpage.pages[data.facebook_page.page.username]				= facebookpage.pages[data.facebook_page.page.username]				|| {};
			facebookpage.pages[data.facebook_page.page.username].types 	= facebookpage.pages[data.facebook_page.page.username].types 	|| {};
			facebookpage.pages[data.facebook_page.page.username].types[data.facebook_page.type] = facebookpage.pages[data.facebook_page.page.username].types[data.facebook_page.type] || 0;
			facebookpage.pages[data.facebook_page.page.username].types[data.facebook_page.type] ++;
			facebookpage.pages[data.facebook_page.page.username].name 	= facebookpage.pages[data.facebook_page.page.username].name 	|| data.facebook_page.page.name;
			facebookpage.pages[data.facebook_page.page.username].link 	= facebookpage.pages[data.facebook_page.page.username].link 	|| data.facebook_page.page.link;
			facebookpage.pages[data.facebook_page.page.username].count 	= facebookpage.pages[data.facebook_page.page.username].count 	|| 0;
			facebookpage.pages[data.facebook_page.page.username].count ++;

		}	
  },


};
