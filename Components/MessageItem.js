
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';


const MessageItem = (props) => {
 
  
  

  

  return (

<View style = {{width: 'auto', height: 'auto', alignItems: props.IsRecieved ? 'flex-start' : 'flex-end', backgroundColor: 'transparent'}}>

<View style = {{width: 'auto', height: 'auto', alignItems: props.IsRecieved ? 'flex-start' : 'flex-end', backgroundColor: props.IsRecieved ? ColorPalet.MainBackground : ColorPalet.SignUpButton,
      elevation: 2,
      marginTop: 15,
      // marginBottom: 5,
      marginLeft: props.IsRecieved ? 20 : 80,
      marginRight: props.IsRecieved ? 80 : 20,
      borderRadius: 20,
      borderBottomLeftRadius: props.IsRecieved ? 0 : 20,
      borderBottomRightRadius: props.IsRecieved ? 20 : 0}}>
   
  <View style = {{width: 'auto', height: 'auto', alignItems: 'flex-start', backgroundColor: 'transparent'}}>
   
    <Text style = {{color: props.IsRecieved ? '#737171' :'#FFF' ,
                    fontSize: wp('3.2%'), 
                    backgroundColor: 'transparent',
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 15,
                    marginBottom: 10}}>{props.MessageText}</Text>
   
  </View>

  <View style = {{width: 'auto', height:'auto', alignItems: props.IsRecieved ? 'flex-start' : 'flex-end', backgroundColor: 'transparent'}}>
   
    <Text style = {{color: props.IsRecieved ? '#737171' :'#FFF' , 
                    fontSize: wp('2.5%'), 
                    backgroundColor: 'transparent',
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 5}}>{props.MessageTime}</Text>
   
  </View>

</View>


</View>

 
);
};

export default MessageItem;