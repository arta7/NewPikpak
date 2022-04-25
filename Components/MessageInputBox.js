import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView,TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Icon } from 'react-native-elements';
// import { TextInput } from 'react-native-gesture-handler';

const MessageInputBox = (props) => {
 
  
  
    const [Wraped, setWraped] = useState(false)
  

    return (

<View style = {{width: '100%', height: Wraped ? hp('10%') : hp('8%'), backgroundColor: '#FAFAFA', elevation: 3, flexDirection: 'row'}}>

<View style = {{width: '85%', height: '100%', backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
  <TextInput style = {{height: Wraped ? hp('8%') : hp('6%'), width: '95%', backgroundColor: '#FFF', borderColor: '#9B9B9B', borderWidth: 1.5, borderRadius: 25, paddingHorizontal: 20, fontSize: wp('3.5%')}} multiline = {true} 
  onContentSizeChange={e =>
    setWraped(e.nativeEvent.contentSize.height>50 ? true : false)
  } value = {props.MessageText}
  onChangeText = {(v) => props.SetMessageText(v)}/>
</View>

<View style = {{width: '15%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', paddingRight: 15}}>
  <TouchableOpacity style = {{width: hp('6%'), height: hp('6%'), 
                    backgroundColor: '#FFF',  borderColor: '#9B9B9B', 
                    borderWidth: 2, paddingLeft: 5, borderRadius: 35, 
                    justifyContent: 'center', alignItems: 'center'}}
                    onPress = {props.Function}>
    <Icon name = {'send'} color= {'#9B9B9B'} type = {"material-community"} size={hp('3.2%')}/> 
  </TouchableOpacity>
</View>

</View>

);
 };


 
 export default MessageInputBox;