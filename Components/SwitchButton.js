import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';




const SwitchButton = (props) => {


  

  return (
    <View style = {{width: props.Diameter * 1.8, height: props.Diameter, borderRadius: props.Diameter , justifyContent: 'center', alignItems: props.ActiveState?'flex-end':'flex-start', backgroundColor: props.ActiveState?'#2CC813':'silver'}}>

        <TouchableOpacity style = {{width: props.Diameter, height: props.Diameter, borderRadius: props.Diameter, elevation: 3, borderColor: 'silver', borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}} onPress = {props.Function}></TouchableOpacity>

    </View>
            

   );
};


export default SwitchButton;