import React, { useEffect, useState } from 'react';
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
import { VDData } from '../../Redux/VehicleDetailsData';
import DriverDocument from '../../Components/DriverDocument';
import AsyncStorage from '@react-native-community/async-storage';


const ProfessionalDetails = (props) => {





// ******************************************************
const [Vehicle, setVehicle] = useState(props.navigation.state.params.vehicle_name)
const [VehiclePhoto, setVehiclePhoto] = useState(props.navigation.state.params.vehicle_photo_uri)
const [DrivingLicense, setDrivingLicense] = useState(props.navigation.state.params.driving_license_uri)
const [VehicleInsurance, setVehicleInsurance] = useState(props.navigation.state.params.vehicle_insurance_uri)
const [VehicleRegistration, setVehicleRegistration] = useState(props.navigation.state.params.vehicle_registration_uri)
const [_Year, setYear] = useState(props.navigation.state.params.product_year)
const [VehicleColor, setVehicleColor] = useState(props.navigation.state.params.vehicle_color)
const [Capacity, setCapacity] = useState(props.navigation.state.params.max_capacity)
const [Length, setLength] = useState(props.navigation.state.params.max_length)


let GetVehicleDetails=()=>{

  AsyncStorage.getItem("Vehicles").then(data => {
    if(data){
       let ourData = JSON.parse(data)
       console.log('Vehicle: ', ourData.length)



       for(let i=0; i < ourData.length; i++)
       {
        if(ourData[0]._id == VDData.vehicle_id)
          { 
            setVehicle(ourData[0].vehicle.name)
            setYear(ourData[0].year)
            setVehicleColor(ourData[0].color.name)
            setCapacity(ourData[0].max_weight)
            setLength(ourData[0].bed_length)
            setVehiclePhoto(ourData[0].vehicle_photo)
            setDrivingLicense(ourData[0].vehicle_inspection_form)
            setVehicleInsurance(ourData[0].vehicle_insurance)
            setVehicleRegistration(ourData[0].vehicle_registration)
            return
          }
        // setUserVehiclesList(_item)
       }
          
      //  console.log('UV: ', UserVehiclesList)

    }
  
  }).catch(err => console.log("error V >>>>> ",err))

}

useEffect(()=>{
  
  console.log(VDData.vehicle_id)
  GetVehicleDetails()

  },[])


  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Vehicle Detail'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}} />

      <View style = {{width: '100%', height: hp('93%'), justifyContent: 'flex-start', alignItems: 'center'}}>
      
        <View style = {{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

            <View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                <View style = {{width: '65%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '20%'}}>
                        <Icon name = {'truck-outline'} color= {'#E1E1E1'} type = {'material-community'} size={wp('7%')} style = {{marginLeft: 20}}/>
                    </View>
                    <Text style = {[styles._Text, {width: '80%', fontSize: wp('5%'), fontWeight: 'bold', paddingLeft: 10}]}>{Vehicle}</Text>

                </View>

                <View style = {{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '40%'}}>
                        <Icon name = {'calendar'} color= {'#E1E1E1'} type = {'material-community'} size={wp('7%')} style = {{marginLeft: 20}}/>
                    </View>
                    <Text style = {[styles._Text, {width: '60%', fontSize: wp('4%'), paddingLeft: 5, color: '#A7A7A7'}]}>{_Year}</Text>

                </View>

            </View>

            <View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                <View style = {{width: '15%'}}>
                    <Icon name = {'palette'} color= {'#E1E1E1'} type = {'material-community'} size={wp('7%')} style = {{marginLeft: wp('7%')}}/>
                </View>
                <Text style = {[styles._Text, {width: '90%', fontSize: wp('4%'), paddingLeft: 10, color: '#A7A7A7'}]}>{VehicleColor}</Text>

            </View>

        </View>

        <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', marginTop: 5}}>

            <View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

                <View style = {{width: '100%', height: '55%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '15%'}}>
                        <Icon name = {'weight'} color= {'#E1E1E1'} type = {'font-awesome-5'} size={wp('5.5%')} style = {{marginLeft: wp('7%')}}/>
                    </View>
                    <Text style = {[styles._Text, {width: '90%', fontSize: wp('3.75%'), paddingLeft: 10}]}>Max. Towing Capacity</Text>

                </View>

                <View style = {{width: '100%', height: '45%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '15%'}}></View>
                    <Text style = {[styles._Text, {width: '90%', color: '#A7A7A7', fontSize: wp('3.5%'), paddingLeft: 10}]}>{Capacity}</Text>

                </View>

            </View>

            <View style = {{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>

                <View style = {{width: '100%', height: '55%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '15%'}}>
                        <Icon name = {'weight'} color= {'#E1E1E1'} type = {'font-awesome-5'} size={wp('5.5%')} style = {{marginLeft: wp('7%')}}/>
                    </View>
                    <Text style = {[styles._Text, {width: '90%', fontSize: wp('3.75%'), paddingLeft: 10}]}>Bed Length with Gate Cloesd (In fit)</Text>

                </View>

                <View style = {{width: '100%', height: '45%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', flexDirection: 'row'}}>

                    <View style = {{width: '15%'}}></View>
                    <Text style = {[styles._Text, {width: '90%', color: '#A7A7A7', fontSize: wp('3.5%'), paddingLeft: 10}]}>{Length}</Text>

                </View>

            </View>


        </View>

        <View style = {{width: '100%', height: '7.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', marginTop: 10}}>

            <Text style = {[styles._Text, {fontSize: wp('4%')}]}>Photos</Text>

        </View>

        <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', 
        marginTop: 5, flexDirection: 'row'}}>

            <DriverDocument CWidth = {'25%'} CHeight = {'100%'} IWidth = {'95%'} IHeight = {'50%'}
                            ImageSrc = {{uri:VehiclePhoto}}
                            TitleTopMargin = {10} Title = {'Vehicle'} />

            <DriverDocument CWidth = {'25%'} CHeight = {'100%'} IWidth = {'95%'} IHeight = {'50%'}
                            ImageSrc = {{uri:DrivingLicense}}
                            TitleTopMargin = {10} Title = {'License'} />


            <DriverDocument CWidth = {'25%'} CHeight = {'100%'} IWidth = {'95%'} IHeight = {'50%'}
                             ImageSrc = {{uri:VehicleInsurance}}
                            TitleTopMargin = {10} Title = {'Insurance'} />


            <DriverDocument CWidth = {'25%'} CHeight = {'100%'} IWidth = {'95%'} IHeight = {'50%'}
                            ImageSrc = {{uri:VehicleRegistration}}
                            TitleTopMargin = {10} Title = {'Registration'} />

        </View>
               
        
        
       

      </View> 
        
    </View>  
   
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