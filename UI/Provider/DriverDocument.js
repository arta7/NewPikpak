import React, { useEffect, useRef, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import Modal from 'react-native-modal';
import BorderedTextBoxWithButton from '../../Components/BorderedTextBoxWithButton';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import RadioButton from '../../Components/RadioButton';
import MenuItem from '../../Components/MenuItem';
import BorderedTextBox from '../../Components/BorderedTextBox';
import BorderedMaskedTextBox from '../../Components/BorderedMaskedTextBox';
import ImagePicker from 'react-native-image-picker';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { PDData} from '../../Redux/ProfessionalDetailsData';
import { LoginData } from '../../Redux/LoginData'
import AsyncStorage from '@react-native-community/async-storage';

const DriverDocument = (props) => {


const _FisrtAddress = useRef(null)
const _SecondAddress = useRef(null)
const _ZipCode = useRef(null)


// ******************************************************
const [VehicleImage, setVehicleImage] = useState('')
const [VehicleImageFileName, setVehicleImageFileName] = useState('')
const [DrivingLicenseImage, setDrivingLicenseImage] = useState('')
const [DrivingLicenseImageFileName, setDrivingLicenseImageFileName] = useState('')
const [VehicleInsuranceImage, setVehicleInsuranceImage] = useState('')
const [VehicleInsuranceImageFileName, setVehicleInsuranceImageFileName] = useState('')
const [VehicleRegistrationImage, setVehicleRegistrationImage] = useState('')
const [VehicleRegistrationImageFileName, setVehicleRegistrationImageFileName] = useState('')
const [FirstAddress, setFirstAddress] = useState('')
const [SecondAddress, setSecondAddress] = useState('')
const [State_Id, setState_Id] = useState('')
const [State, setState] = useState('')
const [City_Id, setCity_Id] = useState('')
const [City, setCity] = useState('')
const [ZipCode, setZipCode] = useState('')

const [StateList_Visible, setStateList_Visible] = useState(false)
const [CityList_Visible, setCityList_Visible] = useState(false)

const [Loader_Visible, setLoader_Visible] = useState(false)

const [StateList, setStateList] = useState([]);
const [CityList, setCityList] = useState([]);


let GetUserData = async()=> {
    
  let User_Id =  await AsyncStorage.getItem("user_id")
  let Username =  await AsyncStorage.getItem("username")
  let Role = await AsyncStorage.getItem("role")
  
  console.log('User Id: ',User_Id)

  console.log('User Id is : ', LoginData.user_id)
    if(User_Id != '' && User_Id != null)
    {
      LoginData.user_id = User_Id.toString();
      console.log('User Id is : ', LoginData.user_id)
      LoginData.username = Username.toString()
      LoginData.role = Role.toString()
    }
 
}

let GetSelectedState=(Id, Title)=>{
  setState_Id(Id)
  setState(Title)
  setStateList_Visible(false)
  GetCitiesList(Id)
}

let GetSelectedCity=(Id, Title)=>{
  setCity_Id(Id)
  setCity(Title)
  setCityList_Visible(false)
}

let GetStateList = async()=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.State.GetStateList, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---------------')
               setStateList(response.data.states)
               
              //  console.log('------ ', VehicleList.length)
        }
        else
        {
          // UserLogout()

        }
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
  
 })
}

let GetCitiesList = async(_State_Id)=>{
    setLoader_Visible(true)
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.State.GetCitiesList + _State_Id, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---------------')
              //  setColorList(response.data.colors)
               setCityList(response.data.cities)
              //  console.log('------ ', ColorList.length)
              //  console.log('------ ', MakeList.length)
              setLoader_Visible(false)
        }
        else
        {
          // UserLogout()
          setLoader_Visible(false)
        }
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
   setLoader_Visible(false)
 })
}

