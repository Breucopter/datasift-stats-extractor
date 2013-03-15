
var links =
{ url: 
   { 'http://www.amazon.com/Money-Land-Pruett-Mystery-ebook/dp/B00AT85F3U': 
      { title: 'Money Land: A James Pruett Mystery (Volume 2): R.S. Guthrie Russell Rowland Ares Jun: Amazon.com: Kindle Store',
        count: 8 },
     'http://www.sooperarticles.com/real-estate-articles/property-investment-articles/how-bring-real-estate-investment-success-closer-1150828.html': 
      { title: 'to Bring Real Estate Investment Success Closer?',
        count: 1 },
     'http://commercialprojectconsulting.com/quick-tips-for-those-investing-in-commercial-real-estate-2': 
      { title: 'Quick Tips For Those Investing In Commercial Real Estate - Commercial Project Consulting.com | Commercial Project Consulting.com',
        count: 2 },
     'http://traffic.shareaholic.com/e/?u=http%3A%2F%2Fmillionairementorgroupnews.com%2Freal-estate-investment-resolutions-for-the-new-year%2F&r=1&a=1&s=7&f=2262216': 
      { title: '', 
        count: 1 },
     'http://www.governmentauction.com/about-us/contact-us/': 
      { title: 'How to Buy Land at Government Auction?', 
        count: 1 },
     'http://realestate.aol.com/blog/2013/01/17/hottest-neighborhoods-2013/': 
      { title: 'Hottest Neighborhoods 2013: Places Expected to Lead the Pack This Year | AOL Real Estate',
        count: 1 },
     'http://www.youtube.com/watch?v=rLLCQvSW5Ds': 
      { title: 'How to Spend Your First Paycheck in Real Estate Investing - YouTube',
        count: 10 },
     'http://www.happy-home-group.com/,http://www.nasdaq.com/article/more-homeowners-take-to-selling-at-auctions-cm208375': 
      { title: 'Happy Home Group - List Your Property for FreeMore homeowners take to selling at auctions',
        count: 4 },
     'http://www.realtypin.com/,http://www.realtypin.com/news/story/1021-realtypin-coms-top-5-cities-to-buy-a-home-in-this-year': 
      { title: 'Homes for Sale Apartments for Rent Real Estate Listings Mortgages News and more at Realtypin.com!RealtyPin.com\'s Top 5 Cities To Buy a Home in This Year',
        count: 16 },
     'http://www.officefinder.com/blog/post.cfm/huge-increase-in-work-from-home-in-past-decade/2682512': 
      { title: 'Huge Increase in Work from Home in Past Decade » OfficeFinder Blog',
        count: 9 },
     'http://orange-county-real-estate.go2wendy.com/p/3995124424/google-nar-s-study-on-digital-home-buying': 
      { title: 'Google & NAR’s Study on Digital Home Buying | Orange County California Real Estate | Scoop.it',
        count: 7 },
     'http://www.governmentauctionblog.com/?p=286': 
      { title: 'How to Buy Land at Government Auction?', 
        count: 1 },
     'http://buyhomesindetroit.com/looking-for-cashflow-and-high-roi-check-out-detroit-investment-properties/': 
      { title: 'Looking for CashFlow and High ROI - Check out Detroit Investment Properties! | Buy Homes In Detroit | Detroit Real Estate',
        count: 1 } },
  domain: 
   { 'amazon.com': 15,
     'sooperarticles.com': 1,
     'commercialprojectconsulting.com': 2,
     'earticlesonline.com': 5,
     'youtube.com': 20,
     'realestatemogul.com': 5,
     'engadget.com': 2,
     'realestate.aol.com': 28,
     'cpustocks.com': 1,
     'soc.li': 1,
     'wnd.com': 2,
     'tinyurl.com': 2,
     'officefinder.com': 1,
     'orange-county-real-estate.go2wendy.com': 1,
     'governmentauctionblog.com': 1,
     'buyhomesindetroit.com': 1 
   } 
};

var domains = 
{ domain: 
   { 'amazon.com': 15,
     'sooperarticles.com': 1,
     'commercialprojectconsulting.com': 2,
     'earticlesonline.com': 5,
     'youtube.com': 20,
     'realestatemogul.com': 5,
     'engadget.com': 2,
     'realestate.aol.com': 28,
     'cpustocks.com': 1,
     'soc.li': 1,
     'wnd.com': 2,
     'tinyurl.com': 2,
     'officefinder.com': 1,
     'orange-county-real-estate.go2wendy.com': 1,
     'governmentauctionblog.com': 1,
     'buyhomesindetroit.com': 1 
   } 
};


var domains2 = 
{ domain: 
   { 'amazon.com': 'Looking for CashFlow and High ROI - Check out Detroit Investment Properties! | Buy Homes In Detroit | Detroit Real Estate',
     'sooperarticles.com': 'How to Buy Land at Government Auction?', 
     'commercialprojectconsulting.com': 'How to Buy Land at Government Auction?', 
     'earticlesonline.com': 'mary', 
     'youtube.com': 'lamb',
     '123youtube.com': 'abc lamb', 
     'you133tube.com': 'def lamb',  
     'realestatemogul.com': 'little'
   } 
};
//orderObject(domains.domain)

//orderObject(links.url, 'title')

orderObject(domains.domain)

/*
 * orderObject - order an object by a specified property
 * 
 * @param - object - the object to re-order e.g.. links.url
 * @param - string - the property to order by e.g. 'count' for links.url.count
 * @return object
 * 
 */
function orderObject(object, keyName) {

	var sortable = [];
	var returnObj = {}

	Object.keys(object).forEach(function(key){
		//console.log('Pushing key: ' + key + '  value: ' + object[key]);
		sortable.push({key: key, value: object[key]});
	});

	sortable.sort(function(a, b) {
		
		// No count field supplied so use the index value itself
		if(typeof(keyName) === 'undefined' || typeof(keyName) === undefined ){
		
			if ( isNaN(a.value)&&isNaN(b.value)) return a.value<b.value?-1:a.value==b.value?0:1; // both are string
	        else if (isNaN(a.value)) return 1; // only a is a string
	        else if (isNaN(b.value)) return -1; // only b is a string
	        else return b.value - a.value; // both are num

		} else { // Count field supplied
		
			if ( isNaN(a.value[keyName])&&isNaN(b.value[keyName])) return a.value[keyName]<b.value[keyName]?-1:a.value[keyName]==b.value[keyName]?0:1; // both are string
	        else if (isNaN(a.value[keyName])) return 1; // only a is a string
	        else if (isNaN(b.value[keyName])) return -1; // only b is a string
	        else return b.value[keyName] - a.value[keyName]; // both are num
       }
        
	});

	sortable.forEach(function(item){
		returnObj[item.key] = item.value;
	});
	
	console.log(returnObj);
	
	return returnObj;
}





