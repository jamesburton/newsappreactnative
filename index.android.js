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
      activeFeeds: [],
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
  }
  _toggleBBC() {
    alert(this.state.bbcChecked);
    this.setState({bbcChecked: !this.state.bbcChecked});
  }
  _toggleReuters() {
    alert(this.state.reutersChecked);
    this.setState({reutersChecked: !this.state.reutersChecked});
  }
  _toggleUK() {
    alert(this.state.ukChecked);
    this.setState({bbcChecked: !this.state.ukChecked});
  }
  _toggleTechnology() {
    alert(this.state.technologyChecked);
    this.setState({bbcChecked: !this.state.technologyChecked});
  }
  rowHasChanged(r1, r2) {
    return r1 !== r2;
  }
  loadFeeds() {
    _loadFeeds(this.state.feeds, (updatedFeeds) => {
      //alert("Feeds updated: updatedFeeds.length=", updatedFeeds.length);
      this.setState(Object.assign({}, this.state, { feeds: updatedFeeds }));
      this.optionsChanged();
    })
  }
  selectItem(item) {
    this.setState(Object.assign(this.state, { selectedItem: item }))
  }
  deletedItem() { this.selectItem(null); }
  componentDidMount() {
    this.loadFeeds();
  }
  bbcCheckClick(checked) { 
    alert(checked);
    //alert(this.state.bbcChecked);
    //this.setState(Object.assign({}, this.state, { bbcChecked: !this.state.bbcChecked })); 
    this.setState({bbcChecked: false});
    this.optionsChanged(); 
  }
  reutersCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { reutersChecked: checked })); 
    this.optionsChanged(); 
  }
  ukCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { ukChecked: checked })); 
    this.optionsChanged(); 
  }
  technologyCheckClick(checked) { 
    this.setState(Object.assign({}, this.state, { technologyChecked: checked })); 
    this.optionsChanged(); 
  }
  getSources() {
    //alert('getSources: relevant state=' + JSON.stringify({bbcChecked: this.state.bbcChecked, reutersChecked: this.state.reutersChecekd }));
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
  optionsChanged() {
    //alert('optionsChanged');
    var sources = this.getSources();
    var categories = this.getCategories();
    var feeds = this.state.feeds;
    var activeFeeds = [];
    alert(this.state.bbcChecked);
    //alert("sources=" + JSON.stringify(sources));
    feeds.forEach((feed) => {
      if(sources.includes(feed.source) && categories.includes(feed.category)) 
      activeFeeds.push(feed); 
    });
    this.setState(Object.assign({}, this.state, { activeFeeds: activeFeeds }));
    //alert("activeFeeds.length:- " + activeFeeds.length);
  }
  render() {
    //const items = (this.state.feeds ||[]).map(feed => feed.items).reduce(flatten,[]);
    const items = (this.state.activeFeeds ||[]).map(feed => feed.items).reduce(flatten,[]);
    const rows = this.ds.cloneWithRows(items || []);

    var sources = this.getSources();
    var categories = this.getCategories();

/*
    return (
      <Container>
        <Header>
          <Text>Example React-Native News App</Text>
        </Header>
        <Content>
        <View style={styles.container}>
          <View>
            <View>
              <Text>Options:</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>Sources: </Text>
                <View>
                  <Button onPress={this.toggleBbcChecked} title="Toggle BBC"/>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>Categories: </Text>
              </View>
            </View>
          </View>
          <ListView 
            renderHeader={() => <Text>Sources: {JSON.stringify(sources)}, Categories: {JSON.stringify(categories)}</Text>}
            dataSource={rows}
            renderRow={(item) => <View><Text>{item.title}</Text></View> }
            />
          <View>
            <View><Text>Details:</Text></View>
            <View><Text>Status: </Text></View>
          </View>
        </View>
      </Content>
    </Container>
    );
    */

    return <NewsApp feeds={this.state.feeds} bbcChecked={this.state.bbcChecked} reutersChecked={this.state.reutersChecked} ukChecked={this.state.ukChecked} technologyChecked={this.state.technologyChecked} toggleBBC={this.toggleBBC} toggleReuters={this.toggleReuters} toggleUK={this.toggleUK} toggleTechnology={this.toggleTechnology} />;
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
    //alert(feed.url);
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
