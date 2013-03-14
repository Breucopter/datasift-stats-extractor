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
  * orderObject - order an object by a specified property
  * 
  * @param - object - the object to re-order e.g.. links.url
  * @param - string - optional - the property to order by e.g. 'count' for links.url.count
  * @return object
  * 
  */
  orderObject: function(object, keyName) {

	var sortable = [];
	var returnObj = {}

	Object.keys(object).forEach(function(key){
		sortable.push({key: key, value: object[key]});
	});

	sortable.sort(function(a, b) {
		
		// No count field supplied so use the index value itself
		if(typeof(keyName) === 'undefined' || typeof(keyName) === undefined ){
		
			if ( isNaN(a.value)&&isNaN(b.value)) return a.value<b.value?-1:a.value==b.value?0:1; // both are string
	        else if (isNaN(a.value)) return 1; // only a is a string
	        else if (isNaN(b.value)) return -1; // only b is a string
	        else return b.value - a.value; // both are num

		} else { // Count field supplied
		
			if ( isNaN(a.value[keyName])&&isNaN(b.value[keyName])) return a.value[keyName]<b.value[keyName]?-1:a.value[keyName]==b.value[keyName]?0:1; // both are string
	        else if (isNaN(a.value[keyName])) return 1; // only a is a string
	        else if (isNaN(b.value[keyName])) return -1; // only b is a string
	        else return b.value[keyName] - a.value[keyName]; // both are num
       }
        
	});

	sortable.forEach(function(item){
		returnObj[item.key] = item.value;
	});
	
	//console.log(returnObj);
	
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
