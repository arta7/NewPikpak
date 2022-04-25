import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const SidebarItem = (props) => {

  return (

    <TouchableOpacity style={{marginBottom: wp('0.5%'), elevation: 1, width: '100%', height: hp('6.5%'), backgroundColor: 'white', flexDirection: 'row'}} onPress={props.Function}>
          
        <View style={{width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        
            <Icon name= {props.IconName} color= '#ADADAD' type= {props.IconType} size={hp('3.5%')}/>
        
        </View>
        
        <View style={{width: '80%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        
            <Text style={{width: '100%', height: '100%', textAlign: 'left', textAlignVertical: 'center', fontSize: wp('3.75%')}}>{props.Title}</Text>
        
        </View>
    
    </TouchableOpacity>

   );
 };

 
 export default SidebarItem;