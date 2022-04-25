
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';
import BidMove from './BidMove';
import MovesLocationAddress from './MovesLocationAddress';



const ProviderMovesItem = (props) => {

  return (

<View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

<View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

    <View style = {{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

        <Image source = { props.ImageSrc } resizeMode = 'contain' style={{width: '100%', height: '100%',overflow:'hidden'}}/>

    </View>

    <View style = {{width: '60%', height: '100%'}}>
        
        <BidMove MoveTypeTitle = {props.MoveTypeTitle} 
                 MoveDateTime = {props.MoveDateTime} 
                 MoveAmount={props.MoveAmount}
                 HasButton = {true} ButtonTitle = {props.ButtonTitle}
                 Function = {props.Function} />
                 
    </View>

</View>




<View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>

    <View style = {{width: '100%', height: '50%'}}>

        <MovesLocationAddress AddressTitle = {'Pick Up :'} Address = {props.PickupAddress} />

    </View>

    <View style = {{width: '100%', height: '50%'}}>

        <MovesLocationAddress AddressTitle = {'Delivery :'} Address = {props.DeliveryAddress} />

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
    fontSize : wp('3%'), 
    fontWeight: '100', 
    color: 'black'
  },
  _Text2 : {
    width: 'auto',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('2.5%'), 
    flexWrap : 'wrap',
    fontWeight: '100',
    color: '#797979',
    paddingRight: 60
  }

  });
 
 export default ProviderMovesItem;