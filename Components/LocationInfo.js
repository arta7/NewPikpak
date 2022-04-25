import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-navigation';


const LocationInfo = (props) => {

  return (
    <View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: 'transparent', flexDirection: 'row'}}>

            <View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
              <View style = {{width: wp('10%'), height:  wp('10%'), borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'silver'}}>
              
                <Text style = {[styles._Text, {height: '100%', width: '100%', textAlign: 'center', textAlignVertical: 'center', 
                                paddingVertical: 0, paddingLeft: 0, fontSize : wp('5%'), fontWeight: 'bold'}]}>{props.PointTitle}</Text>

              </View>

            </View>

            <View style = {{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
              <Text style = {[styles._Text, {width: '100%', height: '35%',paddingLeft: 10,fontSize : wp('3%'), color: props.LocTitleColor}]}>{props.LocTitle}</Text>
              <Text style = {[styles._Text, {width: '100%', height: '65%',paddingLeft: 10, color: props.LocAddressColor}]}>{props.LocAddress}</Text>
            </View>

          </View>

                   
   );
};

const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: '#EAE9EE'
  },
  _Text : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3.2%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30,
    backgroundColor: 'transparent'
  }

  });

export default LocationInfo;