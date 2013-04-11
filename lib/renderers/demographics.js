'use strict';
var filehandler 	= require('../util/filehandler.js');
var utils 			= require('../util/utils.js');

module.exports = {

	renderDemographics : function(data) {

		// Gender
		if(utils.isEmpty(demographics.gender) === false){
		  var dump_gender = '';
		  dump_gender += 'gender,volume,percentage_of_total' + "\n";
		  	
		  // Get the total number of gener profiles collected
		  var total_profiles = 0;
		  for(var genTotIndex in demographics.gender){
		  		total_profiles += demographics.gender[genTotIndex];
		  }	

		  for(var genIndex in demographics.gender){
		  	dump_gender +=  genIndex + ',' + demographics.gender[genIndex] + ',' + (demographics.gender[genIndex]/total_profiles*100) + "\n";
		 	}
			filehandler.save('demographics_gender.csv', dump_gender);
			dump_gender = null;	
		}

		// Age Range
		if(utils.isEmpty(demographics.range) === false){
		  	var dump_age_range = '';
		  	dump_age_range += 'age_range,volume' + "\n";
		  	for(var rangeIndex in demographics.range){
		  		dump_age_range +=  rangeIndex + ',' + demographics.range[rangeIndex] + "\n";
		 	}
			filehandler.save('demographics_age_ranges.csv', dump_age_range);
			dump_age_range = null;	
		}
		
		// Twitter large accounts
		if(utils.isEmpty(demographics.large_accounts) === false){
		  	var dump_large_accounts = '';
		  	dump_large_accounts += 'account,volume' + "\n";
		  	
		  	var ordered_large_accounts = utils.orderObject(demographics.large_accounts);
		  	
		  	for(var lrgAcctsIndex in ordered_large_accounts){
		  		dump_large_accounts +=  lrgAcctsIndex + ',' + ordered_large_accounts[lrgAcctsIndex] + "\n";
		 	}
			filehandler.save('demographics_large_accounts.csv', dump_large_accounts);
			dump_large_accounts = null;	
		}
		
		// Twitter large accounts categories
		if(utils.isEmpty(demographics.large_accounts_categories) === false){
		  	var dump_large_accounts_categories = '';
		  	dump_large_accounts_categories += 'category,volume' + "\n";
		  	
		  	var ordered_large_accounts_categories = utils.orderObject(demographics.large_accounts_categories);
		  	
		  	for(var lrgAcctsIndex in ordered_large_accounts_categories){
		  		dump_large_accounts_categories +=  lrgAcctsIndex + ',' + ordered_large_accounts_categories[lrgAcctsIndex] + "\n";
		 	}
			filehandler.save('demographics_large_accounts_categories.csv', dump_large_accounts_categories);
			dump_large_accounts_categories = null;	
		}		

		// likes and interests
		if(utils.isEmpty(demographics.likes_interests) === false){
		  	var dump_likes_interests = '';
		  	dump_likes_interests += 'likes_and_interests,volume' + "\n";
		  	
		  	var ordered_likes_interests = utils.orderObject(demographics.likes_interests);
		  	
		  	for(var lksInterestsIndex in ordered_likes_interests){
		  		dump_likes_interests +=  lksInterestsIndex + ',' + ordered_likes_interests[lksInterestsIndex] + "\n";
		 	}
			filehandler.save('demographics_likes_and_interests.csv', dump_likes_interests);
			dump_large_accounts = null;	
		}
		
		// Twitter Activity
		if(utils.isEmpty(demographics.twitter_activity) === false){
		  	var dump_twitter_activity = '';
		  	dump_twitter_activity += 'frequency,volume' + "\n";
		  	
		  	var ordered_twitter_activity = utils.orderObject(demographics.twitter_activity);
		  	
		  	for(var activityIndex in ordered_twitter_activity){
		  		dump_twitter_activity +=  activityIndex + ',' + ordered_twitter_activity[activityIndex] + "\n";
		 	}
			filehandler.save('demographics_twitter_activity.csv', dump_twitter_activity);
			dump_large_accounts = null;	
		}	
			

	},
};
