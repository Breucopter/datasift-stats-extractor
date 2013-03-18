function stopwords(input) {

  var stop_words = new Array('a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'among', 'an', 'and', 'another', 'any', 'anybody', 'anyone', 'anything', 'anywhere', 'are', 'area', 'areas', 'arent', 'around', 'as', 'ask', 'asked', 'asking', 'asks', 'at', 'away', 'b', 'back', 'backed', 'backing', 'backs', 'be', 'became', 'because', 'become', 'becomes', 'been', 'before', 'began', 'behind', 'being', 'beings', 'below', 'best', 'better', 'between', 'big', 'both', 'but', 'by', 'c', 'came', 'can', 'cant', 'cannot', 'case', 'cases', 'certain', 'certainly', 'clear', 'clearly', 'come', 'could', 'couldnt', 'd', 'did', 'didnt', 'differ', 'different', 'differently', 'do', 'does', 'doesnt', 'doing', 'dont', 'done', 'down', 'downed', 'downing', 'downs', 'during', 'e', 'each', 'early', 'either', 'end', 'ended', 'ending', 'ends', 'enough', 'even', 'evenly', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'f', 'face', 'faces', 'fact', 'facts', 'far', 'felt', 'few', 'find', 'finds', 'first', 'for', 'four', 'from', 'full', 'fully', 'further', 'furthered', 'furthering', 'furthers', 'g', 'gave', 'general', 'generally', 'get', 'gets', 'give', 'given', 'gives', 'go', 'going', 'good', 'goods', 'got', 'great', 'greater', 'greatest', 'group', 'grouped', 'grouping', 'groups', 'h', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'high', 'higher', 'highest', 'him', 'himself', 'his', 'how', 'hows', 'however', 'i', 'id', 'ill', 'im', 'ive', 'if', 'important', 'in', 'interest', 'interested', 'interesting', 'interests', 'into', 'is', 'isnt', 'it', 'its', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kind', 'knew', 'know', 'known', 'knows', 'l', 'large', 'largely', 'last', 'later', 'latest', 'least', 'less', 'let', 'lets', 'lets', 'like', 'likely', 'long', 'longer', 'longest', 'm', 'made', 'make', 'making', 'man', 'many', 'may', 'me', 'member', 'members', 'men', 'might', 'more', 'most', 'mostly', 'mr', 'mrs', 'much', 'must', 'mustnt', 'my', 'myself', 'n', 'necessary', 'need', 'needed', 'needing', 'needs', 'never', 'new', 'newer', 'newest', 'next', 'no', 'nobody', 'non', 'noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'number', 'numbers', 'o', 'of', 'off', 'often', 'old', 'older', 'oldest', 'on', 'once', 'one', 'only', 'open', 'opened', 'opening', 'opens', 'or', 'order', 'ordered', 'ordering', 'orders', 'other', 'others', 'ought', 'our', 'ours ', 'ourselves', 'out', 'over', 'own', 'p', 'part', 'parted', 'parting', 'parts', 'per', 'perhaps', 'place', 'places', 'point', 'pointed', 'pointing', 'points', 'possible', 'present', 'presented', 'presenting', 'presents', 'problem', 'problems', 'put', 'puts', 'q', 'quite', 'r', 'rather', 'really', 'right', 'room', 'rooms', 's', 'said', 'same', 'saw', 'say', 'says', 'second', 'seconds', 'see', 'seem', 'seemed', 'seeming', 'seems', 'sees', 'several', 'shall', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'show', 'showed', 'showing', 'shows', 'side', 'sides', 'since', 'small', 'smaller', 'smallest', 'so', 'some', 'somebody', 'someone', 'something', 'somewhere', 'state', 'states', 'still', 'such', 'sure', 't', 'take', 'taken', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'therefore', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'thing', 'things', 'think', 'thinks', 'this', 'those', 'though', 'thought', 'thoughts', 'three', 'through', 'thus', 'to', 'today', 'together', 'too', 'took', 'toward', 'turn', 'turned', 'turning', 'turns', 'two', 'u', 'under', 'until', 'up', 'upon', 'us', 'use', 'used', 'uses', 'v', 'very', 'w', 'want', 'wanted', 'wanting', 'wants', 'was', 'wasnt', 'way', 'ways', 'we', 'wed', 'well', 'were', 'weve', 'well', 'wells', 'went', 'were', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'whether', 'which', 'while', 'who', 'whos', 'whole', 'whom', 'whose', 'why', 'whys', 'will', 'with', 'within', 'without', 'wont', 'work', 'worked', 'working', 'works', 'would', 'wouldnt', 'x', 'y', 'year', 'years', 'yet', 'you', 'youd', 'youll', 'youre', 'youve', 'young', 'younger', 'youngest', 'your', 'yours', 'yourself', 'yourselves', 'z')


	// Remove all non alpha-numeric characters
	var clean = input.replace(/[^a-zA-Z 0-9]+/g,'');
  console.log('IN: ' + input);

  // JavaScript 1.6 array filter
  var filtered  = input.split( /\b/ ).filter( function( v ){
        return stop_words.indexOf( v ) == -1;
  });

  console.log( 'OUT 1 : ' + filtered.join(''));

  stop_words.forEach(function(item) {

      var reg = new RegExp(item +'\\b','gi');

      input = input.replace(reg, "");
  });

  console.log('OUT 2 : ' + input);
}

stopwords( "this is a test twitter string sea mentioning the word across and a about");