import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CheckBox = (props) => {

  return (
    <TouchableOpacity style = {{width: hp('4%'), height: hp('4%'), borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: props.BackgroundColor}} onPress = {props.Function}>
        {props.IsVisible &&
            <Icon name = {'check'} color= {'#6A6A6A'} type = {"font-awesome"} size={25}/>
        }
    </TouchableOpacity>

            
   );
};


export default CheckBox;