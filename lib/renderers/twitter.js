'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

	renderInfluencer : function(data) {
		// Retweet influencers
		if(utils.isEmpty(influencers) === false){
		  	var dump_retweet_influencer = '';
		  	dump_retweet_influencer += 'retweet.user,retweeted.user,volume' + "\n";
						
			for(var infIndex in influencers){
		  		for(var eachRetweeted in influencers[infIndex]){
		  			if(influencers[infIndex][eachRetweeted] > 1){
		  				dump_retweet_influencer +=  infIndex + ',' + eachRetweeted + ',' + influencers[infIndex][eachRetweeted]  + "\n";
		  			}	
		  		}	
		 	}

			filehandler.save('influencers_retweet.csv', dump_retweet_influencer);
			dump_retweet_influencer = null;	
		}

	},
	
	
	renderTwitterIds : function() {

	  	if(utils.isEmpty(twitter) === false){
		  	var dump_twitterid = 'Twitter_ID' + "\n";
		  	for(var twitterid in twitter){
		  		dump_twitterid += twitterid + '\n';
		 	}
			filehandler.save('twitter_user_ids.csv', dump_twitterid);
		}	

	},

	
	// tag and twitter user id's
	// TODO: refactor with tag dir's
	renderTwitterIdTags : function() {
	  	if(utils.isEmpty(twitter.tags) === false){
		  	var dump_twitterid_tags = 'Tag,Twitter_ID' + "\n";
		  	for(var tag in twitter.tags){	
		  		for(var userid in twitter.tags[tag].users){
		  			dump_twitterid_tags += '"' + tag + '",' +  userid + '\n';
		  		}
		 	}
			filehandler.save('tag_twitter_userid.csv', dump_twitterid_tags);
		}	
	},	
};
