import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RadioButtonNoLabel from './RadioButtonNoLabel';
import { Icon } from 'react-native-elements';


const StairsBox = (props) => {

const [DecEnable, setDecEnable] = useState(false)
const [IncEnable, setIncEnable] = useState(true)



  return (
<View style = {{width: props.BoxWidth, height: props.BoxHeight, justifyContent: 'flex-start', alignItems: 'center', 
                          backgroundColor: 'transparent', borderWidth: 1, borderColor: props.BorderColor,
                          borderRadius: props.BorderRadius, backgroundColor: props.BorderColor,
                          flexDirection: 'row'}}>

            
          <View style = {{width: '10%', height: '100%', backgroundColor: 'transparent'}}>
              <RadioButtonNoLabel RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'}
                       Selected = {props.HasStairs} Function = {props.Function}/>
          </View>

          <View style = {{width: '45%', height: '100%', backgroundColor: 'transparent'}}>
              <Text style = {{width: '100%', height: '100%',color: 'black', fontSize: wp('3.5%'), textAlign: 'left', textAlignVertical: 'center'}}>{props.RadioBattunText}</Text>
          </View>

          <View style = {{width: '10%', height: '100%', backgroundColor: 'transparent'}}>
              
            <TouchableOpacity style={{width:'100%', height: '100%', justifyContent: 'center'}} disabled = {!props.HasStairs}
              onPress={props.DecBtnFunction}>
              <Icon name = 'minus-box' size = {wp('7%')} color={props.HasStairs?'#6A6A6A':'#9B9B9B'} type="material-community" />
            </TouchableOpacity>

          </View>

          <View style = {{width: '25%', height: '100%', backgroundColor: 'transparent'}}>
            
            <TouchableOpacity style={{width:'100%', height: '100%', justifyContent: 'center'}} disabled = {!props.HasStairs}
              onPress={props.ResetFunction}>
              
              <Text style = {{width: '100%', height: '100%',color: '#9B9B9B', fontSize: wp('3.5%'), textAlign: 'center', textAlignVertical: 'center'}}>{props.StairCount}</Text>
            
            </TouchableOpacity>

          </View>

          <View style = {{width: '10%', height: '100%', backgroundColor: 'transparent'}}>
              
            <TouchableOpacity style={{width:'100%', height: '100%', justifyContent: 'center'}} disabled = {!props.HasStairs}
              onPress={props.IncBtnFunction}>
              <Icon name = 'plus-box' size = {wp('7%')} color={props.HasStairs?'#6A6A6A':'#9B9B9B'} type="material-community" />
            </TouchableOpacity>

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

export default StairsBox;