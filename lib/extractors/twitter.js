'use strict';

module.exports = {

	/*
	 * retweet count
	 * followers count
	 * mentions count
	 * replies count
	 * 
	 */
	putInfluencerModel : function(data) {

		if (data.twitter === undefined || data.twitter.retweeted === undefined || data.twitter.retweeted.user === undefined || data.twitter.retweeted.user.screen_name === undefined || data.twitter.retweeted.user.followers_count === undefined ) return;
		
		influencers.samplemodel = influencers.samplemodel || {};
		influencers.samplemodel[data.twitter.retweeted.user.screen_name] = influencers.samplemodel[data.twitter.retweeted.user.screen_name] || {};
		influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount = influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount || 0;
		influencers.samplemodel[data.twitter.retweeted.user.screen_name].retweetCount ++;
		
		// Followers count
		influencers.samplemodel[data.twitter.retweeted.user.screen_name].followersCount = influencers.samplemodel[data.twitter.retweeted.user.screen_name].followersCount || data.twitter.retweeted.user.followers_count;
		
		// Store all of the mentions for post processing
		
		// setup a holder for when we post process
		influencers.samplemodel[data.twitter.retweeted.user.screen_name].mentionsCount = 0;
		
		if(data.interaction !== undefined && data.interaction.mentions !== undefined){
			influencers.samplemodel.mentions = influencers.samplemodel.mentions || [];			
			for(var mentionName in data.interaction.mentions){
				influencers.samplemodel.mentions.push(data.interaction.mentions[mentionName]);
				//console.log(data.interaction.mentions[mentionName]);
			}				
		}
		
		// Store all of the replies for post processing
		
		influencers.samplemodel[data.twitter.retweeted.user.screen_name].repliesCount = 0;
		
		if(data.twitter.in_reply_to_screen_name !== undefined){
			influencers.samplemodel.replies = influencers.replies || [];
			influencers.samplemodel.replies.push[data.twitter.in_reply_to_screen_name];			
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
