DataSift Stats Extractor
========================

Utility script to aggregate data points from a DataSift JSON file and generate CSV files.

See http://www.benh.co.uk/datasift/extracting-insight-from-datasift-data/ for use cases an examples.


## Supported Extractors

* content_hashtag_volume.csv - all hash tags aggregated by volume
* content_words_volume.csv - all words aggregated by volume, with stop words removed
* demographics_age_ranges.csv - range, volume and a percentage of the total number of age range interactions processed.
* demographics_gender.csv - gender, volume and a percentage of the total number of gender interactions processed.
* demographics_large_accounts_categories.csv
* demographics_large_accounts.csv
* demographics_likes_and_interests.csv
* demographics_twitter_activity.csv
* facebookpage_page_volumes.csv - aggregate counts of each page, links and a breakdown of post types e.g. photo, like, status, comment etc.
* geo_latitude_longitude.csv
* language_volume.csv - An aggregate count of each language tag
* links_domain_volume.csv
* links_url_volume.csv
* salience_entity_locations.csv - Entities of type "Place"
* salience_entity_quotes.csv - Entities of type "Quote"
* salience_topics.csv
* sentiment_by_day.csv - Average sentiment value calculated for each day of the coverage period
* sentiment_by_hour.csv - Average sentiment value calculated for each hour of the coverage period
* sentiment_by_minute.csv - Average sentiment value calculated for each minute of the coverage period
* stats - Total Volume, start end dates, demographic profiles collected
* tag_sentiment_by_day.csv - Average sentiment value calculated for each tag by day
* tag_sentiment_by_hour.csv - Average sentiment value calculated for each tag by hour
* tag_sentiment_by_minute.csv - Average sentiment value calculated for each tag by minute
* tag_volume_by_day.csv
* tag_volume_by_hour.csv
* tag_volume.csv
* tag_twitter_userid.csv - a list twitter user id's for each tag
* twitter_influencers_retweeted.csv - Aggregate unique combinations of retweet and retweeted users - counts = 1 are dropped by default.
* twitter_influencers_example_model.csv - Example stats to be used to derive a basic influencer model - followers count, retweet count, replies count and mentions count.
* twitter_user_ids.csv - all user id's for Twitter authors
* type_volume_by_day.csv - If more than 1 data type has been found e.g. twitter and facebook, volume plotted by type and day.
* type_volume_by_hour.csv - See type_volume_by_day.csv.
* type_volume_by_minute.csv - See type_volume_by_day.csv.
* type_summary.csv - Total volumes and percentages of each data type e.g. Facebook, Twitter etc.
* volume_by_day.csv
* volume_by_hour.csv
* volume_by_minute.csv

## Install

```npm install```



## Usage


**DataSift Source JSON File**

Place a JSON file (formatted to 1 document per line) in to the /process directory. The file must be named *.json or it will be ignored.



**Run Extractor**

```node app.js```

CSV data will be generated in to the /outout directory.


**Large Files**

When processing large files (several Gb in size), the processor may hang if V8 runs out of memory. To epand the available memory, run with the 'max-old-space-size' option:

```node -max-old-space-size=4096 app.js```
