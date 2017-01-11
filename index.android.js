/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// Import rn-nodeify shims
import './shim';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';


import FeedParser from 'feedparser';
/*
import FeedParser from 'feedparser';
require('es6-promise').polyfill();
require('isomorphic-fetch');
//*/

//import { parse } from 'feed-reader';

//import feed from 'feed-read';

var feeds = [
  { url: 'http://feeds.bbci.co.uk/news/uk/rss.xml', source: 'BBC', category: 'UK', items: []},
  { url: 'http://feeds.bbci.co.uk/news/technology/rss.xml', source: 'BBC', category: 'Technology', items: []},
  { url: 'http://feeds.reuters.com/reuters/UKdomesticNews?format=xml', source: 'Reuters', category: 'UK', items: []},
  { url: 'http://feeds.reuters.com/reuters/technologyNews?format=xml', source: 'Reuters', category: 'Technology', items: []}
];

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

export default class NewsAppReactNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: feeds
    };
    //alert('constructor: feeds.length=' + feeds.length);
    this.ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
  }
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }
  loadFeeds() {
    //alert(this.state.feeds[0].url);
    _loadFeeds(this.state.feeds, (updatedFeeds) => {
      //alert(updatedFeeds.length);
      this.setState(Object.assign({}, this.state, { feeds: updatedFeeds }));
    })
  }
  componentDidMount() {
    //alert('Mounted');
    this.loadFeeds();
  }
  render() {
    const rows = this.ds.cloneWithRows(this.state.feeds || []);
    return (
      /*
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
      //*/
      //*
      <View style={styles.container}>
        <View><Text>Example React-Native News App</Text></View>
        <View>
          <Text>Options:</Text>
        </View>
        <View>
          { /* <Text>List</Text> */ }
          <ListView 
            dataSource={rows}
            renderRow={(data) => <View><Text>{data.url}</Text></View> }
            />
        </View>
        <View><Text>Details:</Text></View>
        <View><Text>Status: </Text></View>
      </View>
      //*/
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


var parser = new DOMParser();
function _loadFeeds(feeds, cb)
{
  //alert('_loadFeeds: typeof feeds = ' + typeof feeds);
  feeds = Object.assign([], feeds);
  //alert('_loadFeeds: feeds.length = ' + feeds.length);
  // NB: fetch is native to react-native
  feeds.forEach((feed, index) => {
  //for(var fi = 0; fi < feeds.length; fi++)
  //{
    //let feed = feeds[fi];
    alert(feed.url);
    fetch(feed.url)
      .then(res => res.text())
      .then(text => {
        return text.trim().startsWith('<?xml')
          ? parser.parseFromString(text, 'text/xml')
          //? new DOMParser().parseFromString(text, 'text/xml')
          : null;
        })
      .then(xml => {
        if(xml === null)
          alert('Result was not XML');
        else if(xml.getElementsByTagName('rss').length === 1) {
          //alert('RSS found');
          var items = xml.getElementsByTagName('item');
          if(!items) {
            alert('No items fetched: url=' + feed.url);
          } else {
            //alert(items.length);
            //alert(typeof items);
            //items.map(item => {
            for(var i = 0; i < items.length; i++) {
              let item = items[i];
              //if(i < 2) alert(item.getElementsByTagName("title")[0].textContent);
              //return {
              feed.items.push({
                title: item.getElementsByTagName("title")[0].textContent,
                description: item.getElementsByTagName("description")[0].textContent,
                link: item.getElementsByTagName("link")[0].textContent,
                published: item.getElementsByTagName("pubDate")[0].textContent
              //};
              });
            }
            //alert(feed.items.length);
            //);
          }
        }
        else if(xml.getElementsByTagName('feed').length === 1)
          alert('ATOM found');
        else
          alert('Unknown XML format')
      });
  });
  // TODO: Add LocalStorage caching and retrieval
  // TODO: Ensure feeds are displaying with actual data
  cb(feeds);
}
AppRegistry.registerComponent('NewsAppReactNative', () => NewsAppReactNative);
