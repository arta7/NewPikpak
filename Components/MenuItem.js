
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const MenuItem = (props) => {

  return (

        <TouchableOpacity style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {props.Function}>

          <Text style = {[styles._Text,{paddingLeft: 15, fontSize : wp('3.5%'), color: '#9B9B9B'}]}>{props.ItemTitle}</Text>

        </TouchableOpacity>

                              
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
    paddingLeft: 30
  }

  });

export default MenuItem;