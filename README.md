DataSift Stats Extractor
========================

Utility script to aggregate data points from a DataSift JSON file.

The script will generate a static web application including the aggregate data files formatted as CSV. Optionally, the web application can be uploaded to S3.

## Supported Extractors

* volume_by_day.csv
* volume_by_hour.csv
* volume_by_minute.csv
* hashtag_volume.csv
* tag_volume.csv
* tag_volume_by_day.csv
* tag_volume_by_hour.csv
* geo_latitude_longitude.csv
* url_volume.csv
* domain_volume.csv
* sentiment_by_day.csv - Average sentiment value calculated for each day of the coverage period
* sentiment_by_hour.csv - Average sentiment value calculated for each hour of the coverage period
* sentiment_by_minute.csv - Average sentiment value calculated for each minute of the coverage period
* salience_entity_locations.csv - Locations mentioned within the content
* salience_topics.csv
* influencers_retweet.csv
* demographics_gender.csv
* demographics_age_ranges.csv
* demographics_large_accounts.csv
* demographics_large_accounts_categories.csv
* demographics_likes_and_interests.csv
* demographics_twitter_activity.csv
* stats - Total Volume, start end dates

## Install

```npm install```



## Usage

**Config**

Edit ```config.json``` and complete the required properties. Leave the properties blank for them to be ignored.

* **Title**: Optional text shown on the index.html landing page. Useful for context for setting context of the export data e.g. an event.
* **Description**: As above.
* **accessKeyId**: S3 Access Key ID
* **secretAccessKey**: S3 Access Key
* **file_delete_policy_days**: S3 retention policy - The number of days before the files are deleted.



**DataSift Source JSON File**

Place a JSON file (formatted to 1 document per line) in to the /process directory. The file must be named *.json or it will be ignored.



**Run Extractor**

```node app.js```

The resulting web applocation will generated in to the /output directory, and associated CSV data in to the /outout/data directory.




**Upload to S3**

```node s3.js```
 
The upload script will generate a random URL bucket name, configure it as a static web server, upload the data, apply permission and a retention policy.