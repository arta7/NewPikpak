
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';
import Button from './Button';



const BidInfo = (props) => {

  return (

<View style = {{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

<View style = {{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

  <View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

    <Text style = {styles._Text}>{props.MoveTypeTitle}</Text>
  
  </View>

  <View style = {{width: '100%', height: '50%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

    <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

      <Icon name = {'clock'} color= {'#B8BBBD'} type = {"material-community"} size={wp('5%')} style = {{paddingRight: 2}}/>
  
    </View>

    <View style = {{width: 'auto', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

      <Text style = {styles._Text2}>{props.MoveDateTime}</Text>

    </View>

  </View>

</View>

<View style = {{width: '40%', height: '100%',  justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Button b_Width = {'65%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {props.BidsCount} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                DisableButton={props.DisableButton}
                Function = {props.Function}/>

        </View>

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
 
 export default BidInfo;