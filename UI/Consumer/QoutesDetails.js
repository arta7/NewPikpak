import React, { useEffect, useState, useRef } from 'react';
import {View,
  Text,
  StyleSheet, 
  TouchableOpacity,ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {ColorPalet} from './../../Header/Header';
import LocationAddress from '../../Components/LocationAddress';
import { Icon } from 'react-native-elements';
import BidInfo from '../../Components/BidInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
// import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import Loading_Data from '../../Components/LoadingData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { LocationData } from '../../Redux/LocationData';
import Polyline from '@mapbox/polyline';
import { GoogleMaps } from '../../Redux/GoogleMapsData';
import { MoveData, 
  CurrentMove 
} from '../../Redux/MoveData';


const QoutesDetails = (props) => {

  const [Loader_Visible, setLoader_Visible] = useState(false)

  const CurrentMoveId = CurrentMove.move_id

  const [coords, setcoords] = useState([])

  const [BidsCount, SetBidsCount] = useState('')
  const [MoveTypeTitle, SetMoveTypeTitle] = useState('')
  const [MoveDateTime, SetMoveDateTime] = useState('')
  const [PickupAddress, SetPickupAddress] = useState('')
  const [DeliveryAddress, SetDeliveryAddress] = useState('')
  const [QouteComment, SetQouteComment] = useState('')
  const [QouteWeight, SetQouteWeight] = useState(5)
  const [RouteDistance, SetRouteDistance] = useState(121)
  const [MapButtonVisible, setMapButtonVisible] = useState(true)
  const [MoveImageUri, setMoveImageUri] = useState([])
  const mapView = useRef(null)

  const animateMap = (lat, lng) => {
    if(mapView.current != null)
    {
      if(LocationData.current_latitude != 0)
      {
    mapView.current.animateToRegion({ 
        
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,

    },2000);
    }
  }
  }

  let FitToCoordinates=()=> {

    if(mapView.current != null)
    {
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
}

  let GetMove = (_move_id)=>{

    setLoader_Visible(true)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
    }

    axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
    .then((response)=> {

      console.log('comment route ',response.data)
      //Toast.show(response.data.message)

      if(response.status == 200)
      {
        let BidsCount=0;
        for(let j=0;j<response.data.move.bids.length;j++)
        {
          if(response.data.move.bids[j].status =='pending')
          {
            BidsCount++;
          }
        }
        SetBidsCount(BidsCount.toString()+' Bids ')
        SetMoveTypeTitle(response.data.move.move_type.name)
        SetMoveDateTime(response.data.move.date_time_of_pickup)
        SetQouteComment(response.data.move.description)
        SetPickupAddress(response.data.move.address_of_pickup)
        // PickupLatitude = response.data.move.gps_of_pickup[0]
        // PickupLongitude = response.data.move.gps_of_pickup[1]

        SetDeliveryAddress(response.data.move.address_of_delivery)
        // DeliveryLatitude = response.data.move.gps_of_delivery[0]
        // DeliveryLongitude = response.data.move.gps_of_delivery[1]

        SetQouteWeight(response.data.move.weight)
        
        getDirections(CurrentMove.pickup_latitude + " , " + CurrentMove.pickup_longitude ,
                      CurrentMove.delivery_latitude + " , " + CurrentMove.delivery_longitude)
        
        // if(response.data.move.move_files.length != 0)
        {
          setMoveImageUri(response.data.move.move_files)
        }
        
        MoveData.move_bids = response.data.bids
        
      }
      setLoader_Visible(false)

    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)
    })
  }

  let getDirections = async(startLoc, destinationLoc)=> {
    try {
        const mode = 'driving'
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${GoogleMaps.map_api_key}&mode=driving`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
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

  useEffect(()=>{

    console.log('Current Lat : ', CurrentMove.pickup_latitude)
    GetMove(CurrentMoveId)

  },[])

 let  _mapReady = () => {

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


  let isCloseToBottom=({layoutMeasurement, contentOffset, contentSize})=> {

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

  }

  return (

    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator = {false}
        onScroll={({nativeEvent})=> {

          if(isCloseToBottom(nativeEvent)){
            FitToCoordinates()
          }
        }}>
      
      <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <MoveThumbnail  ImageSrc = {MoveImageUri}
                        ShowButtons = {false}
                       
                        />
        
      </View> 

      <View style = {{width: '100%', height: hp('9%'), marginTop: hp('0.5%'), flexDirection: 'row',
       justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <BidInfo MoveTypeTitle = {MoveTypeTitle} MoveDateTime = {MoveDateTime} BidsCount = {BidsCount == null ? 0 : BidsCount}
        DisableButton={true}
        />

      </View>

      <View style = {{width: '100%', height: hp('25%'), marginTop: hp('0.5%'), justifyContent: 'center', 
      alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

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

      <View style = {{width: '100%', height: hp('44%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('0%'), backgroundColor: 'gray'}}>
          
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

      <Modal style={{  marginHorizontal: wp('15%') }}
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
  }

  });
 
 export default QoutesDetails;