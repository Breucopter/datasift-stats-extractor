'use strict';
var fs 		= require('fs');
var _  		= require('underscore');
// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');
// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());


module.exports = {

  loadConfig: function() {
		var data = fs.readFileSync('./config.json'),
	    myObj;
	
	  try {
	    myObj = JSON.parse(data);
		return myObj;
	  }
	  catch (err) {
	    throw new Error('Error parsing JSON config file.')
	  }
  },
  
  getSourceFile: function() {
      try { var files = fs.readdirSync('process'); }
      catch(e) { throw new Error('Unable to find /process dir.' + e)  }
      
      if (files.length > 0){
      	for (var i = 0; i < files.length; i++)
      	  if(_(files[i]).endsWith(".json") === true && fs.statSync('process/' + files[i]).isFile() === true)
      	    var filePath =  'process' + '/' + files[i]; console.log(filePath)
	       	
	  	if (filePath && filePath !== undefined)
	   	  return filePath;
	  	else
	      throw new Error('Unable to load JSON source file from /process dir.')
      }
  },

  save: function (name, content) {
    var fs = require('fs');
    fs.writeFile("output/data/" + name, content, function(err) {
      if(err)
		console.log(err);
	}); 
  },
    
  cleanFiles: function() {
      try { var files = fs.readdirSync('output/data/'); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = 'output/data' + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
            //rmDir(filePath);
        }
      //fs.rmdirSync(dirPath);
   },

   fileRename: function(oldPath){
   	var newPath = oldPath + '.PROCESSED'	
   	fs.rename(oldPath, newPath,  function(error) {
   		throw new Error('Unable to rename source file - ' + oldPath + ' with error ' + error)	
   	});	
   	
   }
  
  
};
