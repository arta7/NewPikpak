import React, { useEffect, 
  useRef, 
  useState ,useContext
} from 'react';

import {View,
  StyleSheet, 
  TouchableOpacity,
  Text,
  FlatList,PermissionsAndroid,TouchableHighlight,Alert,Vibration,Image
} from 'react-native';
import CenterModals from './../../Components/CenterModal'
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {ColorPalet} from '../../Header/Header';
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import HistoryItem from '../../Components/HistoryItem';
import MapView, { Marker, Circle } from 'react-native-maps';
import { Icon, Input } from 'react-native-elements';
import { LoginData } from './../../Redux/LoginData';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMaps } from '../../Redux/GoogleMapsData';
import Sound from 'react-native-sound';
import {Redux} from '../../Redux/Data'
import { DefaultLocationData, 
  LocationData, 
  MoveLocationsData 
} from '../../Redux/LocationData';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import Polyline from '@mapbox/polyline';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { EditMoveData, MoveData,CurrentMove } from '../../Redux/MoveData';
import { event } from 'react-native-reanimated';
import realm from './realm';
let FisrtLoading = true
let Location_History = []
let ShowNotification = false
const Home = (props) => {
  const[pattern,setpattern]=useState([1000, 2000])
  var sound = new Sound("./../../Image/test.mp3", (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
        }
  })

  // const value = useContext(Redux);
  // const [context, setContext] = useContext(Redux);
  const drawer=useRef(null)
  const IsDriver = true
  const SearchBar = useRef(null)
  const [cntr, setCntr] = useState(0)
  const mapView = useRef(null);
  const [showMarker, setShowMarker] = useState(false)
  const [showNotif, setshowNotif] = useState(false)
  const [coords, setcoords] = useState([])
  const [MovesList, setMovesList] = useState([])
   const[Notifname,setsetNotifname] = useState('')
 
  const [LocationHistory_Visible, setLocationHistory_Visible] = useState(false)
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  let SrcSet = false
  let mapRegion = {
    longitude: LocationData.current_longitude,
    latitude: LocationData.current_latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

//   playSound = () => {
//     setTimeout(() => {
    

//       setTimeout(() => {
//           sound.play((success) => {
//                   /* ... */
//           });
//     }, 100);
// }, 100);
//       }

  

  


  let getDirections = async(startLoc, destinationLoc)=> {
        try {
            const mode = 'driving'
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            console.log('points\n')
            console.log(respJson.routes[0].overview_polyline.points)
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            setcoords(coords)
            return coords
        } catch(error) {
            console.log(error)
            return error
        }
    }


  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
     drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
     drawer.current._root.close()
  }


  async function requestlocation(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'get Your Position',
          message:
            'Do You Geet App Position access?',
          buttonNeutral: 'Later',
          buttonNegative: 'No',
          buttonPositive: 'Yes',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // try
      // {
        Geolocation.getCurrentPosition(
          pos => {
            console.log('pos.coords.latitude',pos.coords.latitude)
            console.log('pos.coords.longitude',pos.coords.longitude)

             DefaultLocationData.default_latitude = pos.coords.latitude
             DefaultLocationData.default_longitude =   pos.coords.longitude

            LocationData.current_latitude = pos.coords.latitude
            LocationData.current_longitude =  pos.coords.longitude

            setPosition({
              latitude: pos.coords.latitude,
              longitude:pos.coords.longitude
            })
          
              _mapReady()
             
           console.log('Update Latitude ')
          
              // LocationData.current_latitude =pos.coords.latitude
              // LocationData.current_longitude =pos.coords.longitude
          },
          (error)=> console.log('Update Error ',error),
          { enableHighAccuracy: true, timeout: 2000,
            maximumAge: 3600000,}
          )
          
        // }
        // catch
        // {
        //   console.log('you don not get permission1')
        // }
      }
    }
    catch
    {
       console.log('you don not get permission')
    }
  }


  let GetPlaceLatLng = async(place_id)=> {
    
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.GURL + 
              APIMaster.GooglePlace.GetLatLng.replace('{placeid}', place_id).replace('{key}', GoogleMaps.map_api_key))
    .then((result)=> {

      if(result.data.status == 'OK')
      {
        ResetMoveData()
        ResetEditMoveData()
        ResetMoveLocationsData()

        MoveLocationsData.delivery_latitude = result.data.result.geometry.location.lat
        MoveLocationsData.delivery_longitude = result.data.result.geometry.location.lng

        DefaultLocationData.default_latitude = result.data.result.geometry.location.lat
        DefaultLocationData.default_longitude = result.data.result.geometry.location.lng

        SearchBar.current.setAddressText('')
        
        props.navigation.navigate('CreateMove_Location', {move_id: 0})
      }
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
    })
  }

  let ResetMoveLocationsData=()=>{
    // MoveLocationsData.delivery_description = '',
    MoveLocationsData.delivery_latitude = 0,
    MoveLocationsData.delivery_longitude = 0,
    MoveLocationsData.pickup_description = '',
    MoveLocationsData.pickup_latitude = 0,
    MoveLocationsData.pickup_longitude = 0,
    MoveLocationsData.distance = 0
  }

  let ResetEditMoveData=()=>{
    EditMoveData.address_of_pickup = '',
    EditMoveData.gps_of_pickup = '',
    EditMoveData.address_of_delivery = '',
    EditMoveData.gps_of_delivery = '',
    EditMoveData.move_type_id = '',
    EditMoveData.date_of_pickup = '',
    EditMoveData.time_of_pickup = '',
    EditMoveData.move_images = [],
    EditMoveData.weight = 0,
    EditMoveData.no_of_helpers = 0,
    EditMoveData.description = '',
    EditMoveData.consumer_vehicle_id = '',
    EditMoveData.move_bids = []

}

