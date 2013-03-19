'use strict';

var utils = require('../util/utils.js');

module.exports = {

  putLanguage : function(data) { 	
    if(data.language !== undefined && data.language.tag !== undefined){
    	language[data.language.tag] = language[data.language.tag] || 0;
    	language[data.language.tag] ++;    	
	}
 	
  },
    
};
