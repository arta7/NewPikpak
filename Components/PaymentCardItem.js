import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Input, Item, Label } from "native-base"
// import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';



const PaymentCardItem = (props) => {


  

  return (
    <TouchableOpacity style ={{width: 'auto', height: props.ItemHeight, backgroundColor: props.ItemColor, marginTop: props.ItemTopMargin, marginHorizontal: props.ItemHorMargin}}>
        <View style ={{width: '100%', height: '100%', flexDirection: 'row'}}> 

          <View style ={{width: '75%', height: '100%'}}> 

            <View style ={{width: '100%', height: '50%', backgroundColor: 'transparent'}}>
            
                <Text style={{width: 'auto', height: '100%', fontSize : props.CardNumberFontSize, color: props.CardNumberTextColor, textAlign: 'left', textAlignVertical: 'center', marginLeft: props.CardNumberLeftMargin}}>{props.CardNumber}</Text>

            </View>

            <View style ={{width: '100%', height: '50%',  backgroundColor: 'Transparent'}}>
            
                <Text style={{width: 'auto', height: '100%', fontSize : props.CardTypeFontSize, color: props.CardTypeTextColor, textAlign: 'left', textAlignVertical: 'center', marginLeft: props.CardTypeLeftMargin}}>{props.CardType}</Text>

            </View>

          </View>

          <View style ={{width: '25%', height: '100%'}}> 

            <View style ={{width: '100%', height: '100%', backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            
              {/* <TouchableOpacity style = {{width: wp('7.5%'), height: wp('7.5%'), 
                                  justifyContent: 'center', margin: wp('1%'),
                                  alignItems: 'center', borderRadius: 10, 
                                  borderColor: '#B8BBBD', borderWidth: 1}}
                                  onPress = {props.EditFunction}>

                <Icon name = {'edit'} color= {'#B8BBBD'} type = {"materialicon"} size={25} />

              </TouchableOpacity> */}

              
              <TouchableOpacity style = {{width: wp('7.5%'), height: wp('7.5%'), 
                                  justifyContent: 'center', margin: wp('1%'), 
                                  alignItems: 'center', borderRadius: 10, 
                                  borderColor: props.IsDefault == 1 ? 'orange' : '#B8BBBD', borderWidth: 0}}
                                  onPress = {props.SetAsDefaultFunction}>

                <Icon name = {'star'} color= {props.IsDefault == 1 ? 'orange' : '#B8BBBD'} type = {"materialicon"} size={25} />

              </TouchableOpacity>

              <TouchableOpacity style = {{width: wp('7.5%'), height: wp('7.5%'), 
                                  justifyContent: 'center', margin: wp('1%'), 
                                  alignItems: 'center', borderRadius: 10, 
                                  borderColor: '#B8BBBD', borderWidth: 0}}
                                  onPress = {props.DeleteFunction}>

                <Icon name = {'delete'} color= {'#B8BBBD'} type = {"materialicon"} size={25} />

              </TouchableOpacity>


            </View>

          </View>

        </View>

    </TouchableOpacity>
   );
};


export default PaymentCardItem;