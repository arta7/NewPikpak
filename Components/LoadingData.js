import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




const Loading_Data = (props) => {

  return (

    <View style={{width:wp('70%'), height: hp('14%'),   backgroundColor: '#FFF'}}>

            <View style = {{width: '100%', height: '40%'}}>

              <Text style = {{paddingLeft : 10, textAlignVertical: 'center', fontWeight: 'bold', height: '100%'}}>PikPak</Text>

            </View>

            <View style = {{width: '100%', height: '60%', flexDirection: 'row'}}>

            <View style = {{width: '35%', height: '100%'}}>

            <ActivityIndicator 
              size= {wp('12%')} color='#ECA017' 
            />

            </View>

            <View style = {{width: '65%', height: '100%'}}>

              <Text style={{height: '100%', textAlignVertical: 'center', fontSize: wp('4%')}}>Loading</Text>

            </View>

            </View>

          </View>
   );
 };

 
 export default Loading_Data;