/**
 * @format
 */

import {AppRegistry,Linking} from 'react-native';
import AppSource from './AppSource';
import {name as appName} from './app.json';

console.disableYellowBox = true;


AppRegistry.registerComponent(appName, () => AppSource);
