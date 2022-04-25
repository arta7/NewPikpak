import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioButtonNoLabel from './RadioButtonNoLabel';
import { Icon } from 'react-native-elements';


const ElevatorBox = (props) => {


  

  return (
<View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'flex-start', alignItems: 'center', 
                          backgroundColor: 'transparent', borderWidth: 1, borderColor: props.BorderColor,
                          borderRadius: props.BorderRadius, backgroundColor: props.BorderColor,
                          flexDirection: 'row'}}>

            
          <View style = {{width: '10%', height: '100%', backgroundColor: 'transparent'}}>
              <RadioButtonNoLabel RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'}
                       Selected = {props.HasElevator} Function = {props.Function}/>
          </View>

          <View style = {{width: '90%', height: '100%', backgroundColor: 'transparent'}}>
              <Text style = {{width: '100%', height: '100%',color: 'black', fontSize: wp('3.5%'), textAlign: 'left', textAlignVertical: 'center'}}>{props.RadioBattunText}</Text>
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

export default ElevatorBox;