let SetProfessionalDetail = async(_user_id,
                                  _organization_type,
                                  _vehicle_id,
                                  _make_id,
                                  _model_id,
                                  __year,
                                  _color_id,
                                  _tow_hitch,
                                  _trailer,
                                  _lift_up_to,
                                  _address_1,
                                  _state,
                                  _city,
                                  _zip_code,
                                  _vehicle_photo,
                                  _vehicle_inspection_form,
                                  _vehicle_insurance,
                                  _vehicle_registration,
                                  _trailer_open,
                                  _equipment_id,
                                  // _merchant,
                                  _max_weight,
                                  _bed_length,
                                  _address_2)=>{


  setLoader_Visible(true)
  
  // var params = {

  //   user_id : _user_id,
  //   organization_type : _organization_type,
  //   vehicle_id : _vehicle_id,
  //   make_id : _make_id,
  //   model_id : _model_id,
  //   year : __year,
  //   color_id : _color_id,
  //   tow_hitch : _tow_hitch,
  //   trailer : _trailer,
  //   lift_up_to : _lift_up_to,
  //   address_1 : _address_1,
  //   state : _state,
  //   city : _city,
  //   zip_code : _zip_code,
  //   vehicle_photo : _vehicle_photo,
  //   vehicle_inspection_form : _vehicle_inspection_form,
  //   vehicle_insurance : _vehicle_insurance,
  //   vehicle_registration : _vehicle_registration,
  //   trailer_open : _trailer_open,
  //   equipment_id : _equipment_id,
  //   // merchant : merchant,
  //   max_weight : _max_weight,
  //   bed_length : _bed_length,
  //   address_2 : _address_2

  // }

  var params = new FormData();
  params.append('user_id',_user_id)
  params.append('organization_type',_organization_type)
  params.append('vehicle_id',_vehicle_id)
  params.append('make_id',_make_id)
  params.append('model_id',_model_id)
  params.append('year',__year)
  params.append('color_id',_color_id)
  params.append('tow_hitch',_tow_hitch)
  params.append('trailer',_trailer)
  params.append('lift_up_to',_lift_up_to)
  params.append('address_1',_address_1)
  params.append('state',_state)
  params.append('city',_city)
  params.append('zip_code',_zip_code)
  params.append('vehicle_photo',_vehicle_photo)
  params.append('vehicle_inspection_form',_vehicle_inspection_form)
  params.append('vehicle_insurance',_vehicle_insurance)
  params.append('vehicle_registration',_vehicle_registration)
  params.append('trailer_open',_trailer_open)
  params.append('equipment_id',_equipment_id)
  params.append('max_weight',_max_weight)
  params.append('bed_length',_bed_length)
  params.append('address_2',_address_2)

  console.log('params : ',params)

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      'Content_Type' : 'multipart/form-data'
    }
   }

  axios.post(APIMaster.URL +
     APIMaster.ProfessionalDetail.SetProfessionalDetail, params, axiosConfig)
  .then((response)=> {
          
          console.log('reponse.data vhicle data',response.data,response.data.status)  
          

          
          console.log('**-------***')
          

          if(response.data.status == 1)
              {
                // AsyncStorage.setItem("User_Id",LoginData.user_id)
                // AsyncStorage.setItem("Username",LoginData.username)
                // AsyncStorage.setItem("Role",LoginData.role)
                // console.log('Logout Successfully...')
               // Toast.show(response.data.message)
                // console.log(LoginData.role)
                AsyncStorage.setItem('InlineStatus',1)
                // props.navigation.replace('Home')
                

                
              }
              else
              {
                Toast.show(response.data.message)
              }
              
              setLoader_Visible(false)
  })
  .catch( (error)=> {
    console.log('Error : ',error)  
    setLoader_Visible(false)
    //setshowIndicator(false)
   
  })


}

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

let launchCamera=(_image_index)=>{

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    console.log('File Name = ', response.fileName);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        
      switch(_image_index)
      {
        case 1:
          
          setVehicleImage('')
          setVehicleImageFileName('')
          return;

        case 2:
          setDrivingLicenseImage('')
          setDrivingLicenseImageFileName('')
          return;

        case 3:
          setVehicleInsuranceImage('')
          setVehicleInsuranceImageFileName('')
          return;

        case 4:
          setVehicleRegistrationImage('')
          setVehicleRegistrationImageFileName('')
          return;       
      }
      
    } else {
      
      var fileImage = {
        uri: 'file:///'+response.path,
        type:response.type,
        name:response.fileName,
       }
      switch(_image_index)
      {
        case 1:
         
          setVehicleImage(fileImage)
          setVehicleImageFileName(response.fileName)
          return;

        case 2:
          setDrivingLicenseImage(fileImage)
          setDrivingLicenseImageFileName(response.fileName)
          return;

        case 3:
          setVehicleInsuranceImage(fileImage)
          setVehicleInsuranceImageFileName(response.fileName)
          return;

        case 4:
          setVehicleRegistrationImage(fileImage)
          setVehicleRegistrationImageFileName(response.fileName)
          return;         
      }
    }
  });

}

let LoadCityList=()=>{
  if(State_Id == '' || State_Id == null)
  {
    Toast.show('Please select state first')
  }
  else
  {
    setCityList_Visible(true)
  }
}

