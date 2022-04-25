import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet,TextInput
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ColorPalet } from '../Header/Header';




const TextBoxButton = (props) => {


  const [isFocused, setIsFocused] = useState(false)
  const [_value, set_value] = useState('')

  return (

    <View style = {{width: '90%', height: hp('6%'), backgroundColor: 'transparent', marginTop: props.MarginTop}}>

      <View style = {{width: '100%', height: '30%', backgroundColor: 'transparent'}}>


      </View>

      <Text style = {{backgroundColor: 'transparent', position: 'absolute',
                      fontSize: isFocused ? wp('3.25%') : props.notEmpty ? wp('3.25%') : wp('5%'), 
                      top: isFocused ? hp('-1%') : props.notEmpty ? hp('-1%') : hp('1%'),
                      color: isFocused ? '#FB3E76' : '#908E8E'}}>{props.Title}</Text>
        <TouchableOpacity onPress = {props.Function}>
            <TextInput  style = {{width: '100%', height: '85%', textAlignVertical: 'center', 
                                    paddingVertical: 0, backgroundColor: 'transparent', fontSize: 20, 
                                    color: '#000', borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}} 
                                    onFocus = {()=>setIsFocused(true)} onBlur = {()=>setIsFocused(false)} 
                                    value = {props.Value.toString()} 
                                    secureTextEntry = {props.IsSecure} keyboardType = {props.KeyboardType} 
                                    editable = {props.EditEnable} maxLength = {props.MaxLen} 
                                    />
        </TouchableOpacity>
      
      {/* <View style = {{width: '100%', height: '4%', backgroundColor: '#908E8E'}}> */}


      {/* </View> */}

    </View>



   );
 };

 
 export default TextBoxButton;