'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

	renderInfluencerModel : function() {
		
		// Process and match the mentions
		if (infMentions.length > 0) {
			for (var i = 0; i < infMentions.length; i++) {			    
			    // Check if we have this user in the retweet user list and increment their mention count
			    if(influencers.samplemodel[infMentions[i]] !== undefined){
			    	influencers.samplemodel[infMentions[i]].mentionsCount ++;
			    }
			}
		}	
		

		// Process and match replies
		if (infReplies.length > 0) {
			for (var x = 0; x < infReplies.length; x++) {
				 // Check if we have this user in the retweet user list and increment their reply count
				if(influencers.samplemodel[infReplies[x]] !== undefined){
			    	influencers.samplemodel[infReplies[x]].repliesCount ++;
			    }
			}
		}


		// Build the output file	
		var dump_influencer_example = '';
		dump_influencer_example += 'username,full_name,retweets,followers,mentions,replies' + "\n";
		
		for(var userIndx in influencers.samplemodel){
			if(influencers.samplemodel[userIndx] !== undefined && typeof(influencers.samplemodel[userIndx]) === 'object'){	
				
				dump_influencer_example += userIndx + ','; // twitter handle
				dump_influencer_example += '"' + influencers.samplemodel[userIndx]['name'] + '",'; // full name
				dump_influencer_example += influencers.samplemodel[userIndx]['followersCount'] + ',';
				dump_influencer_example += influencers.samplemodel[userIndx]['mentionsCount'] + ',';
				dump_influencer_example += influencers.samplemodel[userIndx].repliesCount;
				//dump_influencer_example += influencers.samplemodel[userIndx][repliesCount];
				dump_influencer_example += "\n";	
			
			}
		}
		
		filehandler.save('influencers_example_model.csv', dump_influencer_example);
		dump_influencer_example = null;	
		
	},


	renderRetweetRetweeted : function() {
		// Retweet influencers
		if(utils.isEmpty(influencers) === false){
		  	var dump_retweet_influencer = '';
		  	dump_retweet_influencer += 'retweet.user,retweeted.user,volume' + "\n";
						
			for(var infIndex in influencers.retweeted){
		  		for(var eachRetweeted in influencers.retweeted[infIndex]){
		  			if(influencers.retweeted[infIndex][eachRetweeted] > 1){
		  				dump_retweet_influencer +=  infIndex + ',' + eachRetweeted + ',' + influencers.retweeted[infIndex][eachRetweeted]  + "\n";
		  			}	
		  		}	
		 	}

			filehandler.save('influencers_retweeted.csv', dump_retweet_influencer);
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
