'use strict';

module.exports = {

	putRetweetRetweeted : function(data) {
		
		// Record retweet user id against retweeted user id	
		if (data.twitter !== undefined && data.twitter.retweet !== undefined && data.twitter.retweet.user !== undefined && data.twitter.retweet.user.screen_name !== undefined 
			&& data.twitter.retweeted !== undefined && data.twitter.retweeted.user !== undefined && data.twitter.retweeted.user.screen_name !== undefined) {

			influencers[data.twitter.retweet.user.screen_name] = influencers[data.twitter.retweet.user.screen_name] || {};
			influencers[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] = influencers[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] || 0;
			influencers[data.twitter.retweet.user.screen_name][data.twitter.retweeted.user.screen_name] ++; 
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