let ResetMoveData=()=>{
  MoveData.address_of_pickup = ''
  MoveData.gps_of_pickup = ''
  MoveData.address_of_delivery = ''
  MoveData.move_type_id = ''
  MoveData.pickup_unit_number = ''
  MoveData.pickup_stairs = ''
  MoveData.pickup_elevator_building = ''
  MoveData.pickup_parking_info = ''
  MoveData.delivery_unit_Number = ''
  MoveData.delivery_stairs = ''
  MoveData.delivery_elevator_building = ''
  MoveData.delivery_parking_info = ''
  MoveData.date_of_pickup = ''
  MoveData.time_of_pickup = ''
  MoveData.move_images = []
  MoveData.weight = ''
  MoveData.no_of_helpers = ''
  MoveData.description = ''
  MoveData.consumer_vehicle_id = ''
  MoveData.move_bids = []

}

  let LoadHistoryList= async()=> {
    SearchBar.current.setAddressText('')

    // let loc_history = await AsyncStorage.getItem("LocationHistory")

    try {
      let history = await AsyncStorage.getItem('@LocationHistory:key');
      Location_History = JSON.parse(history)
      if (Location_History !== null) {
        // We have data!!
        // console.log(JSON.parse(Location_History));

        setLocationHistory_Visible(true)
      }
    } catch (error) {
      // Error retrieving data
      console.log('E: ',error)
    }
    
    console.log('Async storage: ',Location_History)

    
    // Add_Loc_History()
  }
   
   let EnableLocation=()=>{
    // RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    //   interval: 5000,
    //   fastInterval: 2000,
    // }).then((data) => {
    //     console.log('data location',data)
       
    //   })
    //   .catch((err) => {
    //     console.log('data location error',err)
    //   })
   
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
    .then(data => {
      // if (data === "already-enabled")
       {
        // console.log('data location',data)
        requestlocation()
      } 
      // else {
      //   setTimeout(() => {
      //     requestlocation()
      //   }, 1000)
      // }
    }).catch((err) => {
          // console.log('data location error',err)
        })
    
   }


   let GetProfessionalDetails = async()=> {

    var axiosConfig = {

      headers: {
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
    }
   
    axios.get(APIMaster.URL + APIMaster.ProfessionalDetail.GetProfessionalDetail + LoginData.user_id, axiosConfig)
    .then((response)=> {
        LoginData.status = response.data.status;
        LoginData.InlineStatus=response.data.status;
        
        
    })
    .catch( (error)=> {
     console.log('Error : ',error)  
   
   })
  }



  useEffect(()=>{
    // console.log('ChangeState',props.navigation.getParam('ChangeState'))
    EnableLocation()
   
    let interval = setInterval(() => { 
      // if(ShowNotification == false)
     
      GetAvailableMoveList() ;
      if(LoginData.role == 'provider')
      GetProfessionalDetails()

    
     // setCntr(cntr+1)
    }, 15000)
    
     return(()=>{
      clearInterval(interval)
    })
  }, []);

  let ClearMoveLocationsData=()=> {
    MoveLocationsData.delivery_description= '';
    MoveLocationsData.delivery_latitude= 0;
    MoveLocationsData.delivery_longitude= 0;
    MoveLocationsData.pickup_description= '';
    MoveLocationsData.pickup_latitude= 0;
    MoveLocationsData.pickup_longitude= 0;
    MoveLocationsData.distance= 0;
  }

  let GetAvailableMoveList = async()=>{
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
     axios.get(APIMaster.URL + 
      APIMaster.Move.GetAvailableMoveList + LoginData.user_id + '?latitude='
       +LocationData.current_latitude
      +'&longitude='+ LocationData.current_longitude
        , axiosConfig)
      .then((response)=> {
    // console.log('Get Place Lat & long')
          
            // console.log('Moves list : ',LocationData.current_longitude)  
           
           setMovesList(response.data.moves)

   })
   .catch( (error)=> {
    //  console.log('Error : ',error)  
    // setLoader_Visible(false)
   })
  }


 let  add_Data=(_counter)=>{
 const pr =realm.objects('Counting');

  realm.write(() => {
    realm.delete(pr)
  });

    realm.write(() => {
  
      var ID = realm.objects('Counting').length + 1;
  
       realm.create('Counting', {
         id: ID, 
         Counter:_counter
        });  
    });
  
   // Alert.alert("Student Details Added Successfully.")
  
  }

  let GetNotification = async(edd)=>{
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
     axios.get(APIMaster.URL + 
      APIMaster.NotificationsSetting.GetPushNotifications +
      LoginData.user_id
        )
      .then((response)=> {
         
        LoginData.badgeCount = response.data.badge == undefined ?'0':response.data.badge.toString()
        // console.log(' LoginData.badgeCount', LoginData.badgeCount)
        // value.Counter.setCount(response.data.badge)
        add_Data(response.data.badge == undefined ?'0':response.data.badge.toString())
        // setContext(response.data.badge)
        // edd.preventDefault();
        // event && event.preventDefault && event.preventDefault()
      //  console.log('value badge ',response.data.badge)


   })
   .catch( (error)=> {
     console.log('notif error  : ',error)  
     add_Data("0")
   })
  }

  let ReadNotification = async()=>{
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
     axios.get(APIMaster.URL + 
      APIMaster.NotificationsSetting.ReadAllNotifications +
      LoginData.user_id
        )
      .then((response)=> {
        
        console.log(response)

   })
   .catch( (error)=> {
     console.log('notif error  : ',error)  
   })
  }






  let animateMap = () => {
     
     console.log('mapView.current',mapView.current)
    if(mapView.current != null)
    {
      if(LocationData.current_latitude != 0)
      {
    mapView.current.animateToRegion({ 
        
      latitude: LocationData.current_latitude,
      longitude:  LocationData.current_longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,

    },2000);
      }
    }
  }

 let  _mapReady = () => {
    console.log("map ready");
    animateMap()
  }
  

    
  return (
  
    <Drawer ref={ drawer }  side='left' 
    content={<Sidebar navigator={props.navigation} closeItem = {()=> closeDrawer()} />} onClose={()=>closeDrawer()} > 
      <View style={styles.Container}>

      <CenterModals showModal={showNotif} closeModal={()=>{
         ReadNotification()
        ShowNotification=false;
        setshowNotif(false)}} 
        name={Notifname}/>

        <MapView  style={{ ...StyleSheet.absoluteFillObject }}
          ref = {mapView}
          initialRegion={{
            longitude:  LocationData.current_longitude,
            latitude:  LocationData.current_latitude,
            latitudeDelta: 30,
            longitudeDelta: 0.0421}}
          showsUserLocation = {true}
          showsMyLocationButton={true}
          followsUserLocation = {true}
          
          onMapReady = { () =>  mapView.current != null ?  _mapReady() : null }
          >
      {(LoginData.role == 'provider') &&
          MovesList.map((item, index)=>
          
          <MapView.Marker
            coordinate={{latitude: item.gps_of_pickup[0],
            longitude: item.gps_of_pickup[1]}}
            title={item.move_type.name}
            key={index}
            description={item.address_of_pickup}
            onPress={() =>{
            
              props.navigation.navigate('ProviderMoveDetails')
              CurrentMove.move_id = (item._id.toString().trim())
              CurrentMove.provider_move_details_header = 'on'
              CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
              CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
              CurrentMove.pickup_description = item.address_of_pickup.toString()
              CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
              CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
              CurrentMove.delivery_description = item.address_of_delivery.toString()   
              
              console.log('test gps ',CurrentMove)
             
     }}
         >

         <Image source={require('./../../Image/Package.png')} style={{width:60,height:60}} resizeMode='stretch' />

         </MapView.Marker>
          )
         }

        </MapView>

        <TouchableOpacity style = {{width: hp('7%'), height: hp('7%'), backgroundColor: 'transparent', justifyContent: 'center', position: 'absolute'}}
                          onPress = {() => {openDrawer()}}>

          <Icon name = 'menu' color= '#000' type = "material-community" size={wp('7%')}/>
        
        </TouchableOpacity>

        
        {(LoginData.role != 'provider') &&
        
        <View style = {{width: wp('100%'), backgroundColor: 'transparent', overflow: 'hidden', position: 'absolute', top: hp('10%')}}>

          <GooglePlacesAutocomplete
            ref = {SearchBar}
            placeholder='Move To?'
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: 'transparent'
              },
              textInput: {
                height: hp('6%'),
                color: '#5d5d5d',
                fontSize: wp('4%'),
                marginLeft: wp('3%'),
                borderRadius: 0,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderWidth: 0.5,
                borderColor: 'silver'
                
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            onPress={(data, details = null) => {
              // ClearMoveLocationsData()

              MoveLocationsData.delivery_description = data.description
              
              GetPlaceLatLng(details.place_id)

            }}
            query={{
              key: GoogleMaps.map_api_key,
              language: 'en',
            }}
            renderRightButton={() => (
              <TouchableOpacity
                style={{
                  width: hp('7%'), 
                  height: hp('6%'), 
                  backgroundColor: '#FFF',
                  marginRight: wp('3%'),
                  borderRadius: 0,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  justifyContent: 'center',
                  borderWidth: 0.5,
                borderColor: 'silver',
                borderLeftWidth: 2
                }}
                onPress={() => {
                  LoadHistoryList()
                }}
              >
                <Icon
                  
                  style={{color : 'red'}}
                  name= "history"  size={wp('7%')} color={'#B0B0B0'} type='material-community'
                />
              </TouchableOpacity>
            )}
        />
      
        </View>
        }
        <Modal style={{  marginHorizontal: wp('2.5%'), justifyContent: 'flex-end'}}
          isVisible={LocationHistory_Visible}
          onBackdropPress={() => setLocationHistory_Visible(false)}>

          <View style={{width:wp('95%'), height: 'auto',   backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: '100%', height: hp('6%'), borderBottomColor: 'silver', borderBottomWidth: 2, 
          justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {[styles._Text,{paddingLeft: 15}]}>Recently Destinations</Text>

          </View>
          
          

          <FlatList
            data={Location_History}
            
            renderItem={({item})=>(

              <HistoryItem ItemTitle = {item.delivery_address} Function = {()=>{
                console.log(item.delivery_address)}} Function = {()=>{
                  ResetMoveData()
                  ResetEditMoveData()
                  ResetMoveLocationsData()
                  MoveLocationsData.delivery_description = item.delivery_address
                  GetPlaceLatLng(item.delivery_place_id)
                setLocationHistory_Visible(false)}} />
              // <Text>123</Text>
              
            )}
          />

          </View>

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
  _Text : {
    width: '100%',
    textAlign: 'left',
    fontSize : wp('4%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: wp('5%')
  }

  });
 
 export default Home;

