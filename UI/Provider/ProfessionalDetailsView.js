import React, { useEffect, useState, useRef} from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import Modal from 'react-native-modal';
import BorderedTextBoxWithButton from '../../Components/BorderedTextBoxWithButton';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import RadioButton from '../../Components/RadioButton';
import CheckBox from '../../Components/CheckBox';
import { VDData } from '../../Redux/VehicleDetailsData';
import Sidebar from './../Common/Sidebar';
import {Drawer} from 'native-base';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';

const ProfessionalDetails = (props) => {





// ******************************************************
const [OrganizationType, setOrganizationType] = useState('Individual')
const [VehiclePhoto, setVehiclePhoto] = useState('')
const [DrivingLicense, setDrivingLicense] = useState('')
const [VehicleInsurance, setVehicleInsurance] = useState('')
const [VehicleRegistration, setVehicleRegistration] = useState('')
const [FirstAddress, setFirstAddress] = useState('Address 1')
const [SecondAddress, setSecondAddress] = useState('Address 2')
const [State, setState] = useState('')
const [City, setCity] = useState('')
const [ZipCode, setZipCode] = useState('90025')
const [Hitch, setHitch] = useState('No')
const [Trailer, setTrailer] = useState('No')
const [TrailerOpen, setTrailerOpen] = useState('No')
const [Lift, setLift] = useState('No')
const [Vehicle, setVehicle] = useState('Pick Up')

const [ProfessionalDetailData, setProfessionalDetailData] = useState([])
const [VehicleDetailData, setVehicleDetailData] = useState([])


const [UserVehiclesList, setUserVehiclesList] = useState([
    // {key: 'User Vehicle #1', value: '1'},
  ]);

let SetVehicleDetailsData=(_vehicle_name, _product_year, _vehicle_color, _max_capacity, _max_length,
                           _vehicle_photo_uri, _driving_license_uri, _vehicle_insurance_uri, 
                           _vehicle_registration_uri)=>{

    // VDData.vehicle_id = _vehicle_id

    props.navigation.navigate('VehicleDetails', {vehicle_name: _vehicle_name, 
                                                 product_year: _product_year,
                                                 vehicle_color: _vehicle_color,
                                                 max_capacity: _max_capacity,
                                                 max_length: _max_length,
                                                 vehicle_photo_uri: _vehicle_photo_uri,
                                                 driving_license_uri: _driving_license_uri,
                                                 vehicle_insurance_uri: _vehicle_insurance_uri,
                                                 vehicle_registration_uri: _vehicle_registration_uri})

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
         
         console.log('************')
   

         if(response.data.status == 1)
         {
          AsyncStorage.setItem("States", JSON.stringify(response.data.states))
         }
         
         else
         {
           
         }
        
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
 
 })
}
  let GetProfessionalDetails = async()=>{
    var params = {
      user_id : LoginData.user_id
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.ProfessionalDetail.GetProfessionalDetail + LoginData.user_id, axiosConfig)
   .then((response)=> {
           
           console.log('Details: ', response)  
           
           console.log('************')
     

           if(response.data.status == 1)
           {
            console.log('************')
            setProfessionalDetailData(response.data)

            console.log('Address: ', response.data.user.addresses[0].address_1)
            setOrganizationType(response.data.user.professional_detail.organization_type == 'moving_company' ? 'Moving Companies & Professionals' : 'Individual Drivers')
            setFirstAddress(response.data.user.addresses[0].address_1)
            setSecondAddress(response.data.user.addresses[0].address_2)
            AsyncStorage.getItem("States").then(data => {
              if(data){
                 let stateData = JSON.parse(data)
                 console.log('S Len: ', stateData.length)
                 for(let i=0; i<stateData.length; i++)
                 {
                    if(stateData[i]._id == response.data.user.addresses[0].state)
                      setState(stateData[i].name)
                      console.log('C Len: ', stateData[i].cities.length)
                      for(let j=0; j<stateData[i].cities.length; j++)
                      {
                          if(stateData[i].cities[j]._id == response.data.user.addresses[0].city)
                          {
                              setCity(stateData[i].cities[j].name)
                              return
                          }
                          
                        


                      }


                 }

                 
                //  for(let i=0; i<cityData.length; i++)
                //  if(cityData.cities[i]._id == response.data.user.addresses[0].city)
                //  setCity(cityData.cities[i].name)
              }
            }).catch(err => console.log("error C >>>>> ",err))
            setZipCode(response.data.user.addresses[0].zip_code)

            setHitch(response.data.user.professional_detail.tow_hitch)
            setTrailer(response.data.user.professional_detail.trailer)
            setTrailerOpen(response.data.user.professional_detail.trailer_open)
            setLift(response.data.user.professional_detail.lift_up_to)

            console.log('Vehicles: ', response.data.user.vehicles)
            setUserVehiclesList(response.data.user.vehicles)
            


          //   AsyncStorage.setItem("Vehicles", JSON.stringify(response.data.user.vehicles))

            AsyncStorage.getItem("Vehicles").then(data => {
              if(data){
                 let ourData = JSON.parse(data)
                 console.log('Vehicle: ', ourData.length)



                 for(let i=0; i < ourData.length; i++)
                 {
                  let _item = [];
                  _item.push({"value": ourData[0]._id, "key": ourData[0].vehicle.name})
                  setUserVehiclesList(_item)
                 }
                    
                 console.log('UV: ', UserVehiclesList)
          //        for(let i=0; i<ourData.length; i++)
          //        {
          //       //  setUserVehiclesList({"key": ourData[i].vehicle.name, "value": ourData[i].vehicle._id})
          //       var arr = [];
          //       arr.push(ourData[i].vehicle.name);
          //       arr.push(ourData[i].vehicle._id);
                
          //       UserVehiclesList.push(arr);
          //        }

                // console.log('Len >>> ', ourData.length)
              }
            
          }).catch(err => console.log("error V >>>>> ",err))
          }
                
           else
           {
             
           }
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
   
   })
  }

  let drawer=useRef(null)
  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  useEffect(()=>{
    GetProfessionalDetails()
    GetStateList()

    },[])

  return (
    <Drawer ref={ drawer }  type='displace' side='left'  
    content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
    onClose={() => closeDrawer()} > 
  

    <View style={styles.Container}>
      
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'My Profile'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{openDrawer()}}
                />

