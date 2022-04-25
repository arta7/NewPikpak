import React, { useRef, useState, useEffect } from 'react';
import {View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import TextBox from '../../Components/TextBox';
import MaskedTextBox from '../../Components/MaskedTextBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers';
import {Drawer} from 'native-base';
import Sidebar from './Sidebar';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import Loading_Data from '../../Components/LoadingData';
import ImagePicker from 'react-native-image-picker';


const Profile = (props) => {

  const [EditEnable, setEditEnable] = useState(false)
  const [Username, setUsername] = useState('')
  const [EmailAddress, setEmailAddress] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [ZipCode, setZipCode] = useState('')
  const [UserPic, setUserPic] = useState(null)
  const [UserPicFN, setUserPicFN] = useState(null)
  const [file_uri, setfile_uri] = useState("./../../Image/person.png")
  // const [UPic, setUPic] = useState(require(filePath.toString()))

  const [Loader_Visible, setLoader_Visible] = useState(false)

  const _phoneNumber = useRef(null)
  const _zipCode = useRef(null)

  
  const  [_data, setData] = useState()
  const  [_uri, setUri] = useState()
  const  [fileData, setFileData] = useState()
  const  [fileUri, setFileUri] = useState()
  let drawer=useRef(null)

  const options = {
    title: 'Select Image',
    cancelButtonTitle:'Cancel',
    takePhotoButtonTitle:'Take Photo',
    chooseFromLibraryButtonTitle:'Choose From Gallery ',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };  
  
  let launchCamera=()=>{
  
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      console.log('File Name = ', response.fileName);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
          
     
            setUserPic('')
            setUserPicFN('')
            
            
      } else {
        console.log('reponse image : ',response)
        var fileImage = {
          uri: 'file:///'+response.path,
          type:response.type,
          name:response.fileName,
         }
            setUserPic(fileImage)
            setUserPicFN(response.fileName)
            setfile_uri(response.uri)

            setFileData(response.data)
            setFileUri(response.uri)
          //   filePath: response,
          // fileData: response.data,
          // fileUri: response.uri
            // setUPic(require(response.path))
            
      }
    });
  
    console.log(UserPic, '====', UserPicFN)
  
  }

  let GetUserProfile = async()=>{

    setLoader_Visible(true)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      // APIMaster.User.GetUserProfile + LoginData.user_id, axiosConfig)
      APIMaster.User.GetUserProfile + LoginData.user_id, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           
           console.log('************')
     

           if(response.status == 200)
           {
           

              setUsername(response.data.username)
              setEmailAddress(response.data.email)
              setPhoneNumber(response.data.phone_number)
              setZipCode(response.data.zip_code)
              console.log("https://webapp.pikpakapp.com/storage/app/" + response.data.pic)
              setFileUri("https://webapp.pikpakapp.com/storage/app/" + response.data.pic)
              // setFileUri("./../../Image/person.png")


             



              
           }
          //   props.navigator.replace('ProfessionalDetails')
          //     // setPerfessionalDetailNotApproved_Visible(true)
          //  }
          //  else if(response.data.status == 2)
          //  {
          //     // props.navigation.replace('Home')
          //     setPerfessionalDetailNotApproved_Visible(true)
          //  }
          //  else
          //  {
          //    // Fetch Data and goto screen
          //    props.navigator.replace('ProfessionalDetailsView')
          //  }
          setLoader_Visible(false)
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
   })
  }

  let SetUserProfile = async(_phone_number, _zip_code)=>{

    setLoader_Visible(true)


    var params =new FormData();
    params.append('phone_number', _phone_number)
    params.append('zip_code',_zip_code)
    params.append('pic', UserPic)

    var axiosConfig = {
      headers:{
        // Accept : 'multipart/form-data',
        'Content_Type' : 'multipart/form-data'
      }
     }
    axios.post(APIMaster.URL +
      APIMaster.User.SetUserProfile + LoginData.user_id, params, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           
           console.log('************')
     
          setLoader_Visible(false)
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
   })
  }

  let BlurTextBox=()=>{
    _phoneNumber.current.blur();
    _zipCode.current.blur();
  }
 

  let SetEditEbable=(_state)=>
  {
    setEditEnable(_state)
  }


 
  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    console.log('drawer : ',drawer)
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  let SaveChange=()=>{
    SetEditEbable(!EditEnable);
    // BlurTextBox()
    SetUserProfile(PhoneNumber, ZipCode)
  }

  let Editting_Enable=()=>{
    SetEditEbable(!EditEnable)
    _phoneNumber.current.focus()
  }

  useEffect(()=> {
    GetUserProfile()
  },[])


  // let options = {
  //   title: 'Select Image',
  //   customButtons: [
  //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  //   ],
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };
  
    return (
  
  <Drawer ref={ drawer }  type='displace' side='left' 
   content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
  onClose={() => closeDrawer()} > 
  
  

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'My Profile'} 
               LeftIconVisible = {true} RightIconVisible = {!EditEnable}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{openDrawer()}}
               RightIconName = {'edit'} RightIconColor = {'#FFF'} 
               RightIconType = {'materialicon'} RightIconSize = {wp('7%')}
               RightIconFunction = {()=>{Editting_Enable()}} />


  <ScrollView showsVerticalScrollIndicator = {false}>
      {/* <View style = {{width: wp('100%'), height: hp('93.5%'), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent'}}> */}

      <View style = {{width: wp('100%'), height: hp('30%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>

        <TouchableOpacity style = {{width: wp('45%'), height: wp('45%'), overflow: 'hidden', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', elevation: 0}}
        onPress={()=>{launchCamera()}}>

          <Image source = { fileUri == null ? require('./../../Image/person.png') : { uri : fileUri }} resizeMode = 'contain' style={styles.logoImage}/>


        </TouchableOpacity>


      </View>

      <View style = {{width: wp('100%'), height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Username'} Value = {Username} 
                setValue = {setUsername} notEmpty = {Username.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {false}
                TextColor = {'gray'} />
        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Email Address'} Value = {EmailAddress} 
                setValue = {setEmailAddress} notEmpty = {EmailAddress.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {false}
                TextColor = {'gray'} />

        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Phone Number'} Value = {PhoneNumber} 
                setValue = {setPhoneNumber} notEmpty = {PhoneNumber.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {EditEnable}
                TextColor = {'black'} KeyboardType = {'numeric'} 
                ControlName = {_phoneNumber}/>

        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <MaskedTextBox Title = {'Zip Code'} Value = {ZipCode} 
                SetValue = {setZipCode} notEmpty = {ZipCode.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} 
                MaskType = {'custom'} keyboardType = {'numeric'} Mask = {'99999-9999'}
                ControlName = {_zipCode}/>
        </View>

      </View>

      <View style = {{width: wp('100%'), height: hp('15.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}></View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        {EditEnable &&
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{SaveChange()}}/>

        }
        </View>

        </ScrollView>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={Loader_Visible}
          // onBackdropPress={() => setLoader_Visible(false)}
          >

          <Loading_Data />

        </Modal>
    </View>  
   </Drawer>

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
    width : '100%',
    height : '100%',
    justifyContent : "center",
    opacity : 80
  },
  _Text : {
    fontSize : wp('3.2%'), 
    fontWeight: '200', 
    color: '#908E8E',
    elevation: 5
  }

  });
 
 export default Profile;