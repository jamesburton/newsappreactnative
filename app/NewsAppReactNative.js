import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, Button } from 'react-native';
import styles from './styles.js';

import { flatten, pushIf, ExtendedArray } from '../helpers/arrayHelpers';
// NB: loadFeeds requires an array of feed objects (with .url source and having .items set when loaded, and triggering the callback as each feed is updated)
import loadFeeds from '../helpers/loadFeeds';
import NewsApp from './NewsApp';

var feeds = require('../feeds.json');

export default class NewsAppReactNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: feeds,
      //feeds: props.feeds,
      bbcChecked: true,
      reutersChecked: true,
      ukChecked: true,
      technologyChecked: true,
      items: [],
      selectedItem: null
    };
    //alert('constructor: feeds.length=' + feeds.length);
    this.ds = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
    // Configure bound checkbox click handlers
    this.toggleBBC = this._toggleBBC.bind(this);
    this.toggleReuters = this._toggleReuters.bind(this);
    this.toggleUK = this._toggleUK.bind(this);
    this.toggleTechnology = this._toggleTechnology.bind(this);

    this.setBBC = this._setBBC.bind(this);
    this.setReuters = this._setReuters.bind(this);
    this.setUK = this._setUK.bind(this);
    this.setTechnology = this._setTechnology.bind(this);

    this.onSelectItem = this.selectItem.bind(this);
  }

  _setBBC(value) { this.setState({ bbcChecked: value }); }
  _setReuters(value) { this.setState({ reutersChecked: value }); }
  _setUK(value) { this.setState({ ukChecked: value }); }
  _setTechnology(value) { this.setState({ technologyChecked: value }); }

  toggle(key) { var newState = {}; newState[key] = !this.state[key]; this.setState(newState); }
  _toggleBBC() { this.toggle('bbcChecked'); }
  _toggleReuters() { this.toggle('reutersChecked'); }
  _toggleUK() { this.toggle('ukChecked'); }
  _toggleTechnology() { this.toggle('technologyChecked'); }

  rowHasChanged(r1, r2) { return r1 !== r2; }
  //loadFeeds() { loadFeeds(this.state.feeds, (updated) => this.loadedFeeds(updated)); }  // NB: Working, but tidier in next format
  loadFeeds() { loadFeeds(this.state.feeds, this.loadedFeeds.bind(this)); }
  loadedFeeds(updatedFeeds) { this.setState({ feeds: updatedFeeds, items: this.getItems() }); }
  selectItem(item) { this.setState({ selectedItem: item }) }
  deletedItem() { this.selectItem(null); }
  componentDidMount() {
    this.loadFeeds();
  }
  getSources() { 
    return new ExtendedArray().pushIf(this.state.bbcChecked, 'BBC').pushIf(this.state.reutersChecked, 'Reuters'); 
  }
  getCategories() {
    return new ExtendedArray().pushIf(this.state.ukChecked, 'UK').pushIf(this.state.technologyChecked, 'Technology');
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
      setBBC={this.setBBC} 
      setReuters={this.setReuters} 
      setUK={this.setUK} 
      setTechnology={this.setTechnology} 
      items={items} 
      selectItem={this.onSelectItem}
      selectedItem={this.state.selectedItem}/>;
  }
}
