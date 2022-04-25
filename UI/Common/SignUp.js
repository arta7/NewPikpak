import React, { useEffect, useRef, useState } from 'react';
import {View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import TextBox from '../../Components/TextBox';
import MaskedTextBox from '../../Components/MaskedTextBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import Modal from 'react-native-modal';
import Loading_Data from '../../Components/LoadingData';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { TextInputMask } from 'react-native-masked-text'


let EmailIsCorrect = false;


const Signup = (props) => {

  const _firstName = useRef(null)
  const _lastName = useRef(null)
  const _Username = useRef(null)
  const _emailAddress = useRef(null)
  const _password = useRef(null)
  const _confirmPassword = useRef(null)
  const _phoneNumber = useRef(null)
  const _zipCode = useRef(null)

  const [IsConsumer, setIsConsumer] = useState(false)
  const [IsDriver, setIsDriver] = useState(false)

  const [Role, setRole] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [Username, setUsername] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [Loader_Visible, setLoader_Visible] = useState(false)


  const[IsSecures,setIsSecure] = useState(true)
  

  // let SetZipCode =(str)=>
  // {
  //   _zipCode = str
  //   if(str.length >= 5)
  //   {
  //     console.log(str.substring(0, 5) + '-' + str.substring(5, str.length))
  //     setZipCode(str.substring(0, 5) + '-' + str.substring(5, str.length))
  //   }
  // }

    // useEffect(()=>{
    //   setLoader_Visible(false)
    // },[])
  let UserTypeSelection=(TypeId)=>
  {
    switch(TypeId)
    {
      case 1:
        {
          setIsConsumer(true)
          setIsDriver(false)
          setRole('consumer')
          return
        }
      case 2:
        {
          setIsConsumer(false)
          setIsDriver(true)
          setRole('provider')
          return
        }
    }
  }

  let BlurControls=()=>{
     _firstName.current.blur()
     _lastName.current.blur()
     _Username.current.blur()
     _emailAddress.current.blur()
     _password.current.blur()
     _confirmPassword.current.blur()
     _phoneNumber.current.blur()
     _zipCode.current.blur()
  }

  let DataValidation =()=>{

    // BlurControls()

    // checking filled all items
    if (Role == '' || Username == '' ||
        emailAddress == '' || password == '' ||
        confirmPassword == '' || phoneNumber == '' ||
        zipCode == '' || lastName == '' || firstName == '')
    {
      Toast.show('Please fill all data.')
    }
    else
    {
    
      // chack email address syntax

      // check pass length and complexity
      if(password.length < 6)
      {
      Toast.show('Password must be more than 6 charachter!')

        setPassword('')
        setConfirmPassword('')
        // secondTextInput.focus();
      }
      
      // check password and confirm password
      else if(password != confirmPassword)
      {
        Toast.show('Password and his confirm must be match!')

        setPassword('')
        setConfirmPassword('')
        // secondTextInput.focus();
      }

      else if(!EmailIsCorrect)
      {
        Toast.show('Email address syntax is incorrect!')

        setEmailAddress('')
      }
      else
      {
        if(Username.length >=8)
        SignUpUser('default', Role, Username, emailAddress, phoneNumber, zipCode, '','', password,'','',firstName,lastName)
        else 
        {
          Toast.show('The username must be at least 8 characters')
        }

      }

      // check phone number and zip code

    }
  }

  let UserActive=(_user_id,_activeCode,_sendagain)=>{
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
      console.log('response.data : ',response.data)
      // Toast.show(response.data.message)

    })
    .catch( (error)=> {
     console.log('Error : ',error)  
   })
  }


  let SignUpUser = async(_type, 
                          _role, 
                          _username, 
                          _email, 
                          _phone_number, 
                          _zip_code, 
                          _latitude, 
                          _longitude, 
                          _password, 
                          _google_id, 
                          _facebook_id,_first_name,_last_name)=>{
    
    
                            setLoader_Visible(true)
    

    var params = {
      type : _type,
      role : _role,
      first_name:_first_name,
      last_name:_last_name,
      username : _username,
      email : _email,
      phone_number : _phone_number,
      zip_code : _zip_code,
      latitude : _latitude,
      longitude : _longitude,
      password : _password,
      google_id : _google_id,
      facebook_id : _facebook_id
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    console.log(params)

    axios.post(APIMaster.URL +
       APIMaster.Auth.Register, params, axiosConfig)
    .then((response)=> {
            
            console.log('test sign up : ',response.data)  
            
            Toast.show(response.data.message)
            setLoader_Visible(false)
            LoginData.user_id = response.data.data._id;
            LoginData.username = response.data.data.username;
            LoginData.role = response.data.data.role;
            LoginData.email = _email;
            // LoginData.Code = code;
            // CheckUserActive();
            console.log(LoginData.user_id)
            console.log('************')
            console.log(response.data.data._id)
            
            if(response.data.status == 1)
                {
                  AsyncStorage.setItem("user_id", response.data.data._id)
                  AsyncStorage.setItem("username", response.data.data.username)
                  AsyncStorage.setItem("role", response.data.data.role)
                  console.log('---------------')
                  console.log(response.data.data.role)
                  UserActive(_username,null,null)
                  props.navigation.navigate('ActiveAccount')

                 // setLoader_Visible(false)
                  
                }
               
              
    })
    .catch( (error)=> {
      setLoader_Visible(false)
      console.log('Error : ',error)  
      // Toast.showWithGravity(error.response.data.errors)
     
      //setshowIndicator(false)
     
    })


  }

  let CheckEmailValidate = (_email) => {
    console.log(_email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(_email) === false) {
      console.log("Email is Not Correct");
      setEmailAddress(_email)
      EmailIsCorrect = false
    }
    else {
      setEmailAddress(_email)
      console.log("Email is Correct");
      EmailIsCorrect = true
    }
  }

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Sign Up'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
               RightIconName = {'angle-right'} RightIconColor = {'#FFF'} 
               RightIconType = {'font-awesome'} RightIconSize = {30} />

    <ScrollView>

      <View style = {{width: wp('100%'), height: hp('115%'), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent'}}>

        <View style = {{width: '100%', height: '5%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'white', paddingLeft: 10}}>

          <RadioButton Width = {wp('50%')} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'I need help moving'} TextSize = {wp('3%')}
                       Selected = {IsConsumer} Function = {()=>UserTypeSelection(1)}/>

          <RadioButton Width = {wp('50%')} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'I am a Mover'} TextSize = {wp('3%')}
                       Selected = {IsDriver} Function = {()=>UserTypeSelection(2)}/>

        </View>

        <View style = {{width: wp('100%'), height: hp('60%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        
        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'first name'} Value = {firstName} 
                setValue = {setFirstName} notEmpty = {firstName.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}
                autoc={'words'}
                MaxLen = {30} ControlName = {_firstName} />
        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'last name'} Value = {lastName} 
                setValue = {setLastName} notEmpty = {lastName.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}
                autoc={'words'}
                MaxLen = {30} ControlName = {_lastName} />

        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'username'} Value = {Username} 
                setValue = {setUsername} notEmpty = {Username.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}
                MaxLen = {30} ControlName = {_Username}
                autoc={'none'}
                />

        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'email address'} Value = {emailAddress} 
                setValue = {CheckEmailValidate} notEmpty = {emailAddress.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false}  ControlName = {_emailAddress}
                autoc={'none'}
                />
        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'password'} Value = {password} 
                setValue = {setPassword} notEmpty = {password.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {IsSecures} MaxLen = {30}  ControlName = {_password}
                autoc={'none'}
                showIcon={true}
                ChangeSecure={()=>{setIsSecure(!IsSecures)}}
                />

        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'confirm password'} Value = {confirmPassword} 
                setValue = {setConfirmPassword} notEmpty = {confirmPassword.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {IsSecures} ControlName = {_confirmPassword}
                autoc={'none'}
                showIcon={true}
                ChangeSecure={()=>{setIsSecure(!IsSecures)}}
                // showIcon={true}
                // ChangeSecure={()=>{setIsSecure(!IsSecures)}}
                />

        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          {/* <TextBox Title = {'Phone Number'} Value = {phoneNumber} 
                setValue = {setPhoneNumber} notEmpty = {phoneNumber.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} MaxLen = {10}/> */}
          <MaskedTextBox Title = {'phone number'} Value = {phoneNumber} 
                SetValue = {setPhoneNumber} notEmpty = {phoneNumber.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} 
                MaskType = {'custom'} KeyboardType = {'numeric'} Mask = {'999999999999999999999999999999'}
                ControlName = {_phoneNumber} />

        </View>

        <View style = {{width: '100%', height: '12.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <MaskedTextBox Title = {'zip code'} Value = {zipCode} 
                SetValue = {setZipCode} notEmpty = {zipCode.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} 
                MaskType = {'custom'} KeyboardType = {'numeric'} Mask = {'99999-9999'}
                ControlName = {_zipCode}/>

          {/* <TextInputMask
            type={'zip-code'}
            value={zipCode}
            onChangeText={(v) => {setZipCode(v)}}
          /> */}

        </View>
        
      </View>

      <View style = {{width: ('100%'), height: hp('13%'),paddingHorizontal: wp('5%')
      ,flexDirection:'row',flexWrap:'wrap', backgroundColor: 'white'}}>
          
        <Text style = {[styles._Text,{}]}>By clicking SIGN UP, you agree to our Terms and confirm that you have read our </Text>
       
        <TouchableOpacity onPress={()=>{Linking.openURL('http://pikpakapp.com/privacy-policy/')}}>
        <Text style = {[styles._Text,{color:'blue',fontSize:wp('4%')}]}> Privacy Policy </Text>
        </TouchableOpacity>
        <View >
        <Text style = {[styles._Text,{}]}>
         Terms of use ,Including.</Text>
        </View>
        {/* <View>
        <Text style = {[styles._Text,{color:'#E4454F'}]}> Privacy Policy </Text>
        </View>
        <View>
        <Text style = {[styles._Text,{color:'#E4454F'}]}> Terms of user </Text>
        </View>
        <View>
        <Text style = {styles._Text}> ,Including.</Text>
        </View> */}
        
        {/* <View style = {{}}>
        
        <Button b_Width = {'auto'} b_Height = {'auto'} b_BackgroundColor = {'transparent'}
                b_BorderRadius = {0} b_Elevation = {0}
                t_FontSize = {wp('3%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Privacy Policy'} t_Elevation = {0} 
                t_TextColor = {'#E4454F'} HasIcon = {false}
                />

        </View> */}

        {/* <View style = {{}}>
        
        <Button b_Width = {'auto'} b_Height = {'auto'} b_BackgroundColor = {'transparent'}
                b_BorderRadius = {0} b_Elevation = {0}
                t_FontSize = {wp('3%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Terms of use'} t_Elevation = {0} 
                t_TextColor = {'#E4454F'} HasIcon = {false}/>

        </View> */}
      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center',
       alignItems: 'center', backgroundColor: 'transparent', marginTop: hp('2%')}}>
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {20} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Sign Up'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=> {DataValidation()}} />
                 {/* Function = {()=>{SignUpUser('default', Role, Username, emailAddress, */}
                                         {/* phoneNumber, zipCode, '','', password,'','')}}/> */}

      </View>

      
        
        {/* <Button b_Width = {'50%'} b_Height = {'70%'} b_BackgroundColor = {'transparent'}
                b_BorderRadius = {15} b_Elevation = {0}
                t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Forgat Password?'} t_Elevation = {3} 
                t_TextColor = {'#FC9824'} HasIcon = {false}/> */}

      

      <View style = {{width: '100%', height: hp('3%'), justifyContent: 'center', alignItems: 'center'}}>
        
        

      </View>

      <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'center'}}>
        
        {/* <Text style = {styles._Text}>Or Log in with</Text> */}

      </View>

      <View style = {{width: wp('100%'), height: hp('7%'), flexDirection: 'row'}}>

        <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          {/* <Button b_Width = {'80%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.FacebookColor}
                  b_BorderRadius = {10} b_Elevation = {3}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Facebook'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {true}
                  IconName = {'facebook-f'} IconType = {'font-awesome'} 
                  IconSize = {30} IconColor = {'white'}/> */}

        </View>

        <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          {/* <Button b_Width = {'80%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.GoogleColor}
                  b_BorderRadius = {10} b_Elevation = {3}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Google'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {true}
                  IconName = {'google-plus'} IconType = {'font-awesome'} 
                  IconSize = {30} IconColor = {'white'}
                  Function = {()=>console.log(EmailIsCorrect)}/> */}


        </View>

      </View>

      <View style = {{width: '100%', height: hp('3%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}></View>

      <View style = {{width: '100%', height: hp('0.3%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#9D9D9D'}}></View>

      <View style = {{width: '100%', height: hp('7.2%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

        <View style = {{width: '65%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#FFF'}}>

          <Text style = {[styles._Text,{fontSize : wp('3.5%'), color: '#FD7009'}]}>Already have an account? </Text>
            
        </View>
        <View style = {{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#FFF'}}>

          <Button b_Width = {'auto'} b_Height = {'auto'} b_BackgroundColor = {'transparent'}
                  b_BorderRadius = {0} b_Elevation = {0}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Sign In'} t_Elevation = {0} 
                  t_TextColor = {'#000'} HasIcon = {false}
                  Function = {()=>{props.navigation.push('Login')}}/>            
        </View>

      </View>

      </View>

    </ScrollView>

      <Modal style={{  marginHorizontal: wp('15%')}}
        isVisible={Loader_Visible}
        // onBackdropPress={() => setLoader_Visible(false)}
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
    fontSize : wp('3.2%'), 
    color: '#908E8E',
  }

  });
 
 export default Signup;