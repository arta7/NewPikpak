import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { GoogleMaps } from '../Redux/GoogleMapsData';



const LocationBar = (props) => {


  const [isFocused, setIsFocused] = useState(false)
  const [_value, set_value] = useState('')

  return (

    <View style = {{width: '100%', height: '100%', backgroundColor: '#FFF', flexDirection: 'row', overflow: 'hidden'}}>

      <View style = {{width: '88%', height: '100%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'flex-start', borderRightWidth: 3, borderRightColor: 'silver'}}
                        onPress = {props.LocationBarFunc}>

        {/* <Text style={{width: '100%', height: '100%', paddingHorizontal: 15, backgroundColor: '#FFF', fontSize: wp('4%'), textAlignVertical: 'center', color: 'gray'}}>{props.LocationValue}</Text> */}
        

      </View>

      <TouchableOpacity style = {{width: '12%', height: '100%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}
                        onPress = {props.HistoryFunc}>

        <Icon name = 'history' color= '#C0C0C0' type = "material-community" size={wp('7%')} />

      </TouchableOpacity>

     {/* <View style = {{width: '89%', height: '100%', backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>

          <TextInput style={{width: '95%', height: '100%', paddingHorizontal: 15, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#FFF', fontSize: wp('3.5%')}} placeholder= 'Move To?'/>

          </View>
          <View style = {{width: '21%', height: '100%', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>

          <View style = {{width: '70%', height: '100%', backgroundColor: '#FFF', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: 'silver', borderLeftWidth: 1, overflow: 'hidden'}}>
          <TouchableOpacity style = {{width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center',  overflow: 'hidden'}}>

            
             <View style={{width: '100%', height: '100%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}>
            
              

               <Icon name = 'history' color= '#C0C0C0' type = "material-community" size={35}  />

            </View>
        
          </TouchableOpacity> 
          </View>

  </View> */}
        </View>


   );
 };

 
 export default LocationBar;