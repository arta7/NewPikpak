import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const NotificationItem = (props) => {


  

  return (
    <TouchableOpacity style ={{width: 'auto', height: props.ItemHeight,
     backgroundColor: props.ItemColor, marginTop: props.ItemTopMargin, marginHorizontal: props.ItemHorMargin}}
     onPress={props.PressItem}
     >
                
        <View style ={{width: '100%', height: '50%', backgroundColor: 'transparent'}}>
        
            <Text style={{width: 'auto', height: '100%', fontSize : props.TitleFontSize, color: props.TitleTextColor, textAlign: 'left', textAlignVertical: 'center', marginLeft: props.TitleLeftMargin}}>{props.Title}</Text>

        </View>

        <View style ={{width: '100%', height: '50%',  backgroundColor: 'Transparent'}}>
        
            <Text style={{width: 'auto', height: '100%', fontSize : props.SubTitleFontSize, color: props.SubTitleTextColor, textAlign: 'left', textAlignVertical: 'center', marginLeft: props.SubTitleLeftMargin}}>{props.SubTitle}</Text>

        </View>
    </TouchableOpacity>

          

   );
};


export default NotificationItem;