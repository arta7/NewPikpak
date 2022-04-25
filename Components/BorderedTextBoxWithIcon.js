import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';


const BorderedTextBoxWithIcon = (props) => {

  return (
          <View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: 'white', borderWidth: 1, borderColor: props.BorderColor,
                          borderRadius: props.BorderRadius}}>

              {!props.IsTextBox && 
              <TouchableOpacity style = {{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}
                                onPress = {props.OnPressFunction}>
            
                {props.HasIcon &&
                <View style = {{width: '10%'}}>
                  <Icon name = {props.IconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize} style = {{marginLeft: 5}}/>
                </View>
                }

                <Text style = {[styles._Text, {width: props.HasIcon ? '80%' : '100%', height: '100%',paddingLeft: 20, color: props.Value == '' ? props.IconColor : props.BorderColor,
                              fontSize: props.FontSize}]}>{props.Value == '' ? props.LocTitle : props.Value}</Text>

                {props.ShowComboIcon &&
                <View style = {{width: '10%'}}>
                  <Icon name = {'angle-down'} color= {props.IconColor} type = {"font-awesome"} size={30}/>
                </View>
                }

                {props.HasButton &&
                  <View style = {{width: '10%'}}>
                    <Icon name = {'angle-down'} color= {props.IconColor} type = {"font-awesome"} size={30}/>
                  </View>
                }
              </TouchableOpacity>
              }

              
            
              {props.IsTextBox && 
              
              <View style = {{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}
                                onPress = {props.OnPressFunction}>
            
                {props.HasIcon &&
                <View style = {{width: '10%'}}>
                <Icon name = {props.IconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize} style = {{marginLeft: 5}}/>
                </View>
                }

                <TextInput style = {[styles._Text, {width: '90%', height: '100%',paddingLeft: 20, color: props.BorderColor, fontSize: props.FontSize}]} 
                           placeholder = {props.LocTitle} placeholderTextColor = {props.IconColor}
                           onChangeText = {props.OnChangeFunction} value = {props.Value}
                           numberOfLines = {2} multiline = {true} keyboardType = {props.KeyboardType} />

                
              </View>
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
    fontSize : wp('3.2%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30,
    paddingVertical: 0
  }

  });

export default BorderedTextBoxWithIcon;