let DataValidation=()=>{

  console.log(LoginData.user_id)

                    if(FirstAddress == '' && SecondAddress == '')
                            {
                              Toast.show('Please enter your address')
                              
                              _FisrtAddress.current.focus()
                            }
                            else if(State == '')
                                  {
                                    Toast.show('Please select your State')
                                  }
                                  else if(City == '')
                                        {
                                          Toast.show('Please select your City')
                                        }
                                        else if( VehicleImageFileName == '')
                                        {
                                          Toast.show('Please Fill Vehicle Photo')
                                        }
                                        else if( DrivingLicenseImageFileName == '')
                                        {
                                          Toast.show('Please Fill  Driving License Photo')
                                        }
                                        else if( VehicleInsuranceImageFileName == '')
                                        {
                                          Toast.show('Please Fill Vehicle Insurance Photo')
                                        }
                                        else if( VehicleRegistrationImageFileName == '')
                                        {
                                          Toast.show('Please Fill Vehicle Registration Photo')
                                        }


                                        else if(ZipCode == '')
                                              {
                                                Toast.show('Please enter Zip Code')
                                              }
                                              else
                                              {
                                                PDData.vehicle_photo = VehicleImage
                                                PDData.vehicle_inspection_form = DrivingLicenseImage
                                                PDData.vehicle_insurance = VehicleInsuranceImage
                                                PDData.vehicle_registration = VehicleRegistrationImage
                                                PDData.address_1 = FirstAddress
                                                PDData.address_2 = SecondAddress
                                                PDData.state = State
                                                PDData.city = City
                                                PDData.zip_code = ZipCode

                                                Toast.show('Data Validation Successful')

                                                SetProfessionalDetail(LoginData.user_id,
                                                                      PDData.organization_type,
                                                                      PDData.vehicle_id,
                                                                      PDData.make_id,
                                                                      PDData.model_id,
                                                                      PDData._year,
                                                                      PDData.color_id,
                                                                      PDData.tow_hitch,
                                                                      PDData.trailer,
                                                                      PDData.lift_up_to,
                                                                      PDData.address_1,
                                                                      PDData.state,
                                                                      PDData.city,
                                                                      PDData.zip_code,
                                                                      PDData.vehicle_photo,
                                                                      PDData.vehicle_inspection_form,
                                                                      PDData.vehicle_insurance,
                                                                      PDData.vehicle_registration,
                                                                      PDData.trailer_open,
                                                                      PDData.equipment_id,
                                                                      PDData.max_weight,
                                                                      PDData.bed_length,
                                                                      PDData.address_2
                                                                      )
                                                  
                                                  props.navigation.replace('Home')
                                              }
}

