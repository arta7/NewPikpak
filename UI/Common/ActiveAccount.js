import React, { useState, 
  useRef 
} from 'react';
import {View,
  Image, 
  StyleSheet,Text, TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { ColorPalet } from '../../Header/Header';
import TextBox from '../../Components/TextBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import Modal from 'react-native-modal';
import Loading_Data from '../../Components/LoadingData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import Toast from 'react-native-simple-toast';
import { LoginData } from '../../Redux/LoginData';

const ChangePassword = (props) => {

  const _email = useRef(null)

  const [active, setactive] = useState('')
  const [Loader_Visible, setLoader_Visible] = useState(false)

  let BlurControls=()=>{
    _email.current.blur()
  }

  let GetProfessionalDetails = async()=> {

    var axiosConfig = {

      headers: {
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
    }

    axios.get(APIMaster.URL + APIMaster.ProfessionalDetail.GetProfessionalDetail + LoginData.user_id, axiosConfig)
    .then((response)=> {

      Toast.show(response.data.message,Toast.LONG)
      LoginData.status = response.data.status;
      if(response.data.status == 0 && (LoginData.role == 'provider'))
       {

        props.navigation.navigate('ProfessionalDetails')

      }
      else 
      {

        props.navigation.replace('Home')

      }
    })
    .catch( (error)=> {
     console.log('Error : ',error)  
   
   })
  }

  let UserActive=(_user_id,_activeCode,_sendagain)=>{
    setLoader_Visible(true)
    var axiosConfig = {
      headers: {
        Content_Type : 'application/json'
      }
    }
    var params = {};
    if(_activeCode == null && _sendagain == null)
    {
      params = {
        'username': _user_id
      }
    }
    else if(_activeCode == null && _sendagain != null)
    {
      params = {
        'username': _user_id,
        'send_again':_sendagain
      }
    }
    else if(_activeCode != null )
    {
      params = {
        'username': _user_id,
        'activation_code':_activeCode
      }
    }
    console.log('params',params)

    axios.post(APIMaster.URL + APIMaster.User.activation,params, axiosConfig)
    .then((response)=> {
      setLoader_Visible(false)
      console.log('response.data : ',response.data)
      Toast.show(response.data.message)

      if(response.data.status == 1)
      {
        if(response.data.message == 'User Is Active' || response.data.message == "User Is Active now")
       { 
        GetProfessionalDetails()
       
       }
      }

    })
    .catch( (error)=> {
      setLoader_Visible(false)
     console.log('Error : ',error)  
   })
  }

  

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Account Activation '} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
               RightIconName = {'angle-right'} RightIconColor = {'#FFF'} 
               RightIconType = {'font-awesome'} RightIconSize = {30} />

      <View style = {{width: wp('100%'), height: hp('25%'), justifyContent: 'center', alignItems: 'center'}}>

        <Image source = { require("./../../Image/logo.png") } resizeMode = 'center' style={styles.logoImage}/>

      </View>

      <View style = {{width: wp('100%'), height: hp('7.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        
        <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Activation Code'} Value = {active} 
                setValue = {setactive} notEmpty = {active.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}/>
        </View>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: hp('2%')}}>
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {20} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Submit'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{UserActive(LoginData.username,active,null)}}/>
                

      </View>
      <View style = {{width: '100%', height: hp('2%'), justifyContent: 'center', alignItems: 'center',marginTop:20,padding:20}}
      // onPress={()=>{UserActive(LoginData.username,null,1)}}
      >
        <Text style={{fontSize:18,textAlign:'center',color:'gray'}}>We Send The Activation Code to </Text>
        <Text style={{fontSize:18,textAlign:'center',color:'gray'}}> {LoginData.email}</Text>
      </View>
      <View style = {{width: '100%', height: hp('2%'), justifyContent: 'center', alignItems: 'center',marginTop:20,flexDirection:'row'}}
     
      >
       <Text style={{fontSize:16,textAlign:'center',color:'gray'}}>Don't Get The Code?</Text>
       <TouchableOpacity style = {{}}
        onPress={()=>{UserActive(LoginData.username,null,1)}}
      >
        <Text style={{fontSize:16,textAlign:'center',color:'blue'}}>Send Again?</Text>
        </TouchableOpacity>
      </View>
      

      <View style = {{width: '100%', height: hp('34.5%'), justifyContent: 'center', alignItems: 'center'}}>
        
        
      </View>

      <Modal style={{  marginHorizontal: wp('15%')}}
        isVisible={Loader_Visible}
        >

        <Loading_Data />

      </Modal>

    </View>  
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.MainBackground
  },

  logoImage: {
    width : wp('40%'),
    height : hp('10%'),
    justifyContent : "center",
    opacity : 80
  }

  });
 
 export default ChangePassword;