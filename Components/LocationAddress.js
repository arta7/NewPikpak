
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';
import Button from './Button';



const LocationAddress = (props) => {

  return (

<View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

    <View style = {{width: '100%', height: '40%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

            <Icon name = {'map-marker'} color= {'#B8BBBD'} type = {"material-community"} size={wp('7%')}/>

        </View>

        <View style = {{width: 'auto', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {styles._Text}>{props.AddressTitle}</Text>

        </View>

    </View>

    <View style = {{width: '100%', height: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: wp('20%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

        

        </View>

        <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {styles._Text2}>{props.Address}</Text>

        </View>

    </View>

</View>




);
 };

 const styles = StyleSheet.create({
  
  
  _Text : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '100', 
    color: 'black'
  },
  _Text2 : {
    width: 'auto',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize : wp('3.5%'), 
    flexWrap : 'wrap',
    fontWeight: '100',
    color: '#797979',
    paddingRight: 60
  }

  });
 
 export default LocationAddress;