<ScrollView showsVerticalScrollIndicator= {false}>
      <View style = {{width: '100%', height: hp('93%'), justifyContent: 'flex-start', alignItems: 'center'}}>
      
        <View style = {{width: '100%', height: '5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

            <Text style = {[styles._Text, {fontSize: wp('4%'), color: ColorPalet.SignUpButton}]}>Details</Text>

        </View>
               
        <View style = {{width: '100%', height: '10%', marginTop: 2.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

            <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>Organization Type</Text>

            <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{OrganizationType}</Text>

        </View>

        <View style = {{width: '100%', height: SecondAddress == '' ? '10%' : '18%', marginTop: 2.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

            <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>First Address</Text>

            <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{FirstAddress}</Text>

            {SecondAddress != '' &&
            <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>Second Address</Text>
            }
            {SecondAddress != '' &&
            <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{SecondAddress}</Text>
            }


        </View>

        <View style = {{width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <View style = {{width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

                <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>State</Text>

                <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{State}</Text>

            </View>

            <View style = {{width: '34%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

                <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>City</Text>

                <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{City}</Text>

            </View>

            <View style = {{width: '33%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

                <Text style = {[styles._Text, {fontSize: wp('3.75%%')}]}>Zip Code</Text>

                <Text style = {[styles._Text, {fontSize: wp('3.5%'), color: ColorPalet.DetailVeiw}]}>{ZipCode}</Text>

            </View>

        </View>

        <View style = {{width: '100%', height: '7.5%', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>Do you have tow hitch?</Text>
            <Text style = {{fontSize: wp('3.5%'), marginLeft: 5, color: ColorPalet.DetailVeiw}}>{Hitch == 'yes' ? 'Yes' : 'No'}</Text>

        </View>

        <View style = {{width: '100%', height: '7.5%', marginTop: 2.5, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>Do you have a trailer?</Text>
            <Text style = {{fontSize: wp('3.5%'), marginLeft: 5, color: ColorPalet.DetailVeiw}}>{Trailer == 'yes' ? 'Yes' : 'No'}</Text>

        </View>
{Trailer == 'yes' &&
        <View style = {{width: '100%', height: '7.5%', marginTop: 2.5, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>Your trailer is open?</Text>
            <Text style = {{fontSize: wp('3.5%'), marginLeft: 5, color: ColorPalet.DetailVeiw}}>{TrailerOpen == 'yes' ? 'Yes' : 'No'}</Text>

        </View>
}
        <View style = {{width: '100%', height: '7.5%', marginTop: 2.5, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>Are you able to lift up to 50 lbs?</Text>
            <Text style = {{fontSize: wp('3.5%'), marginLeft: 5, color: ColorPalet.DetailVeiw}}>{Lift == 'yes' ? 'Yes' : 'No'}</Text>

        </View>

        <View style = {{width: '100%', height: '10%', marginTop: 2.5, justifyContent: 'flex-start',
         alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>Special Equipment</Text>
            <Text style = {{fontSize: wp('3.75%'), marginLeft: 5, color: ColorPalet.DetailVeiw}}></Text>

        </View>

        <View style = {{width: '100%', height: '10%', marginTop: 2.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

            <Text style = {[styles._Text, {fontSize: wp('4%'), color: ColorPalet.SignUpButton}]}>Vehicles</Text>

        </View>

        <View style = {{width: '100%', height: 'auto', marginTop: 2.5,
         justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent'}}>
            
            <FlatList
                data={ UserVehiclesList }
                renderItem={({item})=>(

                //   <MenuItem ItemTitle = {item.key} Function = {()=>GetSelectedMake(item.value, item.key)}/>
                <TouchableOpacity style = {{width: '100%', height: 50, marginBottom: 2.5, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#FFF', flexDirection: 'row'}}
                onPress = {()=>{SetVehicleDetailsData(item.vehicle.name, item.year, item.color.name,
                  item.max_weight, item.bed_length, item.vehicle_photo, item.vehicle_inspection_form, 
                  item.vehicle_registration, item.vehicle_registration)}}>

                    <Text style = {[styles._Text, {width: '100%', height: '100%', fontSize: wp('3.75%')}]}>{item.vehicle.name}</Text>

                </TouchableOpacity>
                
                )}
                />

        </View>
        {/* <TouchableOpacity style = {{width: '100%', height: '7.5%', marginTop: 2.5, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

            <Text style = {[styles._Text, {width: 'auto', fontSize: wp('3.75%')}]}>{Vehicle}</Text>

        </TouchableOpacity> */}
       

      </View>


      </ScrollView>


      
        
        
    </View>  
    </Drawer>
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: '#E9EAEF'
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
    textAlignVertical: 'center',
    fontSize : wp('3.25%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 25
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
 
 export default ProfessionalDetails;