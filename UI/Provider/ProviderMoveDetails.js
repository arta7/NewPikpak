import React, { useEffect, useState,useRef } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground,ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import LocationAddress from '../../Components/LocationAddress';
import { Icon } from 'react-native-elements';
import ServiceProvider from '../../Components/ServiceProvider';
import ActiveMoveInfo from '../../Components/ActiveMoveInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
// import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Headers from '../../Components/Headers';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';
import { MoveLocationsData, LocationData, DefaultLocationData } from '../../Redux/LocationData';
import SelectLocation from '../Common/SelectLocation';
import Polyline from '@mapbox/polyline';
import { GoogleMaps } from '../../Redux/GoogleMapsData';
import { MoveData, CurrentMove } from '../../Redux/MoveData';


let PickupLatitude
let PickupLongitude

let DeliveryLatitude
let DeliveryLongitude


const ProviderMoveDetails = (props) => {

  const [Loader_Visible, setLoader_Visible] = useState(false)

const [BidsCount, SetBidsCount] = useState(0)
const [MoveTypeTitle, SetMoveTypeTitle] = useState('')
const [MoveDateTime, SetMoveDateTime] = useState('')
const [QouteComment, SetQouteComment] = useState('')
const [QouteWeight, SetQouteWeight] = useState('')
const [RouteDistance, SetRouteDistance] = useState('')
const [PaymentStatus, SetPaymentStatus] = useState(false)
const [BidSelectionVisible, setBidSelectionVisible] = useState(false)
const [Picked, setPicked] = useState(false)
const [Droped, setDroped] = useState(false)
const [BidMoveStatus, setBidMoveStatus] = useState(false)
const [ConsumerName, setConsumerName] = useState('')
const [PickupAddress, SetPickupAddress] = useState('')
const [coords, setcoords] = useState([])
const [DeliveryAddress, SetDeliveryAddress] = useState('')
const [MoveImageUri, setMoveImageUri] = useState([])
const [UserVehicleId, setUserVehicleId] = useState()
const [UserPic, setUserPic] = useState()
const [showBid,setshowBid] = useState(true)

const mapView = useRef(null)

const animateMap = (lat, lng) => {
  if(mapView.current != null)
  {
  mapView.current.animateToRegion({ 
      
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

  },2000);
}
}



let GetMerchantDetail = async()=>{
  console.log('=== ', LoginData.user_id)
  var params = {
    user_id : LoginData.user_id
  }
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.post(APIMaster.URL +
    APIMaster.BankAccount.GetBankAccount, params)
 .then((response)=> {
         
        if(response.data.status != 0) 
        {
          setshowBid(true)
        }
        else
        {
          setshowBid(false)
        }

 })
 .catch( (error)=> {
   console.log('Error : ',error)  
 })
}


let GetVehicleId = async()=>{
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
         
         if(response.data.status == 1)
         {
        
          console.log('Vehicles: ', response.data.user.vehicles)
          setUserVehicleId(response.data.user.vehicles[0]._id)
          console.log('Vehicle Id: ', response.data.user.vehicles[0]._id)
         }
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
 
 })
}


let GetMove = (_move_id)=>{

  setLoader_Visible(true)
    
 // console.log('Get methode called : Bid Now Screen')
  

  //console.log(_move_id)

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }

  //  console.log(APIMaster.URL + APIMaster.Move.GetMove)
  axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
  .then((response)=> {
          
          console.log('response data move details ',response.data)  
          
          //Toast.show(response.data.message)

          // console.log(response.data.status)
          
          // LoginData.Code = code;
          // CheckUserActive();
         
          
          if(response.status == 200)
              {
                SetBidsCount(response.data.move.total_bids)
                SetMoveTypeTitle(response.data.move.move_type.name)
                SetMoveDateTime(response.data.move.date_time_of_pickup)

                SetPickupAddress(response.data.move.address_of_pickup)
                PickupLatitude = response.data.move.gps_of_pickup[0]
                PickupLongitude = response.data.move.gps_of_pickup[1]

                SetDeliveryAddress(response.data.move.address_of_delivery)
                DeliveryLatitude = response.data.move.gps_of_delivery[0]
                DeliveryLongitude = response.data.move.gps_of_delivery[1]

                SetQouteWeight(response.data.move.weight)

                setConsumerName(response.data.move.username)

                SetQouteComment(response.data.move.description)
                
                
                getDirections(response.data.move.gps_of_pickup[0] + " , " + response.data.move.gps_of_pickup[1] ,
                              response.data.move.gps_of_delivery[0] + " , " + response.data.move.gps_of_delivery[1])
                
                MoveData.move_bids = response.data.bids

                if(response.data.move.move_files.length != 0)
                {

                   
                  setMoveImageUri(response.data.move.move_files)
                }

                setUserPic(response.data.move.user_pic)
                
              }
              setLoader_Visible(false)
     
  })
  .catch( (error)=> {
    console.log('Error : ',error)  
    setLoader_Visible(false)
    //setshowIndicator(false)
   
  })
}

