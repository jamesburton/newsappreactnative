/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//import FeedParser from 'feedparser';

//* NB: Was going to use this to fetch feeds, but not required with feed-reader
require('es6-promise').polyfill();
require('isomorphic-fetch');
//*/

import { parse } from 'feed-reader';

var feeds = [
  { url: 'http://feeds.bbci.co.uk/news/uk/rss.xml', source: 'BBC', category: 'UK', items: []},
  { url: 'http://feeds.bbci.co.uk/news/technology/rss.xml', source: 'BBC', category: 'Technology', items: []},
  { url: 'http://feeds.reuters.com/reuters/UKdomesticNews?format=xml', source: 'Reuters', category: 'UK', items: []},
  { url: 'http://feeds.reuters.com/reuters/technologyNews?format=xml', source: 'Reuters', category: 'Technology', items: []}
];

// TODO: Parse feeds
feeds.forEach(feed => parse(feed.url).then(data => {
  feed.items = data.entries
}));
/* Fields in feed-reader entries:-
  link,
  title,
  contentSnippet,
  publishedDate,
  author,
  content
*/
// TODO: Add LocalStorage caching and retrieval
// TODO: Ensure feeds are displaying with actual data

var dataSource = feeds;

export default class NewsAppReactNative extends Component {
  render() {
    return (
      //*
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
      /*
      <View style={styles.container}>
        <View><Text>Example React-Native News App</Text></View>
        <View>
          <Text>Options:</Text>
        </View>
        <View>
          { /* <Text>List</Text> * / }
          <ListView 
            dataSource={dataSource}
            renderRow={(data) => <View><Text>{data.url}</Text></View> }
            />
        </View>
        <View><Text>Details:</Text></View>
        <View><Text>Status: </Text></View>
      </View>
      */
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

AppRegistry.registerComponent('NewsAppReactNative', () => NewsAppReactNative);
