import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import Modal from 'react-native-modal';
import NotificationItem from '../../Components/NotificationItem';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import RadioButton from '../../Components/RadioButton';
import CheckBox from '../../Components/CheckBox';
import { PDData} from '../../Redux/ProfessionalDetailsData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';

const VehicleProperties = (props) => {





// ******************************************************
const [Hitch, setHitch] = useState(false)
const [Trailer, setTrailer] = useState(false)
const [Open, setOpen] = useState(true)
const [Lift, setLift] = useState(false)
const [Equipment, setEquipment] = useState(true)
const [Equipment_Id, setEquipment_Id] = useState()
const [Make, setMake] = useState('')
const [Model_Id, setModel_Id] = useState('')
const [Model, setModel] = useState('')
const [_Year, setYear] = useState('')
const [Color_Id, setColor_Id] = useState('')
const [Color, setColor] = useState('')
const [_Weight, setWeight] = useState('')
const [_Length, setLength] = useState('')

const [EquipmentList, setEquipmentList] = useState([])

let DataValidation=()=>{

  PDData.tow_hitch = Hitch ? 'yes' : 'no'
  PDData.trailer = Trailer ? 'yes' : 'no'
  PDData.lift_up_to = Lift ? 'yes' : 'no'
  PDData.trailer_open = Open ? 'yes' : 'no'
  PDData.equipment_id = Equipment_Id

  props.navigation.navigate('DriverDocument')

}

let GetEquipmentList = async()=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.Equipment.GetEquipmentList, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---*---*---*---')
               setEquipmentList(response.data.equipments)

              //  setVehicleList(response.data.vehicles)
               console.log('---> ', EquipmentList.length)
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

let SetEquipment=(_id)=>{
  setEquipment(!Equipment)
  setEquipment_Id(_id)
}

useEffect(()=>{
  GetEquipmentList()
  },[])


  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Professional Details'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}} />

      <View style = {{width: '100%', height: hp('78%'), justifyContent: 'flex-start', alignItems: 'center'}}>
        
        <View style = {{width: '95%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}}>
        
          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
          
            <Text style = {styles._Text}>Do you have a tow hitch ?</Text>
                      
          </View>

          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            <View style = {{width: '50%', height: '100%', paddingLeft: hp('2%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Yes'} TextSize = {wp('3%')}
                        Selected = {Hitch} Function = {()=>{setHitch(true)}}/>
              
                        
            </View>

            <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'No'} TextSize = {wp('3%')}
                        Selected = {!Hitch} Function = {()=>{setHitch(false)}}/>
                        
            </View>

                      
          </View>
                    
        </View>

        <View style = {{width: '95%', height: Trailer ? hp('16%') : hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}}>
        
          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
          
            <Text style = {styles._Text}>Do you have a trailer ?</Text>    

          </View>

          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            <View style = {{width: '50%', height: '100%', paddingLeft: hp('2%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
              <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Yes'} TextSize = {wp('3%')}
                        Selected = {Trailer} Function = {()=>{setTrailer(true)}}/>
                          
            </View>

            <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
              
              <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                          RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'No'} TextSize = {wp('3%')}
                          Selected = {!Trailer} Function = {()=>{setTrailer(false)}}/>
                       
            </View>

                      
          </View>

          {Trailer &&
          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            <View style = {{width: '50%', height: '100%', paddingLeft: hp('2%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Open'} TextSize = {wp('3%')}
                        Selected = {Open} Function = {()=>{setOpen(true)}}/>  
            </View>

            <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Close'} TextSize = {wp('3%')}
                        Selected = {!Open} Function = {()=>{setOpen(false)}}/>  
            </View>

                      
          </View>
        }
                    
        </View>

        <View style = {{width: '95%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', borderBottomColor: ColorPalet.TextInputBorder, borderBottomWidth: 2}}>
        
          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
          
            <Text style = {styles._Text}>Are you able to lift upto 50 Lbs ?</Text>  

          </View>

          <View style = {{width: '100%', height: hp('5%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            <View style = {{width: '50%', height: '100%', paddingLeft: hp('2%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Yes'} TextSize = {wp('3%')}
                        Selected = {Lift} Function = {()=>{setLift(true)}}/>
                        
            </View>

            <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            <RadioButton RadioButtonDm = {hp('3%')} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'No'} TextSize = {wp('3%')}
                        Selected = {!Lift} Function = {()=>{setLift(false)}}/>
                        
            </View>

                      
          </View>
                    
        </View>

        <View style = {{width: '95%', height: hp('11%'), justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
        
          <View style = {{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert'}}>
            
            <Text style = {styles._Text}>Special Equipment</Text>  

          </View>

          

          <View style = {{width: '100%', height: '70%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
          
            
            <FlatList
              data={EquipmentList}
              renderItem={({item}) => 
              <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transpanert', flexDirection: 'row'}}>
                <View style = {{width: '15%', height: '100%', paddingLeft: hp('2%'), justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transpanert'}}>
                
                  <CheckBox IsVisible = {Equipment} Function = {()=>{SetEquipment(item._id)}} BackgroundColor = {'silver'}/>
              
                </View>

                <View style = {{width: '85%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transpanert'}}>
                  
                  <Text style = {styles.CheckboxText}>{item.name}</Text>
                
                </View> 

              </View> 
              }
            />
                      
          </View>     

        </View>
        
                    
      </View>


      <View style = {{width: '100%', height: hp('13%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Next'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>
        
                    
      </View>


      
        
        
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
    paddingLeft: hp('2%')
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
 
 export default VehicleProperties;