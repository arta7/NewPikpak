
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';
import Button from './Button';



const BidMove = (props) => {

  return (

<View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

<View style = {{width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

  <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

    <Text style = {styles._Text}>{props.MoveTypeTitle}</Text>
  
  </View>
  <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

<Text style = {styles._Text}>{props.MoveAmount}</Text>

</View>

  <View style = {{width: '100%', height: '50%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

    <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

      <Icon name = {'clock'} color= {'#B8BBBD'} type = {"material-community"} size={wp('5%')} style = {{paddingLeft: wp('2%')}}/>
  
    </View>

    <View style = {{width: 'auto', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

      <Text style = {styles._Text2}>{props.MoveDateTime}</Text>

    </View>

  </View>

</View>


<View style = {{width: '100%', height: '40%',  justifyContent: 'center', paddingLeft: wp('2%'), alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>
{props.HasButton &&
          <Button b_Width = {'65%'} b_Height = {'70%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {props.ButtonTitle} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {props.Function}/>
}
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
    fontSize : wp('3.5%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: wp('2%')
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
 
 export default BidMove;