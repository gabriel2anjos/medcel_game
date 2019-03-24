import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('HomeScreen', () => require('./App').default);
}