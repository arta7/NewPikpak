import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import RadioButton from '../../Components/RadioButton';
import BorderedTextBoxWithIcon from '../../Components/BorderedTextBoxWithIcon';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import MenuItem from '../../Components/MenuItem';
import UpDownValue from '../../Components/UpDownValue';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import { PDData} from '../../Redux/ProfessionalDetailsData';
import Modal from 'react-native-modal';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';

const ProfessionalDetails = (props) => {

const [Weight, SetWeight] = useState('')
const [NumOfHelper, SetNumOfHelper] = useState('')
const [Description, SetDescription] = useState('')
const [SelectImageVisible, setSelectImageVisible] = useState(false)
const [SelectHelperVisible, setSelectHelperVisible] = useState(false)

const [Loader_Visible, setLoader_Visible] = useState(false)

const [HelperState, setHelperState] = useState([false, false, false, false, false])
const [HelperTitle, setHelperTitle] = useState(['Driver Only', 'Driver + 1', 'Driver + 2', 'Driver + 3', 'Driver + 4'])
const [SelectedHelper, setSelectedHelper] = useState(-1)
const [SelectedItem, setSelectedItem] = useState(-1)

// ******************************************************
const [OrganizationType_Id, setOrganizationType_Id] = useState('')
const [OrganizationType, setOrganizationType] = useState('')
const [Vehicle_Id, setVehicle_Id] = useState('')
const [Vehicle, setVehicle] = useState('')
const [Make_Id, setMake_Id] = useState('')
const [Make, setMake] = useState('')
const [Model_Id, setModel_Id] = useState('')
const [Model, setModel] = useState('')
const [_Year, setYear] = useState('')
const [_year, set_year] = useState(new Date().getFullYear())
const [Color_Id, setColor_Id] = useState('')
const [Color, setColor] = useState('')
const [_Weight, setWeight] = useState('')
const [_Length, setLength] = useState('')

const [OrganizationTypeList_Visible, setOrganizationTypeList_Visible] = useState(false)
const [VehicleList_Visible, setVehicleList_Visible] = useState(false)
const [MakeList_Visible, setMakeList_Visible] = useState(false)
const [ModelList_Visible, setModelList_Visible] = useState(false)
const [YearList_Visible, setYearList_Visible] = useState(false)
const [ColorList_Visible, setColorList_Visible] = useState(false)


const [OrganizationTypeList, setOrganizationTypeList] = useState([
  {key: 'Moving Companies & Professionals', value: 'moving_company'},
  {key: 'Individual Drivers', value: 'individual'}
]);

const [VehicleList, setVehicleList] = useState([]);

const [MakeList, setMakeList] = useState([]);

const [ModelList, setModelList] = useState([]);

const [ColorList, setColorList] = useState([]);

let GetVehicleList = async()=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.Vehicle.GetVehicleList, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---------------')
               setVehicleList(response.data.vehicles)
               console.log('------ ', VehicleList.length)
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

let GetVehicleMakeList = async()=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.Vehicle.GetVehicleMakeList, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---------------')
               setColorList(response.data.colors)
               setMakeList(response.data.makes)
               console.log('------ ', ColorList.length)
               console.log('------ ', MakeList.length)
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


let GetVehicleModelList = async(_make_id)=>{
  setLoader_Visible(true)
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.Vehicle.GetVehicleModelList + _make_id, axiosConfig)
 .then((response)=> {
         
         console.log(response)  
         console.log(response.data)
         
         console.log('************')

        if(response.data.status == 1)
        {
        
               console.log('---------------')
               setModelList(response.data.models)
               console.log('------ ', ModelList.length)

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

let GetSelectedOrganizationType=(Id, Title)=>{
  setOrganizationType_Id(Id)
  setOrganizationType(Title)
  setOrganizationTypeList_Visible(false)
}

let GetSelectedVehicle=(Id, Title)=>{
  setVehicle_Id(Id)
  setVehicle(Title)
  setVehicleList_Visible(false)
}

let GetSelectedMake=(Id, Title)=>{
  setMake_Id(Id)
  setMake(Title)
  setMakeList_Visible(false)
  GetVehicleModelList(Id)
}

let GetSelectedModel=(Id, Title)=>{
  setModel_Id(Id)
  setModel(Title)
  setModelList_Visible(false)
}

let GetSelectedColor=(Id, Title)=>{
  setColor_Id(Id)
  setColor(Title)
  setColorList_Visible(false)
}

let ChangeYear=(_operator)=>
  {
    if(_operator == '+')
    {
        if(_year == new Date().getFullYear())
          set_year(new Date().getFullYear())
        else
          set_year(_year + 1)
    }
    else
    {
      if(_year > 1950)
        set_year(_year - 1)
      else
        set_year(1950)
    }
  }

let LoadFormData=()=>{

  setLoader_Visible(true)

  GetVehicleList()
  GetVehicleMakeList()

  setLoader_Visible(false)

}

let CheckSelectedVehicleMakeId=()=>{

  if(Make_Id == '' || Make_Id == null)
  {
    Toast.show('You must select make of vehicle first')
  }
  else
  {
    setModelList_Visible(true)
  }
}

let DataValidation=()=>{
  
  if(OrganizationType == '')
  {
    Toast.show('Please select Organization Type')
  }
  else
  {
    PDData.organization_type = OrganizationType_Id

    if(Vehicle_Id == '')
    {
      Toast.show('Please select Vehicle')
    }
    else
    {
      PDData.vehicle_id = Vehicle_Id

      if(Make_Id == '')
      {
        Toast.show('Please select Make of Vehicle')
      }
      else 
      {
        PDData.make_id = Make_Id

        if(Model_Id == '')
        {
          Toast.show('Please select Model of Vehicle')
        }
        else 
        {
          PDData.model_id = Model_Id

          if(_Year == '')
          {
            Toast.show('Please select made year')
          }
          else 
          {
            PDData._year = _Year.toString()

            if(Color_Id == '')
            {
              Toast.show('Please select Color of Vehicle')
            }
            else 
            {
              PDData.color_id = Color_Id

              if(_Weight == '')
              {
                Toast.show('Please enter max towing capacity')
              }
              else 
              {
                PDData.max_weight = _Weight

                if(_Length == '')
                {
                  Toast.show('Please enter bed length with gate closed')
                }
                else
                {
                  PDData.bed_length = _Length

                  props.navigation.navigate('VehicleProperties')
                }
              }
            }
          }
        }
      }
    }
  }  
}


  useEffect(()=>{
    LoadFormData()
    },[])

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Professional Details'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{
                
                props.navigation.replace('Home')
              }}
                />

      
<ScrollView showsVerticalScrollIndicator = {false}>
   
      
      <View style = {{width: '100%', height: hp('5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Organization Type</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
      <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Please Select'} LocTitleColor = {'#000'}
                    Value = {OrganizationType} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>setOrganizationTypeList_Visible(true)}
                    HasIcon = {true} IconName = {'truck-outline'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Vehicle</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Please Select'} LocTitleColor = {'#000'}
                    Value = {Vehicle} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>setVehicleList_Visible(true)}
                    HasIcon = {true} IconName = {'truck-outline'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Make</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Please Select'} LocTitleColor = {'#000'}
                    Value = {Make} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>setMakeList_Visible(true)}
                    HasIcon = {true} IconName = {'truck-outline'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Model</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Please Select'} LocTitleColor = {'#000'}
                    Value = {Model} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>CheckSelectedVehicleMakeId()}
                    HasIcon = {true} IconName = {'truck-outline'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Year</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Select Year'} LocTitleColor = {'#000'}
                    Value = {_Year} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>setYearList_Visible(true)}
                    HasIcon = {true} IconName = {'calendar'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Color</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Select Color'} LocTitleColor = {'#000'}
                    Value = {Color} IsTextBox = {false} FontSize = {wp('3.5%')}
                    OnPressFunction = {()=>setColorList_Visible(true)}
                    HasIcon = {true} IconName = {'palette'} IconColor = {'#E1E1E1'} 
                    IconType = {"material-community"} IconSize = {30} ShowComboIcon = {true}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Max. Towing Capacity</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Enter Weight'} LocTitleColor = {'red'}
                    Value = {_Weight} IsTextBox = {true} FontSize = {wp('3.5%')}
                    HasIcon = {true} IconName = {'weight'} IconColor = {'#E1E1E1'} 
                    IconType = {"font-awesome-5"} IconSize = {25} KeyboardType = {'numeric'}
                    MultiLine = {false} OnChangeFunction = {(v)=>{setWeight(v)}}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('3.5%'), justifyContent: 'flex-end', alignItems: 'center'}}>

        <Text style = {styles._Text}>Bed Length with Gate Closed (In fit)</Text>

      </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <BorderedTextBoxWithIcon BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                    LocTitle = {'Enter Lenght'} LocTitleColor = {'#000'}
                    Value = {_Length} IsTextBox = {true} FontSize = {wp('3.5%')}
                    HasIcon = {true} IconName = {'weight'} IconColor = {'#E1E1E1'} 
                    IconType = {"font-awesome-5"} IconSize = {25} KeyboardType = {'numeric'}
                    MultiLine = {false} OnChangeFunction = {(v)=>{setLength(v)}}/>
                    
      </View>

      <View style = {{width: '100%', height: hp('13%'), justifyContent: 'center', alignItems: 'center'}}>
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Next'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>
        
                    
      </View>

      </ScrollView>

      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={OrganizationTypeList_Visible}
          onBackdropPress={() => setOrganizationTypeList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select Organization</Text>

            </View>

            <FlatList
            data={ OrganizationTypeList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.key} Function = {()=>GetSelectedOrganizationType(item.value, item.key)}/>
              
            )}
            />

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={VehicleList_Visible}
          onBackdropPress={() => setVehicleList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select Vehicle</Text>

            </View>

            <FlatList
            data={ VehicleList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedVehicle(item.id, item.name)}/>
              
            )}
            />

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={MakeList_Visible}
          onBackdropPress={() => setMakeList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select Make</Text>

            </View>

            <FlatList
            data={ MakeList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedMake(item._id, item.name)}/>
              
            )}
            />

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={ModelList_Visible}
          onBackdropPress={() => setModelList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select Make</Text>

            </View>

            <FlatList
            data={ ModelList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedModel(item._id, item.name)}/>
              
            )}
            />

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={YearList_Visible}
          onBackdropPress={() => setYearList_Visible(false)}>

          <View style={{width:wp('80%'), height: hp('35%'),   backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: '80%', borderBottomColor: '#EEEEEE', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {_year}
                              UpKeyFunction = {()=>{ChangeYear('+')}}
                              DownKeyFunction = {()=>{ChangeYear('-')}}/>
                  
              </View>

              

            </View>

            <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setYearList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

              </TouchableOpacity>

              <TouchableOpacity style = {{width: '50%', height: '100%', borderLeftColor: '#EEEEEE', borderLeftWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setYear(_year)
                                                setYearList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>OK</Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={ColorList_Visible}
          onBackdropPress={() => setColorList_Visible(false)}>

          <View style={{width:wp('80%'), height: 'auto',   backgroundColor: '#C4C4C4'}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15, fontSize: wp('4%')}]}>Select Make</Text>

            </View>

            <FlatList
            data={ ColorList }

            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>GetSelectedColor(item._id, item.name)}
              />
              
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
    paddingLeft: 30
  },
  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 
 export default ProfessionalDetails;