import { flatten, ExtendedArray } from './arrayHelpers';
import { AsyncStorage } from 'react-native';

/*
import FeedParser from 'feedparser';
require('es6-promise').polyfill();
require('isomorphic-fetch');
//*/

//import { parse } from 'feed-reader';

//import feed from 'feed-read';

// TODO: Parse feeds
/* NB: With feed-reader
feeds.forEach(feed => parse(feed.url).then(data => {
  feed.items = data.entries
}));
//*/

//* NB: With feedparser
//var feedparser = new FeedParser();
// NB: This hits sax with react-native issues
//*/

//* NB: With xmldom and isomorphic-fetch
import { DOMParser } from 'xmldom';

var parser = new DOMParser();
async function loadFeeds(feeds, cb)
{
  // Load cached/local data, if available
  //console.debug('About to get local data');
  await AsyncStorage.multiGet(feeds.map(feed => feed.url), async (err, stores) => {
    if(err)
        console.error(err);
    else {
        //console.debug('Fetched local data: stores=', stores);
        await stores.forEach((store) => {
            var url = store[0];
            var data = store[1];
            var feed = feeds.find(f => f.url === url);
            //console.debug('Matched feed to data: url=', url, ', data=', data, ', feed=', feed);
            if(data) {
                feed.items = JSON.parse(data);
                cb(feeds);
            }
        });
    }
  });
  // Load remote data, if available
  // NB: fetch is native to react-native
  feeds.forEach((feed, index) => {
    fetch(feed.url)
      .then(res => res.text())
      .then(text => {
        return text.trim().startsWith('<?xml')
          ? parser.parseFromString(text, 'text/xml')
          : null;
        })
      .then(xml => {
        if(xml === null)
          alert('Result was not XML');
        else if(xml.getElementsByTagName('rss').length === 1) {
          var items = xml.getElementsByTagName('item');
          if(!items) {
            alert('No items fetched: url=' + feed.url);
          } else {
            // Clear existing list, in-case one had been loaded
            feed.items = [];
            //items.map(item => {
            for(var i = 0; i < items.length; i++) {
              let item = items[i];
              feed.items.push({
                title: item.getElementsByTagName("title")[0].textContent,
                description: item.getElementsByTagName("description")[0].textContent,
                link: item.getElementsByTagName("link")[0].textContent,
                published: item.getElementsByTagName("pubDate")[0].textContent
              });
            }
            //console.debug('Saving feed items: feed.url=', feed.url, ', feed.items=', feed.items);
            AsyncStorage.setItem(feed.url, JSON.stringify(feed.items));
            //);
            cb(feeds);
          }
        }
        else if(xml.getElementsByTagName('feed').length === 1)
          alert('ATOM found');
        else
          alert('Unknown XML format')
      });
  });
  // TODO: Add LocalStorage caching and retrieval
  //cb(feeds);  // NB: Moved, so that each triggers an update as it loads
}
module.exports = loadFeeds;