useEffect(()=>{
  GetUserData()
  GetStateList()
  console.log('=> ', LoginData.user_id)
  },[])

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Professional Details'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}} />

      <ScrollView showsVerticalScrollIndicator = {false}>

      <View style = {{width: '100%', height: hp('78%'), justifyContent: 'flex-start', alignItems: 'center'}}>
        
        <View style = {{width: '100%', height: hp('12%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
          <View style = {{width: '100%', height: hp('4%'), justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row', backgroundColor: 'transpanert'}}>
          
            <View style = {{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
                <Text style = {styles._Text}>Vehicle Photo</Text>
            </View>   

            <View style = {{width: '70%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
                <Text style = {[styles._Text, {paddingLeft: 0, fontSize : wp('2.75%')}]}>(Your vehicle’s current photo)</Text>
            </View>   

          </View>

          <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
          <BorderedTextBoxWithButton BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {''} LocTitleColor = {'#000'}
                    Value = {VehicleImageFileName} IsTextBox = {false} FontSize = {wp('3%')}
                    OnPressFunction = {()=>launchCamera(1)}
                    HasIcon = {true} IconName = {'camera-wireless'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {wp('6%')} ShowComboIcon = {true}/>

                      
          </View>
                    
        </View>

        <View style = {{width: '100%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
            <View style = {{width: '100%', height: hp('4%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
                <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
                    <Text style = {styles._Text}>Driving License</Text>
                </View>   
   

            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
            
                <BorderedTextBoxWithButton BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                        LocTitle = {''} LocTitleColor = {'#000'}
                        Value = {DrivingLicenseImageFileName} IsTextBox = {false} FontSize = {wp('3%')}
                        OnPressFunction = {()=>launchCamera(2)}
                        HasIcon = {true} IconName = {'camera-wireless'} IconColor = {'#E1E1E1'} 
                        IconType = {"material-community"} IconSize = {wp('6%')} ShowComboIcon = {true}/>

                        
            </View>
                    
        </View>

        <View style = {{width: '100%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
            <View style = {{width: '100%', height: hp('4%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
                <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
                    <Text style = {styles._Text}>Vehicle Insurance</Text>
                </View>   
   

            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
            
                <BorderedTextBoxWithButton BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                        LocTitle = {''} LocTitleColor = {'#000'}
                        Value = {VehicleInsuranceImageFileName} IsTextBox = {false} FontSize = {wp('3%')}
                        OnPressFunction = {()=>launchCamera(3)}
                        HasIcon = {true} IconName = {'camera-wireless'} IconColor = {'#E1E1E1'} 
                        IconType = {"material-community"} IconSize = {wp('6%')} ShowComboIcon = {true}/>

                        
            </View>
                    
        </View>

        <View style = {{width: '100%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
            <View style = {{width: '100%', height: hp('4%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
                <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
                    <Text style = {styles._Text}>Vehicle Registration</Text>
                </View>   
   

            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
            
                <BorderedTextBoxWithButton BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                        LocTitle = {''} LocTitleColor = {'#000'}
                        Value = {VehicleRegistrationImageFileName} IsTextBox = {false} FontSize = {wp('3%')}
                        OnPressFunction = {()=>launchCamera(4)}
                        HasIcon = {true} IconName = {'camera-wireless'} IconColor = {'#E1E1E1'} 
                        IconType = {"material-community"} IconSize = {wp('6%')} ShowComboIcon = {true}/>

                        
            </View>
                    
        </View>

        <View style = {{width: '100%', height: hp('32%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
          <View style = {{width: '100%', height: hp('4%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
          
            <Text style = {styles._Text}>Address</Text>  

            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            
                <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                        LocTitle = {'First Address'} LocTitleColor = {'#000'}
                        PointTitle = {'A'} Value = {FirstAddress} IsTextBox = {true}
                        MultiLine = {false} ControlName = {_FisrtAddress}
                        OnChangeFunction = {setFirstAddress} />
            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            
                <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {'Second Address'} LocTitleColor = {'#000'}
                            PointTitle = {'A'} Value = {SecondAddress} IsTextBox = {true}
                            MultiLine = {false} ControlName = {_SecondAddress}
                            OnChangeFunction = {setSecondAddress} />
            </View>

            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
                <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'State'} LocTitleColor = {'#000'}
                    Value = {State} IsTextBox = {false} FontSize = {wp('4%')}
                    OnPressFunction = {()=>{setStateList_Visible(true)}}
                    />
            </View>
                      
            <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            <View style = {{width: '48%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
                {/* <BorderedTextBox BoxWidth = {'89%'} BoxHeight = {'85%'}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {'City'} LocTitleColor = {'#000'}
                            PointTitle = {'A'} Value = {City} IsTextBox = {true}
                            MultiLine = {false} OnChangeFunction = {setCity} /> */}

                    <BorderedTextBox BoxWidth = {'89%'} BoxHeight = {'85%'}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {'City'} LocTitleColor = {'#000'}
                            Value = {City} IsTextBox = {false} FontSize = {wp('4%')}
                            OnPressFunction = {()=>{LoadCityList()}}
                            />

            </View>

            <View style = {{width: '52%', height: '100%', paddingLeft: 15, justifyContent: 'flex-end', alignItems: 'flex-start', backgroundColor: 'transpanert'}}>
            
                <BorderedMaskedTextBox BoxWidth = {'89%'} BoxHeight = {'85%'}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {'Zip Code'} LocTitleColor = {'#000'}
                            PointTitle = {'A'} Value = {ZipCode} IsTextBox = {true}
                            MultiLine = {false} OnChangeFunction = {setZipCode} ref = {_ZipCode}
                            MaxLen = {9} MaskType = {'custom'} keyboardType = {'numeric'} Mask = {'99999-9999'}/>

            </View>

            </View>
                    
        </View>

        
        
                    
      </View>


      <View style = {{width: '100%', height: hp('13%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Submit'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>
        
                    
      </View>


      
      </ScrollView>  

      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={StateList_Visible}
          onBackdropPress={() => setStateList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select State</Text>

            </View>

            <FlatList
            data={ StateList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedState(item._id, item.name)}/>
              
            )}
            />

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={CityList_Visible}
          onBackdropPress={() => setCityList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select City</Text>

            </View>

            <FlatList
            data={ CityList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedCity(item._id, item.name)}/>
              
            )}
            />

          </View>

        </Modal>

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
    backgroundColor: ColorPalet.DriverBackground
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
    fontSize : wp('3.25%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: wp('5%')
  },
  CheckboxText : {
    width: '100%',
    textAlign: 'left',
    fontSize : wp('3.25%'), 
    fontWeight: '200', 
    color: '#908E8E'
  },

  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 
 export default DriverDocument;