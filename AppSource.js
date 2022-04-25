/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import App from './App';
import {Redux} from './Redux/Data'
import PushController from './PushController';
const AppSource  = (props) => {
     // const value = useContext(Redux);
      // const [context, setContext] = useState(0);

  return (
   <>
     <App />
  
     <PushController/>
</>
  );
};



export default AppSource;
