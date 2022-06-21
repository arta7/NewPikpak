import React, { useState, 
  useRef 
} from 'react';
import {View,
  Image, 
  StyleSheet
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

const ChangePassword = (props) => {

  const _email = useRef(null)

  const [email, setEmail] = useState('')
  const [Loader_Visible, setLoader_Visible] = useState(false)

  let BlurControls=()=>{
    _email.current.blur()
  }
  
  let ResetPassword = async(_email)=>{

  //  BlurControls()

    setLoader_Visible(true)
    
    var params = {

      email: _email,

    }
    
    console.log(params)

    axios.post(APIMaster.URL +
       APIMaster.User.ForgotPassword, params)
    .then((response)=> {

      if(response.data.status == 1)
        {

          console.log('Logout Successfully...')
          Toast.show(response.data.message,Toast.LONG)
          props.navigation.replace('SignUpIn')

        }
        else
        {
          Toast.show(response.data.message,Toast.LONG)
        }
        
        setLoader_Visible(false)
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)

    })

  }

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Change Password'} 
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
          
          <TextBox Title = {'email address'} Value = {email} 
                setValue = {setEmail} notEmpty = {email.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}/>
        </View>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: hp('2%')}}>
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {20} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Submit'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{ResetPassword(email)}}/>

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