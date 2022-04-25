import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const HelpItem = (props) => {

  return (

    <TouchableOpacity style = {{width: wp('100%'), height: hp('7%'), marginTop: hp('1%'), backgroundColor: ColorPalet.MainBackground}}
                        onPress = {props.Function}>
        
        <Text style = {{width: '100%', height: '100%', fontSize: wp('4%'), textAlignVertical: 'center', textAlign: 'left', paddingLeft: 20}}>{props.Title}</Text>


    </TouchableOpacity>

   );
 };

 
 export default HelpItem;