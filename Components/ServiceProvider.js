import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import Rating from './Rating';
import ProfilePicture from './ProfilePicture';


const ServiceProvider = (props) => {

    
  

  return (







        <View style = {{width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: '30%', justifyContent: 'center',  alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <Text style = {styles._Text2}>{props.Title}</Text>

            </View>

            <View style = {{width: '100%', height: '70%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center',  backgroundColor: ColorPalet.MainBackground}}>
           

                <View style = {{width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
        
                    <ProfilePicture ProfileImageSrc = {props.UserImage} />
        
                </View>
        
                <View style = {{width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
        
                    <View style = {{width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
                    
                    <Text style = {styles._Text}>{props.DriverName}</Text>
                    
                    </View>
        
                    
        
                </View>

                    <View style = {{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
        
        <View style = {{width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
        
        <Text style = {[styles._Text,{color:'red'}]}>{props.Price}</Text>
        
        </View>

        

    </View>
        
           
            </View>
        </View>
          
   );
};

const styles = StyleSheet.create({
 
 Container : {
   flex : 1,
   backgroundColor:  ColorPalet.DarkBackground
 },
 backgroundImage: {
   height: hp('80%'),
   backgroundColor: '#E9EAEF',
   opacity : 100
 },
 Item: {
   width: wp('100%'), 
   height: hp('7%'), 
   borderBottomColor: 'silver', 
   borderBottomWidth: 1, 
   flexDirection: 'row'
 },
 _Text : {
   width: '100%',
   textAlign: 'left',
   fontSize : wp('3.5%'), 
   fontWeight: 'bold', 
   color: 'black',
   paddingLeft: 10
 },
 _Text2 : {
    width: '100%',
    textAlign: 'left',
    fontSize : wp('4%'), 
    fontWeight: '100', 
    color: 'black',
    paddingLeft: 30
 }

 });

export default ServiceProvider;