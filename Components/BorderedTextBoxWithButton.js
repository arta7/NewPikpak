import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import Button from './Button';


const BorderedTextBoxWithButton = (props) => {

  return (
          <View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'center', alignItems: 'center', 
                          backgroundColor: 'white', borderWidth: 1, borderColor: props.BorderColor, overflow: 'hidden',
                          borderRadius: props.BorderRadius}}>

              
              <View style = {{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', flexDirection: 'row'}}
                                onPress = {props.OnPressFunction}>
            
                {props.HasIcon &&
                <View style = {{width: '10%'}}>
                  <Icon name = {props.IconName} color= {props.IconColor} type = {props.IconType} size={props.IconSize} style = {{marginLeft: 5}}/>
                </View>
                }

                <Text style = {[styles._Text, {width: '70%' , height: '100%',paddingLeft: 20, color: props.Value == '' ? props.IconColor : props.BorderColor,
                              fontSize: props.FontSize}]}>{props.Value == '' ? props.LocTitle : props.Value}</Text>


                
                  <View style = {{width: '20%', height: '100%', padding: 5}}>
                    
                  <Button b_Width = {'100%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                          b_BorderRadius = {5} b_Elevation = {0}
                          t_FontSize = {wp('3%')} t_FontWeight = {'200'} 
                          t_ButtonTitle = {'Upload'} t_Elevation = {3} 
                          t_TextColor = {'white'} HasIcon = {false}
                          Function = {props.OnPressFunction}/>

                  </View>
                
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
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3.2%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30
  }

  });

export default BorderedTextBoxWithButton;