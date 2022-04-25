import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import StairsBox from '../../Components/StairsBox';
import LocationInfo from '../../Components/LocationInfo';
import BorderedTextBox from '../../Components/BorderedTextBox';
import ElevatorBox from '../../Components/ElevatorBox';
import Button from '../../Components/Button';
// import MapView from 'react-native-maps';
// import { Marker } from 'react-native-maps';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import { EditMoveData, MoveData } from '../../Redux/MoveData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';


const CreateMove_Details = (props) => {

  const [SrcLocation, setSrcLocation] = useState(MoveData.address_of_pickup)
  const [DestLocation, setDestLocation] = useState(MoveData.address_of_delivery)
  const [SourceUnit, setSourceUnit] = useState('')
  const [SrcHasStairs, setSrcHasStairs] = useState(true)
  const [SrcStairsQty, setSrcStairsQty] = useState(0)
  const [SrcHasElevator, setSrcHasElevator] = useState(false)
  const [DestinationUnit, setDestinationUnit] = useState('')
  const [DestHasStairs, setDestHasStairs] = useState(true)
  const [DestStairsQty, setDestStairsQty] = useState(0)
  const [DestHasElevator, setDestHasElevator] = useState(false)
  const [SrcBuildingInfo, setSrcBuildingInfo] = useState('')
  const [DestBuildingInfo, setDestBuildingInfo] = useState('')


  useEffect(()=>{

    
     
  },[])

  let DecreaseSrcNumber=()=>
  {
    if(SrcStairsQty > 0)
    {
      setSrcStairsQty(SrcStairsQty - 1)
    }
    
    console.log(SrcStairsQty)
  }

  let IncreaseSrcNumber=()=>
  {
    if(SrcStairsQty < 1000)
    {
      setSrcStairsQty(SrcStairsQty + 1)
    }
    
    console.log(SrcStairsQty)
  }

  let DecreaseDestNumber=()=>
  {
    if(DestStairsQty > 0)
    {
      setDestStairsQty(DestStairsQty - 1)
    }
    
    console.log(DestStairsQty)
  }

  let IncreaseDestNumber=()=>
  {
    if(DestStairsQty < 1000)
    {
      setDestStairsQty(DestStairsQty + 1)
    }
    
    console.log(DestStairsQty)
  }

  let SourceStructureSelect=(Id)=>
  {
    switch(Id)
    {
      case 1:
        {
          setSrcHasStairs(true)
          setSrcHasElevator(false)
          return
        }
      case 2:
        {
          setSrcHasStairs(false)
          setSrcHasElevator(true)
          return
        }
    }
  }

  let DestinationStructureSelect=(Id)=>
  {
    switch(Id)
    {
      case 1:
        {
          setDestHasStairs(true)
          setDestHasElevator(false)
          return
        }
      case 2:
        {
          setDestHasStairs(false)
          setDestHasElevator(true)
          return
        }
    }
  }

  let DataValidation=()=>{

    
    if(SourceUnit.toString().trim() == '')
    {
      Toast.show('Please Fill  Source Unit Number.')
    }
    else if(DestinationUnit.toString().trim() == '')
    {
      Toast.show('Please Fill  Destination Unit Number.')
    }
    else
    {
     
    MoveData.pickup_unit_number = SourceUnit
    MoveData.pickup_stairs = SrcHasStairs ? SrcStairsQty.toString() : 'no'
    MoveData.pickup_elevator_building = SrcHasElevator ? 'yes' : 'no'
    MoveData.pickup_parking_info = SrcBuildingInfo

    MoveData.delivery_unit_Number = DestinationUnit
    MoveData.delivery_stairs = DestHasStairs ? DestStairsQty.toString() : 'no'
    MoveData.delivery_elevator_building = DestHasElevator ? 'yes' : 'no'
    MoveData.delivery_parking_info = DestBuildingInfo
    if(props.navigation.getParam('_edit') == false)
    {
    props.navigation.push('CreateMove_DateTime', {_edit: false})
      }
      else
      {
        props.navigation.push('CreateMove_DateTime', {_edit: true})
      }
    }

  }

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                />

        <ScrollView>

        <View style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Location Details</Text>

        </View>

        <View style = {{width: '100%', height: hp('40%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
           <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', marginTop: '1%', backgroundColor: ColorPalet.MainBackground}}>
        
          <LocationInfo BoxWidth = {'90%'} BoxHeight = {'85%'}
                      LocTitle = {'Source Location'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} LocAddressColor = {'#9B9B9B'}
                      LocAddress = {SrcLocation}/>
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Unit Number'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {SourceUnit} IsTextBox = {true} KeyboardType = {'default'}
                      MultiLine = {true} OnChangeFunction = {setSourceUnit} />
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <StairsBox  BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'#F2F2F2'} BorderRadius = {5}
                      LocTitle = {'Source Location'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {SrcLocation}
                      Function = {()=>SourceStructureSelect(1)} HasStairs = {SrcHasStairs}
                      DecBtnFunction = {()=>DecreaseSrcNumber()} IncBtnFunction = {()=>IncreaseSrcNumber()}
                      ResetFunction = {()=>setSrcStairsQty(0)}
                      RadioBattunText = {'Stairs (No Elevator)'} StairCount = {SrcStairsQty + ' flights'}
                      StairsQty = {SrcStairsQty}/>
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <ElevatorBox  BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {'#F2F2F2'} BorderRadius = {5}
                        LocTitleColor = {'#000'} Function = {()=>SourceStructureSelect(2)} 
                        HasElevator = {SrcHasElevator} RadioBattunText = {'Elevator Building (No Stairs)'} />
                      
          </View>

         <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Parking and Building Info'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {SrcBuildingInfo} IsTextBox = {true} 
                      MultiLine = {true} OnChangeFunction = {setSrcBuildingInfo} />
                      
          </View> 

        </View>

        <View style = {{width: '100%', height: hp('40%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
           <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', marginTop: '1%', backgroundColor: ColorPalet.MainBackground}}>
        
          <LocationInfo BoxWidth = {'90%'} BoxHeight = {'85%'}
                      LocTitle = {'Destination Location'} LocTitleColor = {'#000'}
                      PointTitle = {'B'} LocAddressColor = {'#9B9B9B'}
                      LocAddress = {DestLocation}/>
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Unit Number'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {DestinationUnit} IsTextBox = {true} KeyboardType = {'default'}
                      MultiLine = {true} OnChangeFunction = {setDestinationUnit} />
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <StairsBox  BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'#F2F2F2'} BorderRadius = {5}
                      LocTitle = {'Source Location'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {DestLocation}
                      Function = {()=>DestinationStructureSelect(1)} HasStairs = {DestHasStairs} 
                      DecBtnFunction = {()=>DecreaseDestNumber()} IncBtnFunction = {()=>IncreaseDestNumber()}
                      ResetFunction = {()=>setDestStairsQty(0)}
                      RadioBattunText = {'Stairs (No Elevator)'} StairCount = {DestStairsQty + ' flights'} 
                      StairsQty = {DestStairsQty}/>
                      
          </View>

          <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <ElevatorBox  BoxWidth = {'90%'} BoxHeight = {'85%'}
                        BorderColor = {'#F2F2F2'} BorderRadius = {5}
                        LocTitleColor = {'#000'} Function = {()=>DestinationStructureSelect(2)} 
                        HasElevator = {DestHasElevator} RadioBattunText = {'Elevator Building (No Stairs)'} />
                      
          </View>

         <View style = {{width: '100%', height: '19%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
          <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Parking and Building Info'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {DestBuildingInfo} IsTextBox = {true}
                      MultiLine = {true} OnChangeFunction = {setDestBuildingInfo} />
                      
          </View> 

        </View>


      <View style = {{width: '100%', height: hp('14%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save & Continue'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>

        </View>
      
      </ScrollView>

    </View>  
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor:  ColorPalet.DarkBackground
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
    fontSize : wp('4%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30
  }

  });
 
 export default CreateMove_Details;