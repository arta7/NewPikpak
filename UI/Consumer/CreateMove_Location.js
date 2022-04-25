import React, { useEffect, useState, useRef } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import LocationBox from '../../Components/LocationBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import Modal from 'react-native-modal';
import MenuItem from '../../Components/MenuItem';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import { MoveData, EditMoveData } from '../../Redux/MoveData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';
import { MoveLocationsData, LocationData, DefaultLocationData } from '../../Redux/LocationData';
import SelectLocation from '../Common/SelectLocation';
import Polyline from '@mapbox/polyline';
import { GoogleMaps } from '../../Redux/GoogleMapsData';


const App = (props) => {


  const [SrcLocation, setSrcLocation] = useState(MoveLocationsData.pickup_description)
  const [SrcLatitude, setSrcLatitude] = useState(MoveLocationsData.pickup_latitude)
  const [SrcLongitude, setSrcLongitude] = useState(MoveLocationsData.pickup_longitude)
  const [IsSetSrcLoc, setIsSetSrcLoc] = useState(false)
  const [DestLocation, setDestLocation] = useState(MoveLocationsData.delivery_description)
  const [DestLatitude, setDestLatitude] = useState(MoveLocationsData.delivery_latitude)
  const [DestLongitude, setDestLongitude] = useState(MoveLocationsData.delivery_longitude)
  const [IsSetDestLoc, setIsSetDestLoc] = useState(false)
  const [MoveTypeVisible, setMoveTypeVisible] = useState(false)
  const [SelectedMoveTypeId, setSelectedMoveTypeId] =useState(0)
  const [SelectedMoveTypeTitle, setSelectedMoveTypeTitle] = useState('')
  const [MoveTypeList, setMoveTypeList] = useState([])
  const [coords, setcoords] = useState([])
  // const [coords_edit, setcoords_edit] = useState([])

  const move_id = props.navigation.state.params.move_id;

  const pickup_coords = props.navigation.state.params.pickup_coords
  const delivery_coords = props.navigation.state.params.delivery_coords

  // let pickup_coords = EditMoveData.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',');


  // let delivery_coords = EditMoveData.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',');

  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').height

  let GetMove = (_move_id)=>{
    
    console.log('Get methode called')
    console.log('move id : ',_move_id)
    EditMoveData.move_id = move_id;
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
  
     console.log(APIMaster.URL + APIMaster.Move.GetMove)
    axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
            
            Toast.show(response.data.message)
  
           
            
            if(response.status == 200)
                {
                  EditMoveData.address_of_pickup = response.data.move.address_of_pickup
                  EditMoveData.gps_of_pickup = response.data.move.gps_of_pickup
           

                  EditMoveData.address_of_delivery = response.data.move.address_of_delivery
                  EditMoveData.gps_of_delivery = response.data.move.gps_of_delivery

                  EditMoveData.address_of_pickup = response.data.move.address_of_pickup
                  EditMoveData.gps_of_pickup = response.data.move.gps_of_pickup
                  setSrcLocation(response.data.move.address_of_pickup)
                  setSrcLatitude(response.data.move.gps_of_pickup[0])
                  setSrcLongitude(response.data.move.gps_of_pickup[1])

                  EditMoveData.address_of_delivery = response.data.move.address_of_delivery
                  EditMoveData.gps_of_delivery = response.data.move.gps_of_delivery
                  setDestLocation(response.data.move.address_of_delivery)
                  setDestLatitude(response.data.move.gps_of_delivery[0])
                  setDestLongitude(response.data.move.gps_of_delivery[1])

                

                  EditMoveData.move_type_id = response.data.move.move_type._id.toString()
                  console.log('(EditMoveData. EditMoveData.move_type_id) : ', response.data.move.move_type.name)
                  setSelectedMoveTypeId(response.data.move.move_type._id)
                  setSelectedMoveTypeTitle(response.data.move.move_type.name)

                  EditMoveData.date_of_pickup = response.data.move.date_of_pickup
                  EditMoveData.time_of_pickup = response.data.move.time_of_pickup

                  EditMoveData.move_images = response.data.move.move_files

                  EditMoveData.weight = response.data.move.weight
                  EditMoveData.no_of_helpers = response.data.move.no_of_helpers
                  EditMoveData.description = response.data.move.description
                  
                  getDirections(pickup_coords[0] + " , " + pickup_coords[1] ,
                                delivery_coords[0] + " , " + delivery_coords[1])
                    
                                console.log('test ok',EditMoveData.weight)
                  
                }
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

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
           
          //  console.log(response)  
          //  console.log(response.status)
          //  console.log(response.data.move_types)

           console.log('************')
           console.log('Move Type Fetched Successfully')
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

  

  let GetLocationData =()=>{
    if(SrcLocation == '' )
    {
      Toast.show('Please fill Source Location data.')
    }
    else if(DestLocation == '')
    {
      Toast.show('Please fill Destination Location data.')
    }
    else if(SelectedMoveTypeId == 0)
    {
      Toast.show('Please fill SelectedMoveType data.')
    }
    else
    {
      MoveData.address_of_pickup = SrcLocation,
      MoveData.gps_of_pickup = "[" + SrcLatitude.toString() + " , " + SrcLongitude.toString() + "]",
      MoveData.address_of_delivery = DestLocation,
      MoveData.gps_of_delivery = "[" + DestLatitude.toString() + " , " + DestLongitude.toString() + "]",
      MoveData.move_type_id = SelectedMoveTypeId

      //...............................................
      if(move_id != '')
      {
        EditMoveData.move_type_id = SelectedMoveTypeId
        props.navigation.push('CreateMove_DateTime', { _edit: true })
      }
      else
      {
        props.navigation.push('CreateMove_Details', { _edit: false })
      }
      // RegisterMoveLocation(LoginData.user_id, '11', '22', '33', '44', '55', '66', SelectedMoveTypeId);
    }
  }


  let GetSelectedMoveType=(Id, Title)=>{
    setSelectedMoveTypeId(Id)
    setSelectedMoveTypeTitle(Title)
    setMoveTypeVisible(false)
  }

  let componentDidMount=()=> {
   if(MoveLocationsData.pickup_description != '' && MoveLocationsData.delivery_description != '')
   {
    getDirections(MoveLocationsData.pickup_latitude.toString() + " , " + MoveLocationsData.pickup_longitude.toString() ,
                  MoveLocationsData.delivery_latitude.toString() + " , " + MoveLocationsData.delivery_longitude.toString())
   }
   console.log(MoveLocationsData.pickup_latitude.toString() + " , " + MoveLocationsData.pickup_longitude.toString() ,
               MoveLocationsData.delivery_latitude.toString() + " , " + MoveLocationsData.delivery_longitude.toString())
   
   
   console.log(DefaultLocationData.default_latitude)
   console.log(DefaultLocationData.default_longitude)
  }

  


  let getDirections = async(startLoc, destinationLoc)=> {
        try {
            const mode = 'driving'
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            console.log('points\n')
            console.log(respJson.routes[0].overview_polyline)
            console.log(respJson.routes[0].legs[0].distance.value)
            console.log(Number(Number(respJson.routes[0].legs[0].distance.value) * 0.000621371).toFixed(1))
            console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            MoveLocationsData.distance = Number(Number(respJson.routes[0].legs[0].distance.value) * 0.000621371).toFixed(1)
            setcoords(coords)
            return coords
        } catch(error) {
            console.log(error)
            return error
        }
    }

    const mapView = useRef(null);

    const animateMap = (lat, lng) => {
      if(mapView.current != null)
      {
        if(LocationData.current_latitude != 0)
        {
      mapView.current.animateToRegion({ 
          
        latitude: lat, //LocationData.current_latitude,
        longitude: lng, //LocationData.current_longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
  
      },2000);
    }
       }
    }

  useEffect(()=>{
    GetMoveType()
    // EditMoveData.move_id = '';
    console.log('latitude: ', LocationData.current_latitude,
      'longitude: ', LocationData.current_longitude,)
    console.log('Edit Move Id: ', move_id)
    console.log('Pickup : ', pickup_coords)
    console.log('Delivery: ', delivery_coords)
    if(move_id != '')
    {
      GetMove(move_id)
    }

    componentDidMount();

    },[])

  let  _mapReady = () => {
      console.log("map ready");
      if(MoveLocationsData.pickup_description == '' && MoveLocationsData.delivery_description == '')
      {
        animateMap(LocationData.current_latitude, LocationData.current_longitude)
      }
      else if(MoveLocationsData.pickup_description != '' && MoveLocationsData.delivery_description == '')
      {
        animateMap(MoveLocationsData.pickup_latitude, MoveLocationsData.pickup_longitude)
      }
      else if((MoveLocationsData.pickup_description != '' && MoveLocationsData.delivery_description == '') || 
              (MoveLocationsData.pickup_description == '' && MoveLocationsData.delivery_description != ''))
      {
        animateMap(MoveLocationsData.delivery_latitude, MoveLocationsData.delivery_longitude)
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

        <View style = {{width: '100%', height: hp('24%'), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Choose Locations</Text>

        </View>

        <View style = {{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <LocationBox BoxWidth = {'90%'} BoxHeight = {'90%'} PointColor = {SrcLocation != '' ? '#6cb6fb' : 'silver'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Source Location'} LocTitleColor = {'#000'}
                      PointTitle = {'A'} Value = {SrcLocation}
                      DisableItem={move_id == '' ? false : true}
                      ButtonFunction = {()=>{props.navigation.replace('SelectLocation',
                       {call_id: 'src', screen_title: 'Pickup Address', last_location : SrcLocation,move_id:move_id})}}/>

        </View>

        <View style = {{width: '100%', height: '35%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <LocationBox BoxWidth = {'90%'} BoxHeight = {'90%'} PointColor = {DestLocation != '' ? '#34ea34' : 'silver'}
                      BorderColor = {'silver'} BorderRadius = {5}
                      LocTitle = {'Destination Location'} LocTitleColor = {'#000'}
                      PointTitle = {'B'} Value = {DestLocation}
                      DisableItem={move_id == '' ? false : true}
                      ButtonFunction = {()=>{props.navigation.replace('SelectLocation',
                       {call_id: 'dest', screen_title: 'Delivery Address', last_location : DestLocation,move_id:move_id})}}/>

        </View>          

        </View>

        <View style = {{width: '100%', height: hp('44%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('0%'), backgroundColor: 'gray'}}>
   
        {move_id == '' &&
        <MapView  style={{ ...StyleSheet.absoluteFillObject }}
          ref = {mapView}
          initialRegion={{
            longitude: LocationData.current_longitude,
            latitude: LocationData.current_latitude,
            latitudeDelta: 30,
            longitudeDelta: 0.0421}}
          showsUserLocation = {true}
          showsMyLocationButton={false}
          followsUserLocation = {true}
          onMapReady = { () => _mapReady() }
          onLayout = { () => { 
            if(MoveLocationsData.delivery_description != '' && MoveLocationsData.pickup_description != '') {
              mapView.current.fitToCoordinates([
                { latitude: MoveLocationsData.pickup_latitude, longitude: MoveLocationsData.pickup_longitude }, 
                { latitude: MoveLocationsData.delivery_latitude, longitude: MoveLocationsData.delivery_longitude }
                ], {
                edgePadding: {
                  bottom: 200,
                  right: 50,
                  top: 150,
                  left: 50,
                },
                animated: true,
                });
              }
            }
          }
          >

        {MoveLocationsData.pickup_description != '' &&
          <MapView.Marker
            coordinate={{latitude: MoveLocationsData.pickup_latitude,
            longitude: MoveLocationsData.pickup_longitude}}
            title={"Pickup"}
            description={MoveLocationsData.pickup_description}
            pinColor = '#6cb6fb'
         />
        }

        {MoveLocationsData.delivery_description != '' &&
          <MapView.Marker
            coordinate={{latitude: MoveLocationsData.delivery_latitude,
            longitude: MoveLocationsData.delivery_longitude}}
            title={"Delivery"}
            description={MoveLocationsData.delivery_description}
            pinColor = '#34ea34'
         />
        }

        {MoveLocationsData.delivery_description != '' && MoveLocationsData.pickup_description != '' &&


          <MapView.Polyline 
              coordinates={coords}
              strokeWidth={2}
              strokeColor="red"/>
          
        }
        </MapView>
        }

        {move_id != '' &&
        <MapView  style={{ ...StyleSheet.absoluteFillObject }}
          ref = {mapView}
          initialRegion={{
            longitude: LocationData.current_longitude,
            latitude: LocationData.current_latitude,
            latitudeDelta: 30,
            longitudeDelta: 0.0421}}
          showsUserLocation = {true}
          showsMyLocationButton={false}
          followsUserLocation = {true}
          onMapReady = { () => _mapReady() }
          onLayout = { () => { 
            if(EditMoveData.address_of_delivery != '' && EditMoveData.address_of_pickup != '') {
              
              console.log('********************\n******** OK! *******\n********************\n')
              
              // let pickup_coords = EditMoveData.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',');
              console.log('****-> ', pickup_coords)
              console.log('===> ', Number(pickup_coords[1]))

              // let delivery_coords = EditMoveData.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',');
              console.log('===> ', Number(delivery_coords[0]))
              console.log('===> ', Number(delivery_coords[1]))

              mapView.current.fitToCoordinates([
                { latitude: Number(pickup_coords[0]), longitude: Number(pickup_coords[1]) }, 
                { latitude: Number(delivery_coords[0]), longitude: Number(delivery_coords[1]) }
                ], {
                edgePadding: {
                  bottom: 200,
                  right: 50,
                  top: 150,
                  left: 50,
                },
                animated: true,
                });
              }
            }
          }
          >

        {EditMoveData.address_of_pickup != '' &&
          <MapView.Marker
            coordinate={{latitude: Number(pickup_coords[0]), 
              longitude: Number(pickup_coords[1])}}
            title={"Pickup"}
            description={EditMoveData.address_of_pickup}
            pinColor = '#6cb6fb'
         />
        }

        {EditMoveData.address_of_delivery != '' &&
          <MapView.Marker
            coordinate={{latitude: Number(delivery_coords[0]), 
              longitude: Number(delivery_coords[1])}}
            title={"Pickup"}
            description={EditMoveData.address_of_pickup}
            pinColor = '#34ea34'
         />
        }

        {EditMoveData.address_of_pickup != '' && EditMoveData.address_of_delivery != '' &&


          <MapView.Polyline 
              coordinates={coords}
              strokeWidth={2}
              strokeColor="red"/>
          
        }
        </MapView>
        }
        </View>

        <View style = {{width: '100%', height: hp('8%'), justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: 'pink'}}>
          
          <View style = {{width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {{width: '100%', textAlign: 'left', fontSize : SelectedMoveTypeId != 0?wp('3%'):wp('4%'), fontWeight: '200', color: 'black', paddingLeft: wp('7%')}}>{SelectedMoveTypeId != 0?'Move Type':'Select Move Type'}</Text>
            {SelectedMoveTypeId != 0 &&
            <Text style = {{width: '100%', textAlign: 'left', fontSize : wp('3.5%'), fontWeight: '200', color: '#9B9B9B', paddingLeft: wp('7%')}}>{SelectedMoveTypeTitle}</Text>
            }
          </View>

          <View style = {{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Button b_Width = {'60%'} b_Height = {'60%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('3.5%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Select'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{setMoveTypeVisible(true)}}/> 
{/* setMoveTypeVisible(true) */}
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