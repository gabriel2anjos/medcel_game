

import React, { Component } from 'react';

import {name as appName} from './app.json';
import App from './App';


import {
  AppRegistry
} from 'react-native';

// let store = createStore(reducers);

// export default class Root extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//   }
// }

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('ViroSample', () => App);
