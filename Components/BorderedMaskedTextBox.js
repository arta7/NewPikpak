import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'


const BorderedMaskedTextBox = (props) => {

  return (
<View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: '#FFF', borderWidth: 1, borderColor: props.BorderColor,
                          borderRadius: props.BorderRadius}}>

              {!props.IsTextBox && 
              <TouchableOpacity style = {{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}
                                onPress = {props.OnPressFunction}>
            
                <Text style = {[styles._Text, {width: props.HasIcon ? '90%' : '100%', height: '100%',paddingLeft: 20, color: props.Value == '' ? '#9B9B9B' : '#000',
                              fontSize: props.FontSize}]}>{props.Value == '' ? props.LocTitle : props.Value}</Text>

                {props.HasIcon &&
                <Icon name = {props.IconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize}/>
                }

              </TouchableOpacity>
              }
            
              {props.IsTextBox && 
              <TextInputMask style = {[styles._Text, {width: '100%', height: '100%',paddingLeft: 20, color: props.LocTitleColor, fontSize: props.FontSize}]} 
                                  placeholder = {props.LocTitle} placeholderTextColor = {'#9B9B9B'}
                                  value = {props.Value} numberOfLines = {2} multiline = {props.MultiLine}
                                  onChangeText = {(v)=>{props.OnChangeFunction(v)}} keyboardType = {props.keyboardType}
                                  options = {{mask: props.Mask}} ref = {props.ControlName} type={props.MaskType}/>
              }


          </View>

                   
   );
};

const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: '#EAE9EE'
  },
  _Text : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30,
    paddingVertical: 0
  }

  });

export default BorderedMaskedTextBox;