'use strict';

var utils = require('../util/utils.js');

module.exports = {


  putDemographics : function(data) { 	
    if(data.interaction !== undefined && data.demographic !== undefined){
    	
    	//console.log(JSON.stringify(data.demographic.main_street));
    	//console.log();
    	
    	// Gender
    	if(data.demographic.gender !== undefined) {
    		demographics.gender = demographics.gender || {};
    		demographics.gender[data.demographic.gender] = demographics.gender[data.demographic.gender] || 0;
    		demographics.gender[data.demographic.gender] ++;	
    	}
    	
    	// First Language
    	if(data.demographic.first_language !== undefined) {
    		demographics.first_language = demographics.first_language || {};
    		demographics.first_language[data.demographic.first_language] = demographics.first_language[data.demographic.first_language] || 0;
    		demographics.first_language[data.demographic.first_language] ++;	
    	}

		// Age range
		if(data.demographic.age_range !== undefined) {
			
			if(data.demographic.age_range.start !== undefined && data.demographic.age_range.end !== undefined){
				demographics.range = demographics.range || {};
				demographics.range[data.demographic.age_range.start + ' to ' + data.demographic.age_range.end] = demographics.range[data.demographic.age_range.start + ' to ' + data.demographic.age_range.end] || 0;
				demographics.range[data.demographic.age_range.start + ' to ' + data.demographic.age_range.end] ++;
				
			}
			
		}
		
		// Large Twitter Accounts
		if(data.demographic.twitter !== undefined && data.demographic.twitter.accounts !== undefined && data.demographic.twitter.accounts.large !== undefined) {
						
			for(var lrgAcctsIndex in data.demographic.twitter.accounts.large){
				if(data.demographic.twitter.accounts.large[lrgAcctsIndex] !== undefined && data.demographic.twitter.accounts.large[lrgAcctsIndex] !== ''){
					demographics.large_accounts = demographics.large_accounts || {};
					demographics.large_accounts[data.demographic.twitter.accounts.large[lrgAcctsIndex]] = demographics.large_accounts[data.demographic.twitter.accounts.large[lrgAcctsIndex]] || 0;
					demographics.large_accounts[data.demographic.twitter.accounts.large[lrgAcctsIndex]] ++;			
				}	
			}	
		
		}

		// Large Twitter Account Categories
		if(data.demographic.accounts !== undefined && data.demographic.accounts.categories !== undefined) {

			for(var accCatIndex in data.demographic.accounts.categories){
				
				if(data.demographic.accounts.categories[accCatIndex] !== undefined && data.demographic.accounts.categories[accCatIndex] !== ''){

					demographics.large_accounts_categories = demographics.large_accounts_categories || {};
					demographics.large_accounts_categories[data.demographic.accounts.categories[accCatIndex]] = demographics.large_accounts_categories[data.demographic.accounts.categories[accCatIndex]] || 0;
					demographics.large_accounts_categories[data.demographic.accounts.categories[accCatIndex]] ++;			
				}	
			}	
		
		}
		
		// Likes and Interests
		if(data.demographic.likes_and_interests !== undefined) {
						
			for(var likesIndex in data.demographic.likes_and_interests){
				if(data.demographic.likes_and_interests[likesIndex] !== undefined && data.demographic.likes_and_interests[likesIndex] !== ''){
					demographics.likes_interests = demographics.likes_interests || {};
					demographics.likes_interests[data.demographic.likes_and_interests[likesIndex]] = demographics.likes_interests[data.demographic.likes_and_interests[likesIndex]] || 0;
					demographics.likes_interests[data.demographic.likes_and_interests[likesIndex]] ++;			
				}	
			}
		
		}
		
		// Twiter Activity
		if(data.demographic.twitter !== undefined && data.demographic.twitter.activity !== undefined  && data.demographic.twitter.activity !== '') {

			demographics.twitter_activity = demographics.twitter_activity || {};
			demographics.twitter_activity[data.demographic.twitter.activity] = demographics.twitter_activity[data.demographic.twitter.activity] || 0;
			demographics.twitter_activity[data.demographic.twitter.activity] ++;			
		
		}		
		

		
		/*
		// Location
		if(data.demographic.location !== undefined) {
			
			if(data.demographic.location.country !== undefined) {
				demographics.location_country = demographics.location_country || {};
    			demographics.location_country[data.demographic.location.country] = demographics.location_country[data.demographic.location.country] || 0;
	    		demographics.location_country[data.demographic.location.country] ++;
			}
			
			if(data.demographic.location.city !== undefined) {
				demographics.location_city = demographics.location_city || {};
    			demographics.location_city[data.demographic.location.city] = demographics.location_city[data.demographic.location.city] || 0;
	    		demographics.location_city[data.demographic.location.city] ++;
			}	
			
		}	
 */
	}
 	
  },
    
};
