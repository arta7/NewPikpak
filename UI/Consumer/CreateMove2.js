import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import LocationBox from '../../Components/LocationBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import Modal from 'react-native-modal';
import MenuItem from '../../Components/MenuItem';
import MapView from 'react-native-maps';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import { MoveData } from '../../Redux/MoveData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMaps } from '../../Redux/GoogleMapsData';


const App = (props) => {

  const [SrcLocation, setSrcLocation] = useState('')
  const [IsSetSrcLoc, setIsSetSrcLoc] = useState(false)
  const [DestLocation, setDestLocation] = useState('')
  const [IsSetDestLoc, setIsSetDestLoc] = useState(false)
  const [MoveTypeVisible, setMoveTypeVisible] = useState(false)
  const [SelectedMoveTypeId, setSelectedMoveTypeId] =useState(0)
  const [SelectedMoveTypeTitle, setSelectedMoveTypeTitle] = useState('')
  const [MoveTypeList, setMoveTypeList] = useState([])

  let GetMoveType = async()=>{
    
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.Move.GetMoveType, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           console.log(response.status)
           console.log(response.data.move_types)

           console.log('************')
          

          if(response.status == 200)
          {
           setMoveTypeList(response.data.move_types)
           
          }
          else
          {
            Toast.show('Move Type list loading failed!')
          }
          //   setLoader_Visible(false)
          // }
          // else
          // {
          //   UserLogout()

          // }
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
    
   })
  }

  let RegisterMoveLocation = async(_user_id, _address_of_pickup, _gps_of_pickup,
                                   _date_of_pickup, _time_of_pickup, _address_of_delivery,
                                   _gps_of_delivery, _move_type_id)=>{
    console.log('UId: ', _user_id)
    console.log('MTId: ', _move_type_id)

    var params = {
      user_id : _user_id,
      address_of_pickup : _address_of_pickup,
      gps_of_pickup : _gps_of_pickup,
      date_of_pickup : _date_of_pickup,
      time_of_pickup : _time_of_pickup,
      address_of_delivery : _address_of_delivery,
      gps_of_delivery : _gps_of_delivery,
      move_type_id : _move_type_id
    }

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }

    axios.post(APIMaster.URL +
      APIMaster.Move.CreateMove_Location, params, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           console.log(response.status)

           console.log('************')
          

          // if(response.status == 200)
          // {
          //  setMoveTypeList(response.data.move_types)
           
          // }
          // else
          // {
          //   Toast.show('Move Type list loading failed!')
          // }
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
    
   })
  }

  let GetLocationData =()=>{
    if(SrcLocation == '' || DestLocation == '' || SelectedMoveTypeId == 0)
    {
      Toast.show('Please fill all data.')
    }
    else
    {
      MoveData.address_of_pickup = SrcLocation,
      MoveData.gps_of_pickup = '',
      MoveData.address_of_delivery = DestLocation,
      MoveData.gps_of_delivery = '',
      MoveData.move_type_id = SelectedMoveTypeId

      //...............................................

      props.navigation.push('CreateMove_Details')
      // RegisterMoveLocation(LoginData.user_id, '11', '22', '33', '44', '55', '66', SelectedMoveTypeId);
    }
  }


  let GetSelectedMoveType=(Id, Title)=>{
    setSelectedMoveTypeId(Id)
    setSelectedMoveTypeTitle(Title)
    setMoveTypeVisible(false)
  }

  useEffect(()=>{
    GetMoveType()
    },[])



 

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                />

        <View style = {{width: '100%', height: hp('24%'), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Choose Locations</Text>

        </View>

        {/* <View style = {{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <LocationBox BoxWidth = {'90%'} BoxHeight = {'90%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Source Location'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {SrcLocation}
                      OnChangeFunction = {setSrcLocation}/>

        </View> */}

        <View style = {{width: wp('90%'), borderRadius: 15, overflow: 'hidden', elevation: 3, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', marginHorizontal: wp('5%')}}>
          <View style = {{width: '100%', height: '100%'}}>

            {/* <LocationBar /> */}

            <GooglePlacesAutocomplete
              placeholder='Move To?'
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: GoogleMaps.map_api_key,
                language: 'en',
              }}
              styles = {{
                
                textInput: {
                  height: '100%',
                  color: '#5d5d5d',
                  fontSize: 16,

                }
              }}
            />

            

          
          </View>
        </View>

        {/* <View style = {{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <LocationBox BoxWidth = {'90%'} BoxHeight = {'90%'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Destination Location'} LocTitleColor = {'#000'}
                      PointTitle = {'B'} Value = {DestLocation}
                      OnChangeFunction = {setDestLocation}/>

        </View>           */}

        </View>

        <View style = {{width: '100%', height: hp('44%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('0%'), backgroundColor: 'gray'}}>
          
        <MapView  style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: 36.706133,
            longitude: 52.644960,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

        </View>

        <View style = {{width: '100%', height: hp('8%'), justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: 'pink'}}>
          
          <View style = {{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {{width: '100%', textAlign: 'left', fontSize : SelectedMoveTypeId != 0?wp('3%'):wp('4%'), fontWeight: '200', color: 'black', paddingLeft: 30}}>{SelectedMoveTypeId != 0?'Move Type':'Select Move Type'}</Text>
            {SelectedMoveTypeId != 0 &&
            <Text style = {{width: '100%', textAlign: 'left', fontSize : wp('3.5%'), fontWeight: '200', color: '#9B9B9B', paddingLeft: 30}}>{SelectedMoveTypeTitle}</Text>
            }
          </View>

          <View style = {{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Button b_Width = {'60%'} b_Height = {'60%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Select'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{setMoveTypeVisible(true)}}/>

          </View>

        </View>

      <View style = {{width: '100%', height: hp('14%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
        
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save & Continue'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=> {GetLocationData()}} />

        
        </View>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={MoveTypeVisible}
          onBackdropPress={() => setMoveTypeVisible(false)}>

          <View style={{width:wp('80%'), height: hp('68%'),   backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15}]}>Select Move Type</Text>

          </View>

          <FlatList
            data={MoveTypeList}
            
            renderItem={({item})=>(

              <MenuItem ItemTitle = {item.name} Function = {()=>{GetSelectedMoveType(item.id, item.name)
                                                            console.log(SelectedMoveTypeId)}}/>
              
            )}
          />

          </View>

        </Modal>


    </View>  
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: '#ABABAB' // ColorPalet.MainBackground
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
    paddingLeft: wp('5%')
  }

  });
 
 export default App;