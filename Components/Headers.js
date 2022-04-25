

import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';




const Headers = (props) => {

  return (

    <View style = {{width: wp('100%'), height: props.HeaderHeight, backgroundColor: ColorPalet.HeaderColor, flexDirection: 'row', elevation: 2}}>

        <View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          
          {props.LeftIconVisible &&
          <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress = {props.LeftIconFunction}>
            
            <Icon name = {'home', props.LeftIconName} color= {'#FFF', props.LeftIconColor}
             type = {"font-awesome", props.LeftIconType} size={30, props.LeftIconSize}/>
          
          </TouchableOpacity>
          }

        </View>

        <View style = {{width: '70%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          <Text style = {styles._Text}>{props.HeaderTitle}</Text>

        </View>

        <View style = {{width: '15%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

          {props.RightIconVisible &&
          <TouchableOpacity style={{width: '100%', height: '100%', justifyContent: 'center'}} onPress = {props.RightIconFunction}>
            
            <Icon name= {'home', props.RightIconName} color= {'#FFF', props.RightIconColor} 
            type = {"font-awesome", props.RightIconType} size={30, props.RightIconSize}/>
          
          </TouchableOpacity>
          }

        </View>

      </View>

   );
 };

 const styles = StyleSheet.create({
  
    Container : {
      flex : 1,
      backgroundColor: '#EAE9EE'
    },
    _Text : {
      fontSize : wp('4%'), 
      fontWeight: '100', 
      color: '#FFF'
    }
  
    });
 
 export default Headers;