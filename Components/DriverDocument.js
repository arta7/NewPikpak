
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const DriverDocument = (props) => {

  return (

<View style = {{width: props.CWidth, height: props.CHeight, justifyContent: 'center', alignItems: 'center'}}>

    <TouchableOpacity style = {{width: props.IWidth, height: props.IHeight}}>

        <Image source = { props.ImageSrc } resizeMode = 'center' style={{width: '100%', height: '100%'}}/>
                            
    </TouchableOpacity>

    <Text style = {{marginTop: props.TitleTopMargin}}>{props.Title}</Text>

</View>


);
 };

 const styles = StyleSheet.create({
  
  
  _Text : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontSize : wp('4%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: wp('5%')
  },
  _Text2 : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3%'), 
    fontWeight: '100',
    color: '#797979'
  }

  });
 
 export default DriverDocument;