let getDirections = async(startLoc, destinationLoc)=> {
  try {
      const mode = 'driving'
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
      // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      // console.log('points\n')
      // console.log(respJson.routes[0].overview_polyline)
      // console.log(respJson.routes[0].legs[0].distance.value)
      // console.log(Number(Number(respJson.routes[0].legs[0].distance.value) * 0.000621371).toFixed(1))
      // console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
      let coords = points.map((point, index) => {
          return  {
              latitude : point[0],
              longitude : point[1]
          }
      })
      SetRouteDistance(Number(Number(respJson.routes[0].legs[0].distance.value) * 0.000621371).toFixed(1))
      setcoords(coords)
      return coords
  } catch(error) {
      console.log(error)
      return error
  }
}


let ChangeTransaction=(action)=>{

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
   var params = {
     id:CurrentMove.move_id,
     action:action
   }

  axios.post(APIMaster.URL + APIMaster.Move.ActionOnMove,params,axiosConfig)
  .then((response)=> {
          
          console.log('response data Change transaction ',response.data)  
          
          Toast.show(response.data.message)      
        
     
  })
  .catch( (error)=> {
    console.log('Error : ',error)
   
  })
}


let SetMoveStatus=()=>
{  
  console.log('Picked')
      if(Picked)
      {
        //setBidMoveStatus(Picked)
        ChangeTransaction('picked')

      }
      else if(Droped)
      {
       // setBidMoveStatus(Droped)
        ChangeTransaction('dropped')
      }

      

  //  setBidSelectionVisible(false)
}

