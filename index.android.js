/**
 * Example React Native News App
 * https://github.com/jamesburton/newsappreactnative
 * by James Burton
 */

// Import rn-nodeify shims
import './shim';

import React, { Component } from 'react';
import NewsAppReactNative from './app/NewsAppReactNative';
import ErrorPage from './app/ErrorPage';
import { AppRegistry, } from 'react-native';

try {
  //var feeds = require('./feeds.json');
  //AppRegistry.registerComponent('NewsAppReactNative', <NewsAppReactNative feeds={feeds} />);
  AppRegistry.registerComponent('NewsAppReactNative', () => NewsAppReactNative)
} catch(ex) {
  AppRegistry.registerComponent('NewsAppReactNative', <ErrorPage ex={ex} />);
}
