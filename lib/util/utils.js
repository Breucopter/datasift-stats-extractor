var fs = require('fs')

fileCache = {};

module.exports = {


  /*
   * cleanString - Remove all non alpha-numeric characters 
   * @param - string
   * @return - string
   * 
   */			
  cleanString: function (string) {

  	if(string === undefined || typeof(string) !== 'string') return;
 
 		// Clean URL's'		
  	string = string.replace(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,'')
 		// Only alpha numeric
 		string = string.replace(/[^a-zA-Z 0-9]+/g,'');
    
    return string;
  },

  
  /*
   * cleanStopWords
   * 
   * @param - string
   * @return - Array
   * 
   */			
  cleanStopWords: function (string) {

		var out = new Array();
  	var stop_words = new Array('a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'arent', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'became', 'because', 'become', 'becomes', 'been', 'before', 'began', 'behind', 'being', 'beings', 'below', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cant', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'couldnt', 'd', 'did', 'didnt', 'differ', 'different', 'differently', 'do', 'does', 'doesnt', 'doing', 'dont', 'done', 'down', 'downed', 'downing', 'downs', 'during', 'e', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'hows', 'however', 'i', 'id', 'ill', 'im', 'ive', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'isnt', 'it', 'its', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'mustnt', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'newer', 'newest', 'next', 'no', 'nobody', 'non', 'noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'ought', 'our', 'ours ', 'ourselves', 'out', 'over', 'own', 'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'room', 'rooms', 'rt', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems', 'sees', 'several', 'shall', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'such', 'sure', 't', 'take', 'taken', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'therefore', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'wasnt', 'way', 'ways', 'we', 'wed', 'well', 'were', 'weve', 'well', 'wells', 'went', 'were', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'whether', 'which', 'while', 'who', 'whos', 'whole', 'whom', 'whose', 'why', 'whys', 'will', 'with', 'within', 'without', 'wont', 'work', 'worked', 'working', 'works', 'would', 'wouldnt', 'x', 'y', 'year', 'years', 'yet', 'you', 'youd', 'youll', 'youre', 'youve', 'young', 'younger', 'youngest', 'your', 'yours', 'yourself', 'yourselves', 'z', 'de', 'que', 'la', 'ya', 'el', 'en', 'lol', 'yg', 'di', 'love', 'aku', 'haha', 'lo', 'tu', 'un', 'te', 'si', 'es', 'je', 'ur', 'se', 'mi', 'ada', 'le', 'ini', 'itu')	
	
  	// JavaScript 1.6 array filter
  	var filtered  = string.toLowerCase().split( /\b/ ).filter( function( v ){
    	return stop_words.indexOf( v ) == -1;
  	});

		filtered.forEach(function(item) {
			// Check if a string is blank, null or undefined or just numbers e.g. '76876589'
			if(item && !/^\s*$/.test(item) && !/^\d+$/.test(item))
			  out.push(item);
		});

		return out;
  },
  
    
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


removeStopWords: function(cleansed_string) {
	var x;
	var y;
	var word;
	var stop_word;
	var regex_str;
	var regex;
	var stop_words = new Array(
		'a',
		'about',
		'above',
		'across',
		'after',
		'again',
		'against',
		'all',
		'almost',
		'alone',
		'along',
		'already',
		'also',
		'although',
		'always',
		'among',
		'an',
		'and',
		'another',
		'any',
		'anybody',
		'anyone',
		'anything',
		'anywhere',
		'are',
		'area',
		'areas',
		'around',
		'as',
		'ask',
		'asked',
		'asking',
		'asks',
		'at',
		'away',
		'b',
		'back',
		'backed',
		'backing',
		'backs',
		'be',
		'became',
		'because',
		'become',
		'becomes',
		'been',
		'before',
		'began',
		'behind',
		'being',
		'beings',
		'best',
		'better',
		'between',
		'big',
		'both',
		'but',
		'by',
		'c',
		'came',
		'can',
		'cannot',
		'case',
		'cases',
		'certain',
		'certainly',
		'clear',
		'clearly',
		'come',
		'could',
		'd',
		'did',
		'differ',
		'different',
		'differently',
		'do',
		'does',
		'done',
		'down',
		'down',
		'downed',
		'downing',
		'downs',
		'during',
		'e',
		'each',
		'early',
		'either',
		'end',
		'ended',
		'ending',
		'ends',
		'enough',
		'even',
		'evenly',
		'ever',
		'every',
		'everybody',
		'everyone',
		'everything',
		'everywhere',
		'f',
		'face',
		'faces',
		'fact',
		'facts',
		'far',
		'felt',
		'few',
		'find',
		'finds',
		'first',
		'for',
		'four',
		'from',
		'full',
		'fully',
		'further',
		'furthered',
		'furthering',
		'furthers',
		'g',
		'gave',
		'general',
		'generally',
		'get',
		'gets',
		'give',
		'given',
		'gives',
		'go',
		'going',
		'good',
		'goods',
		'got',
		'great',
		'greater',
		'greatest',
		'group',
		'grouped',
		'grouping',
		'groups',
		'h',
		'had',
		'has',
		'have',
		'having',
		'he',
		'her',
		'here',
		'herself',
		'high',
		'high',
		'high',
		'higher',
		'highest',
		'him',
		'himself',
		'his',
		'how',
		'however',
		'i',
		'if',
		'important',
		'in',
		'interest',
		'interested',
		'interesting',
		'interests',
		'into',
		'is',
		'it',
		'its',
		'itself',
		'j',
		'just',
		'k',
		'keep',
		'keeps',
		'kind',
		'knew',
		'know',
		'known',
		'knows',
		'l',
		'large',
		'largely',
		'last',
		'later',
		'latest',
		'least',
		'less',
		'let',
		'lets',
		'like',
		'likely',
		'long',
		'longer',
		'longest',
		'm',
		'made',
		'make',
		'making',
		'man',
		'many',
		'may',
		'me',
		'member',
		'members',
		'men',
		'might',
		'more',
		'most',
		'mostly',
		'mr',
		'mrs',
		'much',
		'must',
		'my',
		'myself',
		'n',
		'necessary',
		'need',
		'needed',
		'needing',
		'needs',
		'never',
		'new',
		'new',
		'newer',
		'newest',
		'next',
		'no',
		'nobody',
		'non',
		'noone',
		'not',
		'nothing',
		'now',
		'nowhere',
		'number',
		'numbers',
		'o',
		'of',
		'off',
		'often',
		'old',
		'older',
		'oldest',
		'on',
		'once',
		'one',
		'only',
		'open',
		'opened',
		'opening',
		'opens',
		'or',
		'order',
		'ordered',
		'ordering',
		'orders',
		'other',
		'others',
		'our',
		'out',
		'over',
		'p',
		'part',
		'parted',
		'parting',
		'parts',
		'per',
		'perhaps',
		'place',
		'places',
		'point',
		'pointed',
		'pointing',
		'points',
		'possible',
		'present',
		'presented',
		'presenting',
		'presents',
		'problem',
		'problems',
		'put',
		'puts',
		'q',
		'quite',
		'r',
		'rather',
		'really',
		'right',
		'right',
		'room',
		'rooms',
		's',
		'said',
		'same',
		'saw',
		'say',
		'says',
		'second',
		'seconds',
		'see',
		'seem',
		'seemed',
		'seeming',
		'seems',
		'sees',
		'several',
		'shall',
		'she',
		'should',
		'show',
		'showed',
		'showing',
		'shows',
		'side',
		'sides',
		'since',
		'small',
		'smaller',
		'smallest',
		'so',
		'some',
		'somebody',
		'someone',
		'something',
		'somewhere',
		'state',
		'states',
		'still',
		'still',
		'such',
		'sure',
		't',
		'take',
		'taken',
		'than',
		'that',
		'the',
		'their',
		'them',
		'then',
		'there',
		'therefore',
		'these',
		'they',
		'thing',
		'things',
		'think',
		'thinks',
		'this',
		'those',
		'though',
		'thought',
		'thoughts',
		'three',
		'through',
		'thus',
		'to',
		'today',
		'together',
		'too',
		'took',
		'toward',
		'turn',
		'turned',
		'turning',
		'turns',
		'two',
		'u',
		'under',
		'until',
		'up',
		'upon',
		'us',
		'use',
		'used',
		'uses',
		'v',
		'very',
		'w',
		'want',
		'wanted',
		'wanting',
		'wants',
		'was',
		'way',
		'ways',
		'we',
		'well',
		'wells',
		'went',
		'were',
		'what',
		'when',
		'where',
		'whether',
		'which',
		'while',
		'who',
		'whole',
		'whose',
		'why',
		'will',
		'with',
		'within',
		'without',
		'work',
		'worked',
		'working',
		'works',
		'would',
		'x',
		'y',
		'year',
		'years',
		'yet',
		'you',
		'young',
		'younger',
		'youngest',
		'your',
		'yours',
		'z'
	)

	// Split out all the individual words in the phrase
	words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

	// Review all the words
	for(x=0; x < words.length; x++) {
		// For each word, check all the stop words
		for(y=0; y < stop_words.length; y++) {
			// Get the current word
			word = words[x].replace(/\s+|[^a-z]+/ig, "");	// Trim the word and remove non-alpha

			// Get the stop word
			stop_word = stop_words[y];

			// If the word matches the stop word, remove it from the keywords
			if(word.toLowerCase() == stop_word) {
				// Build the regex
				regex_str = "^\\s*"+stop_word+"\\s*$";		// Only word
				regex_str += "|^\\s*"+stop_word+"\\s+";		// First word
				regex_str += "|\\s+"+stop_word+"\\s*$";		// Last word
				regex_str += "|\\s+"+stop_word+"\\s+";		// Word somewhere in the middle
				regex = new RegExp(regex_str, "ig");

				// Remove the word from the keywords
				cleansed_string = cleansed_string.replace(regex, " ");
			}
		}
	}
	
	return cleansed_string.replace(/^\s+|\s+$/g, "");
}






};
