import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const RadioButton = (props) => {


  

  return (
<View style = {{width: props.Width, height: hp('6%'), justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', paddingLeft: props.PaddingLeft}}>

            <TouchableOpacity style = {{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'transpanert'}}
                              onPress = {props.Function}>

              <View style = {{width: props.RadioButtonDm, height: props.RadioButtonDm, borderRadius: props.RadioButtonDm / 2, borderColor: props.RadioBorderColor, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white'}}>

                {props.Selected && 
                <View style = {{width: props.RadioButtonDm - 7, height: props.RadioButtonDm - 7, borderRadius: props.RadioButtonDm / 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: props.RadioButtonColor}}></View>
                }

              </View>

            </TouchableOpacity>

            <View style = {{width: '80%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', paddingLeft: props.TextPaddingLeft}}>
            
              <Text style = {{color: props.RadioButtonTextColor, fontSize: props.TextSize}}>{props.RadioBattunText}</Text>

            </View>

          </View>

          

   );
};


export default RadioButton;