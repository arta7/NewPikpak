import React, { useEffect, useState, useRef } from 'react';
import {View,
  Text,
  Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import TextBox from '../../Components/TextBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const ChangePassword = (props) => {

  
  const _oldPassword = useRef(null)
  const _newPassword = useRef(null)
  const _confirmPassword = useRef(null)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  let BlurControls=()=>{
    _oldPassword.current.blur()
    _newPassword.current.blur()
    _confirmPassword.current.blur()
  }

  let DataValidation =()=>{

    // BlurControls()

    if(oldPassword == '' || newPassword == '' || confirmPassword == '')
    {
      Toast.show('Please fill all items!')
    }
    else if(newPassword.length < 6)
    {
      Toast.show('Password must be more than 6 charachter!')
    }
    else if(newPassword != confirmPassword)
    {
      Toast.show('New Password and his confirm must be match!')
    }
    else
    {
      ChangePassword(LoginData.user_id, oldPassword, newPassword)
    }
  }

  let ChangePassword = async(_user_id, 
                          _old_password, 
                          _new_password)=>{
    
    
    // setLoader_Visible(true)
    

    var params = {
      user_id : _user_id,
      old_password : _old_password,
      new_password : _new_password
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    console.log(params)

    axios.post(APIMaster.URL +
       APIMaster.User.ChangePassword, params, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
            
            Toast.show(response.data.message)
            // LoginData.user_id = response.data.data._id;
            // LoginData.username = response.data.data.username;
            // LoginData.role = response.data.data.role;
            // LoginData.Code = code;
            // CheckUserActive();
            // console.log(LoginData.user_id)
            console.log('************')
            // console.log(response.data.data._id)
            
            if(response.data.status == 1)
                {
            //       AsyncStorage.setItem("user_id", response.data.data._id)
            //       AsyncStorage.setItem("username", response.data.data.username)
            //       AsyncStorage.setItem("role", response.data.data.role)
            //       console.log('---------------')
            //       console.log(response.data.data.role)
                  
                  props.navigation.goBack()

            //       setLoader_Visible(false)
                  
                }
              
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)
      //setshowIndicator(false)
     
    })


  } 

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Change Password'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}} />

      <View style = {{width: wp('100%'), height: hp('25%'), justifyContent: 'center', alignItems: 'center'}}>

        <Image source = { require("./../../Image/person.png") } resizeMode = 'center' style={styles.logoImage}/>

      </View>

      <View style = {{width: wp('100%'), height: hp('22.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        
        <View style = {{width: '100%', height: '33%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Old Password'} Value = {oldPassword} 
                setValue = {setOldPassword} notEmpty = {oldPassword.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {true} ControlName = {_oldPassword}/>
        </View>

        <View style = {{width: '100%', height: '33%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'new password'} Value = {newPassword} 
                setValue = {setNewPassword} notEmpty = {newPassword.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {true} ControlName = {_newPassword}/>

        </View>

        <View style = {{width: '100%', height: '33%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'confirm password'} Value = {confirmPassword} 
                setValue = {setConfirmPassword} notEmpty = {confirmPassword.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {true} ControlName = {_confirmPassword}/>

        </View>
        
      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: hp('2%')}}>
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {20} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Submit'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>

      </View>

      <View style = {{width: '100%', height: hp('34.5%'), justifyContent: 'center', alignItems: 'center'}}>
        
        
      </View>

    </View>  
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.MainBackground
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
    fontSize : wp('3.5%'), 
    fontWeight: 'bold', 
    color: '#000',
    elevation: 5
  }

  });
 
 export default ChangePassword;