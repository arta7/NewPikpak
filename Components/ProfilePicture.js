import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioButtonNoLabel from './RadioButtonNoLabel';
import { Icon } from 'react-native-elements';


const ProfilePicture = (props) => {


  

  return (



<View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 

<View style = {{width: wp('12'), height: wp('12'), borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

  <Image source = {props.ProfileImageSrc} style = {{width: '100%', height: '100%', borderRadius: 50, backgroundColor: ColorPalet.SignUpBackground}}/>

</View>

</View>




      
   );
};

const styles = StyleSheet.create({
 
 Container : {
   flex : 1,
   backgroundColor:  ColorPalet.DarkBackground
 },
 backgroundImage: {
   height: hp('80%'),
   backgroundColor: '#E9EAEF',
   opacity : 100
 },
 Item: {
   width: wp('100%'), 
   height: hp('7%'), 
   borderBottomColor: 'silver', 
   borderBottomWidth: 1, 
   flexDirection: 'row'
 },
 _Text : {
   width: '100%',
   textAlign: 'left',
   fontSize : wp('3.5%'), 
   fontWeight: 'bold', 
   color: 'black',
   paddingLeft: 10
 },
 _Text2 : {
   width: '100%',
   textAlign: 'left',
   fontSize : wp('2.5%'), 
   fontWeight: '100', 
   color: 'black',
   paddingLeft: 10
 }

 });

export default ProfilePicture;