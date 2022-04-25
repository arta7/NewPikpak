import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity, Image, StyleSheet, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Button from '../../Components/Button';


const SignUpIn = (props) => {

  

  return (

    <View style={styles.Container}>
      
       <View style = {{width: wp('100%'), height: hp('20%'), justifyContent: 'center', alignItems: 'center'}}>

        <Image source = {require("./../../Image/logo.png")} resizeMode = 'center' style={styles.logoImage}/>

        <Text style = {styles._Text}>Welcome</Text>

      </View>

      <ImageBackground source={require("./../../Image/background.png")} resizeMode="cover" style={styles.backgroundImage}>

      <View style = {{width: '100%', height: '70%', justifyContent: 'center', alignItems: 'center'}}>

      </View>

      <View style = {{width: wp('100%'), height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {20} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'SIGN UP'} t_Elevation = {3} 
                t_TextColor = {'black'}
                Function = {()=>{props.navigation.push('SignUp')}}/>

      </View>

      <View style = {{width: '100%', height: '5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

        <View style = {{width: '62%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent'}}>

          <Text style = {[styles._Text, {color: '#FFF', elevation: 5}]}>Already a member? </Text>

        </View>
        <TouchableOpacity style = {{width: '38%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent'}}
                          onPress = {()=>{props.navigation.push('Login')}}>

          <Text style = {[styles._Text, {elevation: 3}]}>SIGN IN</Text>

        </TouchableOpacity>

      </View>

      <View style = {{width: '100%', height: '18%', justifyContent: 'center', alignItems: 'center'}}>

      </View>

      </ImageBackground>
      
    </View>  
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.SignUpBackground
  },
  backgroundImage: {
    flex : 1,
    justifyContent : "center",
    opacity : 80
  },
  logoImage: {
    width : wp('40%'),
    height : hp('10%'),
    justifyContent : "center",
    opacity : 80
  },
  _Text : {
    fontSize : wp('4%'), 
    fontWeight: 'bold', 
    color: '#2C2B7C'
  }

  });
 
 export default SignUpIn;