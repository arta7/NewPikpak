import React, { useEffect, useState,useRef } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground,Linking,Alert,ScrollView,Platform
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
import NativeIntentAndroid from 'react-native/Libraries/Linking/NativeLinking'


const ActiveMoveDetails = (props) => {

  let PickupLatitude
  let PickupLongitude

  let DeliveryLatitude
  let DeliveryLongitude

  const [Loader_Visible, setLoader_Visible] = useState(false)

  const [BidsCount, SetBidsCount] = useState(0)
  const [MoveTypeTitle, SetMoveTypeTitle] = useState('')
  const [MoveDateTime, SetMoveDateTime] = useState('')
  const [QouteWeight, SetQouteWeight] = useState()
  const [RouteDistance, SetRouteDistance] = useState()
  const [PaymentStatus, SetPaymentStatus] = useState('')
  const [PaymentTypeVisible, setPaymentTypeVisible] = useState(false)
  const [IsPaypal, setIsPaypal] = useState(true)
  const [IsSavedCard, setIsSavedCard] = useState(false)
  const [PickupAddress, SetPickupAddress] = useState('')
  const [DeliveryAddress, SetDeliveryAddress] = useState('')
  const [QouteComment, SetQouteComment] = useState('')
  const CurrentMoveId = CurrentMove.move_id
  const [coords, setcoords] = useState([])
  const [BidId, SetBidId] = useState('')
  const [Amount, SetAmount] = useState(0)
  const [ProviderName, SetProviderName] = useState('')
  const [MoveImage, setMoveImage] = useState([])
  const [UserPic, setUserPic] = useState('')
  const [DefaultCard, setDefaultCard] = useState('')
  const [DefaultCardId, setDefaultCardId] = useState('')
  const mapView = useRef(null);
  const [UpdateScreen, setUpdateScreen] = useState(1)

  
  let CancleBid =(move_id, bid_id)=>{
    
    console.log('Cancle Bid methode called')
  
    var params = {
        user_id: LoginData.user_id,
        move_id: move_id,
        bid_id: bid_id,
        reason: 'reason'
    }
  
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
  
  
    axios.post(APIMaster.URL + APIMaster.Bid.CancelBid, params, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
            
            
            props.navigation.replace('QoutesControl')
  
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

let GetMove = (_move_id)=>{

  setLoader_Visible(true)
    
  console.log('Get methode called')
  

  console.log(_move_id)

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }

   console.log(APIMaster.URL + APIMaster.Move.GetMove)
  axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
  .then((response)=> {
          
          console.log('move details ',response.data.move)  
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

                SetQouteComment(response.data.move.description)
                
                getDirections(response.data.move.gps_of_pickup[0] + " , " + response.data.move.gps_of_pickup[1] ,
                              response.data.move.gps_of_delivery[0] + " , " + response.data.move.gps_of_delivery[1])
                
                MoveData.move_bids = response.data.bids

                for(let i=0; i < response.data.move.bids.length; i++)
                {
                  if(response.data.move.bids[i].status == 'accepted')
                  {
                    SetBidId(response.data.move.bids[i]._id)
                    SetAmount(response.data.move.bids[i].amount)
                    SetProviderName(response.data.move.bids[i].user.username)
                    SetPaymentStatus(response.data.move.bids[i].payment_status)
                    console.log('response.data.move.bids[i]._id : ',response.data.move.bids[i]._id)
                  }
                }

                setUserPic(response.data.move.user_pic)

                if(response.data.move.move_files.length > 0)
                {
                  setMoveImage(response.data.move.move_files)
                }
                // GetMyQoutesList()

                // console.log(CardsList.length)
                // AsyncStorage.setItem("user_id", response.data.data._id)
                // AsyncStorage.setItem("username", response.data.data.username)
                // AsyncStorage.setItem("role", response.data.data.role)
                // console.log('---------------')
                
                // props.navigation.goBack()

                // setLoader_Visible(false)
                
              }
              setLoader_Visible(false)
     
  })
  .catch( (error)=> {
    console.log('Error : ',error)  
    setLoader_Visible(false)
    //setshowIndicator(false)
   
  })
}



let GetPaymentCardList =()=>{
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }

  axios.get(APIMaster.URL + APIMaster.PaymentCard.PaymentCardList + LoginData.user_id)
  .then((response)=> {
          
         console.log('response.data.payment_cards :',response.data.payment_cards)

          if(response.data.status == 1)
              {
                for(let i=0;i<response.data.payment_cards.length;i++)
                {
                  if(response.data.payment_cards[i].default == '1')
                  {
                    setDefaultCard(response.data.payment_cards[i].number)
                    setDefaultCardId(response.data.payment_cards[i].paypal_id)
                  }
                }
                // setCardListEmpty(false)
               // setCardsList(response.data.payment_cards[0])

                // setLoader_Visible(false)   
              }
              // else
              // {
              //   setCardListEmpty(true)
              // }
             
  })
  .catch( (error)=> {
    console.log('Error : ',error)  

  })
}



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
      SetRouteDistance(Number(Number(respJson.routes[0].legs[0].distance.value) * 0.000621371).toFixed(1))
      setcoords(coords)
      return coords
  } catch(error) {
      console.log(error)
      return error
  }
}

