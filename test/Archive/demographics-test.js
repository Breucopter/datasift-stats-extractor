var vows 		= require('vows'),
    assert 	= require('assert'),
		dg 			= require('../lib/extractors/demographics'),
		data 		= require('./demographic-sample-data.js')
    ;


var obj = JSON.parse('{"result":true,"count":1}');

console.log(obj.count);

/*
 * The global object where all demographics output is saved
 *  - see app.js
 */

/*
demographics = {};


vows.describe('Demographic Functions').addBatch({
    'When saving a demographic interaction': {
        topic: function () {
        	dg.putDemographics(data);
        		console.log(demographics)
        	return demographics;
        },

        'we get true': function (topic) {
        	console.log(topic)
           //assert.isTrue (demographics.b4e99eedcdead32cdb4c220482ffd23f);
           assert.isEmpty (demographics);
        }
    },

    
}).export(module); // Export the Suite


*/
