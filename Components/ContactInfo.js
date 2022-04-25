import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const ContactInfo = (props) => {

  return (

    <TouchableOpacity style = {{width: wp('100%'), height: hp('10%'), backgroundColor: ColorPalet.MainBackground}}
                        onPress = {()=>{props.Function}}>
        
        <Text style = {{width: '100%', height: '50%', fontSize: wp('4%'), textAlignVertical: 'center', textAlign: 'left', paddingLeft: 20}}>Contact Information</Text>

        <Text style = {{width: '100%', height: '50%', fontSize: wp('3.5%'), color: '#7E7E7E', textAlignVertical: 'center', textAlign: 'left', paddingLeft: 20}}>{'Email: ' + props.SupportEmail}</Text>

      </TouchableOpacity>

   );
 };

 
 export default ContactInfo;