import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ColorPalet } from '../Header/Header';
import { TextInputMask } from 'react-native-masked-text'



const MaskedTextBox = (props) => {


  const [isFocused, setIsFocused] = useState(false)
  const [_value, set_value] = useState('')

  return (

    <View style = {{width: '90%', height: hp('6%'), backgroundColor: 'transparent'}}>
                     {/* borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2, marginTop: props.MarginTop}}> */}

      <View style = {{width: '100%', height: '30%', backgroundColor: 'transparent'}}>


      </View>

      {/* <Text style = {{backgroundColor: 'transparent', position: 'absolute',
                      fontSize: isFocused ? 13 : props.notEmpty ? 13 : 20, 
                      top: isFocused ? hp('-1%') : props.notEmpty ? hp('-1%') : hp('2%'),
                      color: isFocused ? '#FB3E76' : '#908E8E'}}>{props.Title}</Text> */}

      <Text style = {{backgroundColor: 'transparent', position: 'absolute',
                      fontSize: isFocused ? wp('3.25%') : props.notEmpty ? wp('3.25%') : wp('5%'), 
                      top: isFocused ? hp('-1%') : props.notEmpty ? hp('-1%') : hp('1%'),
                      color: isFocused ? '#FB3E76' : '#908E8E'}}>{props.Title}</Text>

      {/* <TextInput  style = {{width: '100%', height: '70%', paddingVertical: 0, backgroundColor: 'transparent', fontSize: 20, color: props.TextColor, 
                    borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}} 
                  onFocus = {()=>setIsFocused(true)} onBlur = {()=>setIsFocused(false)} 
                  onChangeText = {(v)=>props.setValue(v)} value = {props.Value} 
                  secureTextEntry = {props.IsSecure} keyboardType = {props.KeyboardType} 
                  editable = {props.EditEnable} maxLength = {props.MaxLen} 
                  /> */}
      <TextInputMask style = {{width: '100%', height: '70%', paddingVertical: 0, backgroundColor: 'transparent', fontSize: 20, color: props.TextColor, 
                    borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}} 
                    onFocus = {()=>setIsFocused(true)} onBlur = {()=>setIsFocused(false)}
                    keyboardType = {props.KeyboardType}  editable = {props.EditEnable}
                    type={props.MaskType} value={props.Value} onChangeText={(v)=>props.SetValue(v)}
                    options = {{mask: props.Mask}} ref = {props.ControlName}
                  />
              
      {/* <View style = {{width: '100%', height: '4%', backgroundColor: '#908E8E'}}> */}


      {/* </View> */}

    </View>



   );
 };

 
 export default MaskedTextBox;