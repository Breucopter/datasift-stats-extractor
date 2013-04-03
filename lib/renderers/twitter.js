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
	
	
	// Render twitter ids and any tags	
	renderTwitterIdTags : function() {

	  	if(utils.isEmpty(twitter) === false){
		  	var dump_twitterid_tags = 'User_ID,Tags' + "\n";
		  	for(var twitterid in twitter){
		  		
		  		// Build a string of tags
		  		var tagstring = '';
		  		for(var tag in twitter[twitterid].tags){
		  			tagstring += '"' + tag + '",';
		  		}	
		  		tagstring = tagstring.slice(0, -1);
		  		
		  		dump_twitterid_tags += twitterid + ',' + tagstring + '\n';
		 	}
			filehandler.save('twitter_user_ids_with_tags.csv', dump_twitterid_tags);
		}	

	},
};
