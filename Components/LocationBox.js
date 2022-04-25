import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const LocationBox = (props) => {

  

  return (
<View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: 'transparent', borderWidth: 1, borderColor: props.BorderColor,
                          borderRadius: props.BorderRadius, flexDirection: 'row'}}>

            <View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
              <View style = {{width: wp('10%'), height:  wp('10%'), borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: props.PointColor}}>
              
                <Text style = {[styles._Text, {height: '100%', width: '100%', textAlign: 'center', textAlignVertical: 'center', 
                                paddingVertical: 0, paddingLeft: 0, fontSize : wp('5%'), fontWeight: 'bold'}]}>{props.PointTitle}</Text>

              </View>

            </View>

            <TouchableOpacity style = {{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}
                                disabled={props.DisableItem}
                              onPress = {props.ButtonFunction}>
            
              <TextInput style = {[styles._Text, {width: '100%', height: '100%',paddingLeft: 10, color: props.LocTitleColor}]} 
                                  placeholder = {props.LocTitle} placeholderTextColor = {'9B9B9B'}
                                  value = {props.Value}
                                  numberOfLines = {2} multiline = {true} editable = {false} />

            </TouchableOpacity>

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
    paddingVertical: 0
  }

  });

export default LocationBox;