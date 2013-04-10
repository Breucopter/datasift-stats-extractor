var vows 	= require('vows'),
    assert 	= require('assert'),
	dg = require('../lib/extractors/demographics'),
	data = require('./demographic-sample-data.js')
    ;


/*
 * The global object where all demographics output is saved
 *  - see app.js
 */
demographics = {};


vows.describe('Demographic Functions').addBatch({
    'When saving a demographic interaction': {
        topic: function () {
        	return dg.putDemographics(data);
        },

        'we get true': function () {
           //assert.isTrue (demographics.b4e99eedcdead32cdb4c220482ffd23f);
           assert.isEmpty (demographics);
        }
    },

    
}).export(module); // Export the Suite