let FitToCoordinates=()=> {
  console.log('latitude: ',CurrentMove.pickup_latitude , 'longitude: ',CurrentMove.pickup_longitude)
  mapView.current.fitToCoordinates([
      { latitude: CurrentMove.pickup_latitude, longitude: CurrentMove.pickup_longitude }, 
      { latitude: CurrentMove.delivery_latitude, longitude: CurrentMove.delivery_longitude }
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

let BidSelection=(Id)=>
  {
    switch(Id)
    {
      case 1:
        {
          setPicked(true)
          setDroped(false)
          return
        }
      case 2:
        {
          setPicked(false)
          setDroped(true)
          return
        }
    }
  }

  let isCloseToBottom=({layoutMeasurement, contentOffset, contentSize})=> {

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

  }

  let _mapReady = () => {

    if(CurrentMove.pickup_description == '' && CurrentMove.delivery_description == '') {
      animateMap(LocationData.current_latitude, LocationData.current_longitude)
    }
    else if(CurrentMove.pickup_description != '' && CurrentMove.delivery_description == '') {
      animateMap(CurrentMove.pickup_latitude, CurrentMove.pickup_longitude)
    }
    else if((CurrentMove.pickup_description != '' && CurrentMove.delivery_description == '') || 
            (CurrentMove.pickup_description == '' && CurrentMove.delivery_description != '')) {
      animateMap(CurrentMove.delivery_latitude, CurrentMove.delivery_longitude)
    }
  }

  useEffect(()=>{
    //console.log('CurrentMove.move_id',CurrentMove.move_id)
    GetMove(CurrentMove.move_id)
    GetVehicleId()
    GetMerchantDetail()
  }, [])

  return (

    <View style={styles.Container}>
      
      {CurrentMove.provider_move_details_header == 'on' &&
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Move Details'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                 />
}
<ScrollView showsVerticalScrollIndicator = {false}
        onScroll={({nativeEvent})=> {

          if(isCloseToBottom(nativeEvent)){
            FitToCoordinates()
          }
        }}>
      {/* <View style = {{width: '100%', height: hp('9%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Button b_Width = {'90%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {10} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Request a Quote'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{}}/>

      </View> */}

   
      <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
      
        <MoveThumbnail  ImageSrc = {MoveImageUri}
                        ShowButtons = {false} ShowPayButton = {   true } 
                        ButtonTitle = {CurrentMove.provider_move_details_header == 'on' ? 'Bid Now' : 'Change'}
                        Function = {()=>{CurrentMove.provider_move_details_header == 'on' ? 
                        showBid==true ? 
                      ((LoginData.status == 1  || LoginData.status == -1 ) && LoginData.InlineStatus != 0 ) ?
                        props.navigation.navigate('BidNow', {move_id : CurrentMove.move_id,
                                           user_id : LoginData.user_id,
                                          move_type_title : MoveTypeTitle,
                                        move_date_time : MoveDateTime,
                                        move_img : MoveImageUri.length > 0 ?  MoveImageUri[0].file_name : require("./../../Image/ImagePlaceholder.png"),
                                      vehicle_number : UserVehicleId}) 
                                      :  Toast.show('Please Complete ProfessionalDetails.') :Toast.show('Please Complete Merchante Details.') 
                                       : setBidSelectionVisible(true)}} />
                        
      </View>
    

      <View style = {{width: '100%', height: hp('9%'), marginTop: hp('0.5%'), flexDirection: 'row',
       justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <ActiveMoveInfo MoveTypeTitle = {MoveTypeTitle} MoveDateTime = {MoveDateTime} Function = {console.log('1365')} ButtonVisible = {false}
         payment_status=''
        />

      </View>

      <View style = {{width: '100%', height: hp('25%'), marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '50%'}}>

          <LocationAddress AddressTitle = {'Pick Up :'} Address = {PickupAddress} />

        </View>

        <View style = {{width: '100%', height: '50%'}}>

          <LocationAddress AddressTitle = {'Delivery :'} Address = {DeliveryAddress} />

        </View>

      </View>

      <View style = {{width: '100%', height: hp('7%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '25%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Weight :  </Text>

        </View>

        <View style = {{width: '75%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {[styles._Text2, {textAlign: 'left'}]}>{QouteWeight + ' lbs'}</Text>

        </View>

      </View>

      <View style = {{width: '100%', height: hp('13%'), marginTop: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
      
        <ServiceProvider Title = {'Consumer Detail'} DriverName = {ConsumerName} UserImage = {UserPic != null ? {uri : UserPic} 
        : require("./../../Image/person.png")}/>

      </View>

      <View style = {{width: '100%', height: hp('12%'), marginTop: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '40%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

              <Icon name = {'comment'} color= {'#B8BBBD'} type = {"material-community"} size={wp('5%')}/>

          </View>

          <View style = {{width: 'auto', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <Text style = {[styles._Text, {paddingLeft: 5}]}>Comment : </Text>

          </View>

        </View>

        <View style = {{width: '100%', height: '60%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

          </View>

          <ScrollView>
          <View style = {{width: 'auto', height: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

              <Text style = {[styles._Text2, { fontSize : wp('3.5%'), paddingRight: 60, paddingLeft: 5, textAlignVertical: 'top',backgroundColor: ColorPalet.MainBackground}]}>{QouteComment}</Text>

          </View>
          </ScrollView>

        </View>

      </View>

      <View style = {{width: '100%', height: hp('7%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: wp('10%'), height: '100%', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: ColorPalet.MainBackground}}>

          <Icon name = {'map-marker-distance'} color= {'#B8BBBD'} type = {"material-community"} size={25}/>

        </View>

        <TouchableOpacity style = {{width: wp('25%'), height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                          onPress = {()=>{FitToCoordinates()}}>

          <Text style = {[styles._Text, {paddingLeft: 0}]}>Map Route : </Text>

        </TouchableOpacity>

      <View style = {{width: 'auto', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Text style = {[styles._Text2, {textAlign: 'left'}]}>{RouteDistance + ' Miles'}</Text>

      </View>

    </View>

      <View style = {{width: '100%', height: hp('50%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.SignUpButton}}>
        {PickupLatitude != '' && PickupLongitude != '' &&
//       <MapView  style={{ ...StyleSheet.absoluteFillObject }}
//           initialRegion={{
//             latitude: DefaultLocationData.default_latitude,
//             longitude: DefaultLocationData.default_longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           >


//           {/* <MapView.Marker
//             coordinate={{latitude: PickupLatitude,
//             longitude: PickupLongitude}}
//             title={"Delivery"}
//             description={PickupAddress}
//             pinColor = '#34ea34'
//           />
     
//           <MapView.Marker
//             coordinate={{latitude: DeliveryLatitude,
//             longitude: DeliveryLongitude}}
//             title={"Pickup"}
//             description={DeliveryAddress}
//             pinColor = '#6cb6fb'
//          /> */}
        
//         {/* {PickupLatitude != '' &&
//         <MapView.Polyline 
//             coordinates={coords}
//             strokeWidth={2}
//             strokeColor="red"/>
// } */}

//           </MapView>

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
            if(CurrentMove.delivery_description != '' && CurrentMove.pickup_description != '') {
              
              FitToCoordinates()
              
              }
            }
          }>

          {CurrentMove.pickup_description != '' &&
            <MapView.Marker
              coordinate={{latitude: CurrentMove.pickup_latitude, 
                longitude: CurrentMove.pickup_longitude}}
              title={"Pickup"}
              description={CurrentMove.pickup_description}
              pinColor = '#6cb6fb'
          />
          }

          {CurrentMove.delivery_description  != '' &&
            <MapView.Marker
              coordinate={{latitude: CurrentMove.delivery_latitude, 
                longitude: CurrentMove.delivery_longitude}}
              title={"Delivery"}
              description={CurrentMove.delivery_description}
              pinColor = '#34ea34'
          />
          }

          {CurrentMove.pickup_description != '' && CurrentMove.delivery_description != '' &&


            <MapView.Polyline 
                coordinates={coords}
                strokeWidth={2}
                strokeColor="red"/>
            
          }
        </MapView>
}
      </View>

      </ScrollView>

        <Modal style={{  marginHorizontal: wp('15%') }}
            isVisible={Loader_Visible}
            // onBackdropPress={() => setLoader_Visible(false)}
            >

          <Loading_Data />

        </Modal>

      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={BidSelectionVisible}
          onBackdropPress={() => setBidSelectionVisible(false)}>

          <View style={{width:wp('80%'), height: hp('30%'),   backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: '100%', height: hp('6%'), marginBottom: hp('2%'), borderBottomColor: 'silver', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Text style = {{textAlign: 'center', fontSize: wp('4%')}}>Change Status</Text>

          </View>


          <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Picked'} TextSize = {wp('4%')}
                       Selected = {Picked} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>{BidSelection(1)}}/>

          <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Droped'} TextSize = {wp('4%')}
                       Selected = {Droped} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>{BidSelection(2)}}/>
          <View style = {{width: '100%', height: hp('12%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <Button b_Width = {'85%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                    b_BorderRadius = {15} b_Elevation = {3}
                    t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                    t_ButtonTitle = {'Select'} t_Elevation = {3} 
                    t_TextColor = {'white'} HasIcon = {false}
                    Function = {()=>SetMoveStatus()}/>

            </View>
         
          </View>

        </Modal>

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
    height: '100%',
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '100', 
    color: 'black'
  },
  _Text2 : {
    width: 'auto',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '100',
    color: '#797979',
    flexWrap: 'wrap'
  },
  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 
 export default ProviderMoveDetails; 