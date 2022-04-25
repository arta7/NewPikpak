import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import Rating from './Rating';
import ProfilePicture from './ProfilePicture';


const DriverInfo = (props) => {

    
  

  return (







        <View style = {{width: '100%', height: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
           

           <View style = {{width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
 
             <ProfilePicture ProfileImageSrc = {require("./../Image/ImagePlaceholder.png")} />
 
           </View>
 
           <View style = {{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
 
             <View style = {{width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
               
               <Text style = {styles._Text}>{props.DriverName}</Text>
               
             </View>
 
             <View style = {{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}> 
 
               <Rating DefualtRatingNumber = {[true, true, false, false, false]}/>
 
             </View>
 
             <View style = {{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}> 
 
               <View style = {{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
 
                 <Text style = {[styles._Text2, {color: 'black'}]}>Comment: </Text>
 
               </View>
 
               <View style = {{width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}> 
 
                 <Text style = {styles._Text2}>{props.MoveComment}</Text>
 
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
   fontSize : wp('2.5%'), 
   fontWeight: '100', 
   color: '#9B9B9B',
   paddingLeft: 10
 }

 });

export default DriverInfo;