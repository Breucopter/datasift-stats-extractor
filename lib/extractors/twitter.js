'use strict';

module.exports = {

	putInfluencer : function(data) {

		if (data.twitter !== undefined && data.twitter.retweet !== undefined && data.twitter.retweet.user !== undefined && data.twitter.retweet.user.screen_name !== undefined && data.twitter.retweeted !== undefined && data.twitter.retweeted.user !== undefined && data.twitter.retweeted.user.screen_name !== undefined) {
			
			influencers[data.twitter.retweet.user.screen_name] = influencers[data.twitter.retweet.user.screen_name] || {};
			influencers[data.twitter.retweet.user.screen_name].retweeted = influencers[data.twitter.retweet.user.screen_name].retweeted || data.twitter.retweeted.user.screen_name;
			influencers[data.twitter.retweet.user.screen_name].count = influencers[data.twitter.retweet.user.screen_name].count || 0;
			influencers[data.twitter.retweet.user.screen_name].count ++;
		}
	},
	
	
	// Extract Twitter user id's with Tags
	putTwitterIdsAndTags : function(data) {
		
		// Save the user id
		if (data.twitter === undefined || data.twitter.user === undefined || data.twitter.user.id === undefined) return;
		
		twitter[data.twitter.user.id] = twitter[data.twitter.user.id] || {};
		
		
		// Save any tags for each user
		if(data.interaction === undefined || data.interaction.tags === undefined || data.interaction.created_at === undefined) return;
		
		
		twitter[data.twitter.user.id].tags = twitter[data.twitter.user.id].tags || {};
		
		for(var tag in data.interaction.tags){
	  		var eachTag = data.interaction.tags[tag];	
	  		
	  		twitter[data.twitter.user.id].tags[eachTag] = eachTag;
	  	}
		
	}
};
