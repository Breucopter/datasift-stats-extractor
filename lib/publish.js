'use strict';
var wintersmith = require('wintersmith');

module.exports = {

  render: function () {

	var options = {
	  'output': './output',
	  'contents': './lib/webapp/contents',
	  'templates': './lib/webapp/templates',
	  'locals': { config: config, tags: tags, stats: stats, demographics: demographics, links: links, salience: salience, hashtags: hashtags, timestamps: timestamps, title: "DataSift Sample Data" }
	};
	
	wintersmith(options, function(error) {
	  if (error) {
	    throw error;
	  } else {
	    console.log('Webapp successfully exported.');
	  }
	});
	


  },

};





