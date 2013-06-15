'use strict';

module.exports = {

	/*
	 * Example influencer model
	 * 	 - build a list of all users who were retweeted
	 *		For each of these users, store: 	
	 * 		- retweet count
	 * 		- followers count
	 * 		- mentions count
	 * 		- replies count
	 * 
	 */
	putInfluencerModel : function(data) {

		influencers.samplemodel = influencers.samplemodel || {};
		
		// Retweeted users
		if (data.twitter !== undefined && data.twitter.retweeted !== undefined && data.twitter.retweeted.user !== undefined && data.twitter.retweeted.user.screen_name !== undefined && data.twitter.retweeted.user.followers_count !== undefined ){
		
			influencers.samplemodel[data.twitter.retweeted.user.screen_name] = influencers.samplemodel[data.twitter.retweeted.user.screen_name] || {};
			influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount = influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount || 0;
			influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount ++;
			
			// Save the real name if we have it
			if(data.twitter.retweeted.user.name !== undefined){
				influencers.samplemodel[data.twitter.retweeted.user.screen_name].name = influencers.samplemodel[data.twitter.retweeted.user.screen_name].name || data.twitter.retweeted.user.name;
			} else {
				influencers.samplemodel[data.twitter.retweeted.user.screen_name].name = influencers.samplemodel[data.twitter.retweeted.user.screen_name].name || 'Undefined';
			}
			
			// Save the followers count
			influencers.samplemodel[data.twitter.retweeted.user.screen_name].followersCount = influencers.samplemodel[data.twitter.retweeted.user.screen_name].followersCount || data.twitter.retweeted.user.followers_count;
			
			// Set a default mentions count to be aggregated later
			influencers.samplemodel[data.twitter.retweeted.user.screen_name].mentionsCount = 0;
			
			// Set a default replies count to be aggregated later
			influencers.samplemodel[data.twitter.retweeted.user.screen_name].repliesCount = 0;
		}
		

		// Mentions		
		if(data.interaction !== undefined && data.interaction.mentions !== undefined){		
			for(var mentionName in data.interaction.mentions){
				infMentions.push(data.interaction.mentions[mentionName]);
			}				
		}
		
		// Replies
		if(data.twitter !== undefined && data.twitter.in_reply_to_screen_name !== undefined){
			infReplies.push(data.twitter.in_reply_to_screen_name);			
		}

	},


	// retweeter, retweeted - combination volume
	putRetweetRetweeted : function(data) {
		
		// Record retweet user id against retweeted user id	
		if (data.twitter !== undefined && data.twitter.retweet !== undefined && data.twitter.retweet.user !== undefined && data.twitter.retweet.user.screen_name !== undefined 
			&& data.twitter.retweeted !== undefined && data.twitter.retweeted.user !== undefined && data.twitter.retweeted.user.screen_name !== undefined) {
			
			
			influencers.retweeted = influencers.retweeted || {};
			influencers.retweeted[data.twitter.retweet.user.screen_name] = influencers.retweeted[data.twitter.retweet.user.screen_name] || {};
			influencers.retweeted[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] = influencers.retweeted[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] || 0;
			influencers.retweeted[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] ++; 
		}
	},
	
	
	// Extract Twitter user id's with Tags
	putTwitterIdsAndTags : function(data) {
		
		// Save the user id
		if (data.twitter === undefined || data.twitter.user === undefined || data.twitter.user.id === undefined) return;
		
		twitter[data.twitter.user.id] = twitter[data.twitter.user.id] || {};
		
		
		// Save any tags for each user
		if(data.interaction === undefined || data.interaction.tags === undefined || data.interaction.created_at === undefined) return;
		
		twitter.tags = twitter.tags || {};
		
		for(var tag in data.interaction.tags){
	  		var eachTag = data.interaction.tags[tag];
	  		twitter.tags[eachTag] = twitter.tags[eachTag] || {}; 
	  		twitter.tags[eachTag].users = twitter.tags[eachTag].users || {};
	  		twitter.tags[eachTag].users[data.twitter.user.id] = data.twitter.user.id;
	  	}
		
	}
};
