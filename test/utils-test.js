var vows = require('vows'),
    assert = require('assert'),
    data = require('./sample-data')
    ;
console.log(data);

vows.describe('utils').addBatch({                      // Batch
    'An object': {                                      // Context
        'with 3 elements': {                           // Sub-Context
            topic: data,                          // Topic

            'has a length of 3': function (topic) {    // Vow
                assert.equal(topic.length, 3);
            }
        },
        'with zero elements': {                        // Sub-Context
            topic: [],                                 // Topic

            'has a length of 0': function (topic) {    // Vow
                assert.equal(topic.length, 0);
            },
            'returns *undefined*, when `pop()`ed': function (topic) {
                assert.isUndefined(topic.pop());
            }
        }
    }
});