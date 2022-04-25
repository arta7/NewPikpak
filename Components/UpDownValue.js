
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import {ColorPalet} from './../Header/Header';
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';



const UpDownValue = (props) => {

  return (
            <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <TouchableOpacity style = {{width: '80%', height: '33%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress={props.UpKeyFunction}>

                    <Icon name = {props.UpIconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize}/>
                
                </TouchableOpacity>

                <View style = {{width: '80%', height: '1.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8DD3E8'}}></View>

                <View style = {{width: '80%', height: '30%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                    <Text style = {[styles._Text,{color: '#787878', paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center', fontSize: wp('6%')}]}>{props.Value}</Text>
                
                </View>

                <View style = {{width: '80%', height: '1.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8DD3E8'}}></View>

                <TouchableOpacity style = {{width: '80%', height: '33%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress={props.DownKeyFunction}>

                    <Icon name = {props.DownIconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize}/>
                
                </TouchableOpacity>
            
            </View>
    );
};
const styles = StyleSheet.create({
  
   
    _Text : {
      width: '100%',
      textAlign: 'left',
      fontSize : wp('4%'), 
      fontWeight: '200', 
      color: 'black',
      paddingLeft: 30
    }
    });

export default UpDownValue;