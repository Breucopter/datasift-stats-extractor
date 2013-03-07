'use strict';

module.exports = {

  /*
   * @param - object
   * 
   */			
  getDomain: function (url) {

  	if(typeof(url) !== 'object')
  		return;
  	
  var urlStr 	= url.toString();
	var matches = urlStr.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];

	if(domain === null || domain === '')
  		return;

    return domain.replace('www.', '');    
  },


  /*
   * @param - array
   * 
   */			
  calculateAverage: function (arrayItems) {
    var sum = 0;
	for(var i = 0; i < arrayItems.length; i++){
	    sum += parseInt(arrayItems[i]);
	}
	
	return (sum/arrayItems.length);	
  },
  

  /*
   * createDateObjFromStr
   * 
   * @param - string
   * @return obj
   *  
   */  
  createDateObjFromStr: function(dateString) {

  	try {
		var mSec = Date.parse(dateString);
		return new Date(mSec);
	}
	catch (e) {
  	  	console.log('ERROR: Unable to parse time sting. ' + e);
  	  	return false;
   }
  },


 /*
  * orderObject - order an object
  * 
  * @param object - key value pair
  * @returns object
  * 
  */	
  orderObject: function(object){

  	var sortable = [];
  	var returnObj = {}
  	
  	for(var index in object)
  	  sortable.push([index, object[index]])
 	
 		sortable.sort(function(a, b) {return b[1] - a[1]}) 	
  	
  	for(var y = 0; y < sortable.length; y++)
	  	returnObj[sortable[y][0]] = sortable[y][1];

	return returnObj;
  
  },


 /*
  * extractHashTags - extract any hashtags from a string
  * 
  * @param string
  * @returns array
  * 
  */	
  extractHashTags: function(contentString){

	var matches = contentString.toLowerCase().match(/[#]+[A-Za-z0-9-_]+/g);
	
	if(matches === null){
		return false;
	} else {
		return matches;
	}
 },


 /*
  * isEmpty - check if an object is empty
  * 
  * @param object
  * @returns boolean
  * 
  */	
  isEmpty: function(obj){

	 for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
 },

};
