var vows 	= require('vows'),
    assert 	= require('assert'),
    utils 	= require('../lib/util/utils')
    ;

vows.describe('Utility Functions').addBatch({
    'When creating a tag dir with no name': {
        topic: function () {
        	return utils.createTagDir(); 
        },

        'we get false': function (topic) {
           assert.isFalse (topic);
        }
    },
    
    'When creating a tag dir with an empty name': {
        topic: function () {
        	return utils.createTagDir(''); 
        },

        'we get false': function (topic) {
           assert.isFalse (topic);
        }
    },
    
     'When creating a tag dir with a valid name': {
        topic: function () {
        	return utils.createTagDir('foo'); 
        },

        'we get true': function (topic) {
           assert.isTrue (topic);
        }
    }
    
}).export(module); // Export the Suite

