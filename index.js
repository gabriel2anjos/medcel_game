

import React, { Component } from 'react';

import {name as appName} from './app.json';
import App from './App';


import {
  AppRegistry
} from 'react-native';



AppRegistry.registerComponent(appName, () => App);
//Para teste no Viro Media, precisa da linha seguuinte
AppRegistry.registerComponent('ViroSample', () => App);
