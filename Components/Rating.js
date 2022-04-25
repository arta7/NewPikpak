import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioButtonNoLabel from './RadioButtonNoLabel';
import { Icon } from 'react-native-elements';


const Rating = (props) => {


    const [RateNumber, setRateNumber] = useState(props.DefualtRatingNumber)

    let SetRating = (Point) =>
    {
      switch(Point)
      {
        case 0:
          setRateNumber([false, false, false, false, false])
        return
  
        case 1:
          setRateNumber([true, false, false, false, false])
        return
  
        case 2:
          setRateNumber([true, true, false, false, false])
        return
  
        case 3:
          setRateNumber([true, true, true, false, false])
        return
  
        case 4:
          setRateNumber([true, true, true, true, false])
        return
  
        case 5:
          setRateNumber([true, true, true, true, true])
        return
      }
    }
  

  return (



<View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}> 

<View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 

  <Text style = {styles._Text2}>Rate: </Text>

</View>

<View style = {{width: '85%', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}> 

  <TouchableOpacity style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                    onPress = {() => {SetRating(1)}}>

    <Icon name = 'star' size = {wp('4%')} color={RateNumber[0]?'#6A6A6A':'#9B9B9B'} type="material-community" />

  </TouchableOpacity>

  <TouchableOpacity style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                    onPress = {() => {SetRating(2)}}>

    <Icon name = 'star' size = {wp('4%')} color={RateNumber[1]?'#6A6A6A':'#9B9B9B'} type="material-community" />

  </TouchableOpacity>

  <TouchableOpacity style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                    onPress = {() => {SetRating(3)}}>

    <Icon name = 'star' size = {wp('4%')} color={RateNumber[2]?'#6A6A6A':'#9B9B9B'} type="material-community" />

  </TouchableOpacity>

  <TouchableOpacity style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                    onPress = {() => {SetRating(4)}}>

    <Icon name = 'star' size = {wp('4%')} color={RateNumber[3]?'#6A6A6A':'#9B9B9B'} type="material-community" />

  </TouchableOpacity>

  <TouchableOpacity style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                    onPress = {() => {SetRating(5)}}>

    <Icon name = 'star' size = {wp('4%')} color={RateNumber[4]?'#6A6A6A':'#9B9B9B'} type="material-community" />

  </TouchableOpacity>

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

export default Rating;