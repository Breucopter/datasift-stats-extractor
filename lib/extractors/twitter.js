'use strict';

module.exports = {

	putInfluencer : function(data) {

		if (data.twitter !== undefined && data.twitter.retweet !== undefined && data.twitter.retweet.user !== undefined && data.twitter.retweet.user.screen_name !== undefined && data.twitter.retweeted !== undefined && data.twitter.retweeted.user !== undefined && data.twitter.retweeted.user.screen_name !== undefined) {
			
			influencers[data.twitter.retweet.user.screen_name] = influencers[data.twitter.retweet.user.screen_name] || {};
			influencers[data.twitter.retweet.user.screen_name].retweeted = influencers[data.twitter.retweet.user.screen_name].retweeted || data.twitter.retweeted.user.screen_name;
			influencers[data.twitter.retweet.user.screen_name].count = influencers[data.twitter.retweet.user.screen_name].count || 0;
			influencers[data.twitter.retweet.user.screen_name].count ++;
		}
		
		

	}
};