let PaymentsComplete=(amount)=>{
  // var params = {
  //   user_id: LoginData.user_id,
  //   move_id: CurrentMove.move_id,
  //   "amount": amount
  // }
  setPaymentTypeVisible(false)  
  props.navigation.push('PaymentPage',{Address:APIMaster.URL +APIMaster.PaymentCard.Payment+'/'+BidId,onSelect: onSelect})

// var axiosConfig = {
//   headers:{
//     Accept : 'application/json',
//     Content_Type : 'application/json'
//   }
//  }


// axios.get(APIMaster.URL + APIMaster.PaymentCard.Payment+'/'+bid_id, axiosConfig)
// .then((response)=> {
        
//         console.log('Payment Success : ',response.data)  
        
//         // Alert.alert('Alert',response.data.message)
//         setPaymentTypeVisible(false)
//       if(response.data.status == 1)
//       {
       
//       //  props.navigation.replace('MovesControl')
      
//       //  Linking.openURL('https://webapp.pikpakapp.com/payment'+'/'+response.data.message._id);
//        props.navigation.push('PaymentPage',{Address:APIMaster.PaymentCard.Payment+'/'+bid_id,onSelect: onSelect})
    
//       }
// })
// .catch( (error)=> {
//   console.log('Error PaymentComplete : ',error)  
//   setPaymentTypeVisible(false)  
//   // Alert.alert('Alert','error')
// })
 }


let  onSelect =()=> {
  setUpdateScreen(UpdateScreen+1)
}

 let handleOpenURL=(event)=>{
      
  console.log('test details1', event.url)
  // if(event.url.split('/')[2] == Address.PaymentAddress)
  // {
  //   console.log('Code',event.url.split('?')[1].toString().substring(5).toString())
   
  // }
}

useEffect(()=>{
  GetMove(CurrentMoveId)
//  Alert.alert('test details')
  // Linking.getInitialURL().then(url => {
  //   handleOpenURL(url)
   
  // })
  // Linking.addEventListener('url', handleOpenURL);

  // return () => {
  //   Linking.removeEventListener('url', handleOpenURL);
  // }
},[UpdateScreen])




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

 handleOpenURL=(event)=>{
  console.log('test details1 event url 3 : ', event)
 
}



// Payment 4  (function)
let PaymentFunction=()=>{
  // if(DefaultCard != '')
  PaymentsComplete(Amount)
  

  // else
  // Alert.alert('Please Set One Card in Manage Card Screen')
  // setPaymentTypeVisible(false)
}

let PaymentMethodeSelection=(Id)=>
  {
    switch(Id)
    {
      case 1:
        {
          setIsPaypal(true)
          setIsSavedCard(false)
          return
        }
      case 2:
        {
          setIsPaypal(false)
          setIsSavedCard(true)
          return
        }
    }
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
  
  let isCloseToBottom=({layoutMeasurement, contentOffset, contentSize})=> {
  
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  
  }

  return (

    <View style={styles.Container}>
     
       {/* <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'My Qoutes'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
                />  */}
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
        {
        <MoveThumbnail  ImageSrc = {MoveImage}
                        ButtonTitle = {'Pay'}
                        ShowButtons = {false} ShowPayButton = { PaymentStatus != 'paid'  ? true :false} 

                        Function = {()=>{setPaymentTypeVisible(true)}} />
        }
        
      </View>

      <View style = {{width: '100%', height: hp('9%'), marginTop: hp('0.5%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <ActiveMoveInfo MoveTypeTitle = {MoveTypeTitle} MoveDateTime = {MoveDateTime}
         Function = {()=>{CancleBid(CurrentMove.move_id, BidId)}} ButtonVisible = {true} payment_status=''/>

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


        <View style = {{width: '20%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Weight :  </Text>

        </View>

        <View style = {{width: '20%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {[styles._Text2, {textAlign: 'left'}]}>{QouteWeight + ' lbs'}</Text>

        </View>

        <View style = {{width: '30%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Payment :  </Text>

        </View>

        <View style = {{width: '20%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {[styles._Text2, {textAlign: 'left', color: PaymentStatus == 'paid' ? 'blue' : 'red'}]}>{PaymentStatus}</Text>

        </View>

      </View>

      <View style = {{width: '100%', height: hp('13%'), marginTop: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
      
        <ServiceProvider Title = {'Consumer Detail'} DriverName = {ProviderName} UserImage = {UserPic != null ? {uri : UserPic} : require("./../../Image/person.png")}/>

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
        
      </View>

      </ScrollView>

      <Modal style={{  marginHorizontal: wp('10%'), borderRadius:10}}
          isVisible={PaymentTypeVisible}
          onBackdropPress={() => setPaymentTypeVisible(false)}>

          <View style={{width:wp('80%'), height: hp('28%'),backgroundColor: ColorPalet.MainBackground}}>

          <View style = {{width: '100%', height: hp('6%'), marginBottom: hp('2%'), borderBottomColor: 'silver',
           borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {{textAlign: 'center', fontSize: wp('3.5%'),}}> Payment From Paypal</Text>
         
          </View>


          <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Paypal'} TextSize = {wp('4%')}
                       Selected = {IsPaypal} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>{PaymentMethodeSelection(1)}}/>

  
          <View style = {{width: '90%', height: hp('12%'), justifyContent: 'center'
          , alignItems: 'center', backgroundColor: ColorPalet.MainBackground,marginHorizontal:'5%',marginTop:'3%'}}>

            <Button b_Width = {'40%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                    b_BorderRadius = {15} b_Elevation = {3}
                    t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                    t_ButtonTitle = {'Pay'} t_Elevation = {3} 
                    t_TextColor = {'white'} HasIcon = {false}
                    Function = {()=>{PaymentFunction()}}/>

          </View>
         
          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={Loader_Visible}>

        <Loading_Data />

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
 
 export default ActiveMoveDetails; 