'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

	renderInfluencer : function(data) {
		// Retweet influencers
		if(utils.isEmpty(influencers) === false){
		  	var dump_retweet_influencer = '';
		  	dump_retweet_influencer += 'retweet.user.screen_name,retweeted.user.screen_name,being_retweeted' + "\n";
		  	for(var infIndex in influencers){
		  		dump_retweet_influencer +=  infIndex + ',' + influencers[infIndex].retweeted + ',' + influencers[infIndex].count + "\n";
		 	}
			filehandler.save('influencers_retweet.csv', dump_retweet_influencer);
			dump_retweet_influencer = null;	
		}

	},
};
