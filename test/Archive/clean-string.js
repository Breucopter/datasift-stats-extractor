var utils = require('../lib/util/utils.js');


var string = "Home Loan Oxnard CA \u2013 BEST RATES- Mortgage Lender in Oxnard California: CLICK HERE\u2014\u2014\u2014-http://www.HomeLoanQuickQuote\u2026 http://t.co/EMM7WwXtF4";

console.log('DEBUG: Input: ' + string);

var clean_string 	= utils.cleanString(string);
console.log('DEBUG: Cleaned String: ' + clean_string);

var words_array 	= utils.cleanStopWords(clean_string);
console.log('DEBUG: Word Array: ' + words_array);