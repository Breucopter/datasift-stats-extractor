var awssum 		= require('awssum')
  , amazon 		= awssum.load('amazon/amazon')
  , S3 			= awssum.load('amazon/s3').S3
  , filehandler = require('./lib/util/filehandler.js')
  , uuid 		= require('node-uuid')
  , fs 			= require('fs')
  , async 		= require('async')
  , walk    	= require('walk')
  , underscore  = require('underscore')
  , mime = require('mime')
  ;

var config			= filehandler.loadConfig();
var accessKeyId     = config.amazon_s3.accessKeyId;
var secretAccessKey = config.amazon_s3.secretAccessKey;
var bucket 			= 'stats-extractor-' + uuid.v1();
var concurrency		= 2;

var s3 = new S3({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'region'          : amazon.US_EAST_1,
});

var params = {
    BucketName: bucket,
	IndexDocument: 'index.html',
	ErrorDocument: '404.html',
	BucketPolicy: {
	    "Version": "2008-10-17",
	    "Statement": [
	        {
	            "Sid": "AllowPublicRead",
	            "Effect": "Allow",
	            "Principal": {
	                "AWS": "*"
	            },
	            "Action": "s3:GetObject",
	            "Resource": "arn:aws:s3:::"+bucket+"/*"
	        }
	    ]
	},
	Rules: [
	    {
	        'Prefix': "*",
	        'Status': 'Enabled',
	        'Days': config.amazon_s3.file_delete_policy_days,
	        'ID': 'Delete-after-30-days',
	        
	    },
	],
};

// --------------------------------------------------------------------------------------------------------------------

var statItemQueue   = async.queue(statItem, concurrency);
var uploadItemQueue = async.queue(uploadItem, concurrency);

s3.CreateBucket(params, function(err, data) {
  if (err) {
  	console.log(err);
    return;
  }
  
  console.log('New S3 bucket successfully created.')  
		
  var walker  = walk.walk('./output', { followLinks: false });
  
  walker.on('file', function(root, stat, next) {
    statItemQueue.push({
          'filename' : root + '/' + stat.name,
      });
    next();
  });

  walker.on('end', function() {
    console.log('Async file scan complete.');
  }); 

});



// --------------------------------------------------------------------------------------------------------------------

uploadItemQueue.drain = function() { // Emitted after a write() method was called that returned false to indicate that it is safe to write again.
  	
  s3.PutBucketWebsite(params, function(err, data) {
	  if (err) {
	  	console.log(err);
	    return;
	  }
		  
		console.log('Bucket website created.')  
	});
	
	s3.PutBucketPolicy(params, function(err, data) {
		if (err) {
	        console.log(err);
	        return;
	    }
		console.log('Bucket policy applied.')  	    
	});
	
	s3.PutBucketLifecycle(params, function(err, data) {
	    if (err) {
	        console.log(err);
	        return;
	    }
		console.log('Bucket lifecycle applied.') 
		console.log('Created https\://s3.amazonaws.com/' + params.BucketName + '/index.html');
		console.log('Done.');
	});
	

};



function statItem(item, callback) {

  fs.stat(item.filename, function(err, stats) {  
    if ( err ) {
  	  throw new Error('Failed to access file: ' + err)
  	  
      callback();
      return;
    }

    // we know there is a file
    item.size = stats.size;

    // add it to the upload queue
    uploadItemQueue.push(item);
    callback();
  });
}


function uploadItem(item, callback) {
    // create a read stream
    var bodyStream = fs.createReadStream( item.filename );

    var options = {
        BucketName    : params.BucketName,
        ObjectName 		: item.filename.replace("./output/",""),
        ContentLength : item.size,
        Body          : bodyStream,
        ContentType 	: mime.lookup(item.filename)
    };
		
		console.log('Uploading ', item.filename + ' (' + item.size + ')');
    s3.PutObject(options, function(err, data) {
        if (err) {
             console.log('UploadFailed', item.filename);
             console.log(err);

            // put this item back on the queue if retries is less than the cut-off
            if ( item.retries > 2 ) {
                console.log('Upload Cancelled', item.filename);
            }
            else {
                // try again
                item.retries = item.retries ? item.retries+1 : 1;
                uploadItemQueue.push(item);
            }

            callback();
            return;
        }

        //console.log('Uploaded', item.filename + ' (' + item.size + ')');
        callback();
    });
}