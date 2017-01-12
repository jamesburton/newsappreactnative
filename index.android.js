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
  ListView,
  Button
} from 'react-native';
//import CheckBox from 'react-native-checkbox';
import { Container, Content, Header, Footer, FooterTab, CheckBox } from 'native-base';

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
function flatten(a,b){return a.concat(b);}

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

import NewsApp from './app/NewsApp';

export default class NewsAppReactNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: feeds,
      bbcChecked: true,
      reutersChecked: true,
      ukChecked: true,
      technologyChecked: true,
      //activeFeeds: [],
      items: [],
      selectedItem: null
    };
    //alert('constructor: feeds.length=' + feeds.length);
    this.ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    // Configure bound checkbox click handlers
    this.onBbcCheckClick = this.bbcCheckClick.bind(this);
    this.onReutersCheckClick = this.reutersCheckClick.bind(this);
    this.onUkCheckClick = this.ukCheckClick.bind(this);
    this.onTechnologyCheckClick = this.technologyCheckClick.bind(this);

    //this.toggleBbcChecked = () => { this.setState(Object.assign({}, this.state, { bbcChecked: !this.state.bbcChecked })); this.optionsChanged(); };
    //this.toggleBbcChecked = () => { this.setState({ bbcChecked: !this.state.bbcChecked }); this.optionsChanged(); };
    //this.toggleBBC = () => { alert('toggleBBC') };
    this.toggleBBC = this._toggleBBC.bind(this);
    this.toggleReuters = this._toggleReuters.bind(this);
    this.toggleUK = this._toggleUK.bind(this);
    this.toggleTechnology = this._toggleTechnology.bind(this);

    this.onSelectItem = this.selectItem.bind(this);
  }
  _toggleBBC() {
    //alert(this.state.bbcChecked);
    this.setState({bbcChecked: !this.state.bbcChecked});
  }
  _toggleReuters() {
    //alert(this.state.reutersChecked);
    this.setState({reutersChecked: !this.state.reutersChecked});
  }
  _toggleUK() {
    //alert(this.state.ukChecked);
    this.setState({ukChecked: !this.state.ukChecked});
  }
  _toggleTechnology() {
    this.setState({technologyChecked: !this.state.technologyChecked});
  }
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }
  loadFeeds() {
    _loadFeeds(this.state.feeds, (updatedFeeds) => {
      console.log('_loadFeeds callback: updatedFeeds=', updatedFeeds);
      //this.setState(Object.assign({}, this.state, { feeds: updatedFeeds }));
      this.setState(Object.assign({}, this.state, { feeds: updatedFeeds, items: this.getItems() }));
    })
  }
  selectItem(item) {
    this.setState(Object.assign({}, this.state, { selectedItem: item }))
    console.log('index.android.js:- selectItem, item=', item);
  }
  deletedItem() { this.selectItem(null); }
  componentDidMount() {
    this.loadFeeds();
  }
  bbcCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { bbcChecked: !this.state.bbcChecked })); 
  }
  reutersCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { reutersChecked: checked })); 
  }
  ukCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { ukChecked: checked })); 
  }
  technologyCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { technologyChecked: checked })); 
  }
  getSources() {
    var sources = [];
    if(this.state.bbcChecked === true) sources.push('BBC');
    if(this.state.reutersChecked === true) sources.push('Reuters');
    return sources;
  }
  getCategories() {
    var categories = [];
    if(this.state.ukChecked === true) categories.push('UK');
    if(this.state.technologyChecked === true) categories.push('Technology');
    return categories;
  }
  getItems() {
    var sources = this.getSources(), 
        categories = this.getCategories()
        feeds = this.state.feeds;
    console.log('index.android.js:- getItems: sources=', sources, ", categories=", categories, ", bbcChecked=", this.state.bbcChecked, ", reutersChecked=", this.state.reutersChecked, ", ukChecked=", this.state.ukChecked, ", technologyChecked=", this.state.technologyChecked);
    var items = (feeds || [])
      .filter(feed => sources.includes(feed.source) && categories.includes(feed.category))
      .map(feed => feed.items)
      .reduce(flatten,[])
      .sort((a,b) => a.published > b.published);
    //alert(items.length);
    return items;
  }
  render() {
    var items = this.getItems();
    return <NewsApp 
      feeds={this.state.feeds} 
      bbcChecked={this.state.bbcChecked} 
      reutersChecked={this.state.reutersChecked} 
      ukChecked={this.state.ukChecked} 
      technologyChecked={this.state.technologyChecked} 
      toggleBBC={this.toggleBBC} 
      toggleReuters={this.toggleReuters} 
      toggleUK={this.toggleUK} 
      toggleTechnology={this.toggleTechnology} 
      items={items} 
      selectItem={this.onSelectItem}
      selectedItem={this.state.selectedItem}/>;
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
  feeds = Object.assign([], feeds);
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
AppRegistry.registerComponent('NewsAppReactNative', () => NewsAppReactNative);
