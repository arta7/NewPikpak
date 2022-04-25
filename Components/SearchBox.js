import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, TextInput
} from 'react-native';
import {ColorPalet} from './../Header/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';


const SearchBox = (props) => {

  return (
<View style = {{width: '100%', height: hp('6.5%'), backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        
        <View style = {{width: '90%', height: '100%', backgroundColor: 'transparent', borderBottomWidth: 3, borderBottomColor: 'silver', flexDirection: 'row'}}>
        
        <View style = {{width: '6%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
            <Icon name = {'search'} color= {'#797979'} type = {'materialicon'} size={30} />
        </View>

        <View style = {{width: '88%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
            <TextInput style = {[styles._Text, {width: '100%', height: '100%',paddingLeft: 20, color: '#000', fontSize: wp('3.5%')}]} 
                                  placeholder = {'Keywords or Zip Codes'} placeholderTextColor = {'#9B9B9B'}
                                  onChangeText = {props.OnChangeFunction} value = {props.SearchValue}/>
        </View>

        <TouchableOpacity style = {{width: '6%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}
                          onPress = { props.OnPressFunction }>
            <Icon name = {'close-circle'} color= {'#797979'} type = {'material-community'} size={25}/>
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
    fontSize : wp('4%'), 
    fontWeight: '100', 
    color: 'black'
  }

  });

export default SearchBox;