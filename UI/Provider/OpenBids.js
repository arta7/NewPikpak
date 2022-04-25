import React, { useEffect, useRef, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import MovesLocationAddress from '../../Components/MovesLocationAddress';
import { Icon } from 'react-native-elements';
import BidInfo from '../../Components/BidInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
// import { ScrollView } from 'react-native-gesture-handler';
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import ProviderMovesItem from '../../Components/ProviderMovesItem';
import SearchBox from '../../Components/SearchBox';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { MoveData, CurrentMove } from '../../Redux/MoveData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { LocationData } from '../../Redux/LocationData';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
let _BidsList = []
const OpenBids = (props) => {

const [BidsList, setBidsList] = useState([])
  // const [_BidsList, set_BidsList] = useState([])
 
let icon_size = wp('6%')
const [Loader_Visible, setLoader_Visible] = useState(false)



let drawer=useRef(null)
let openDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.open()
}

let closeDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.close()
}

async function GetMove_Image (_move_id,_amount,_title,_bidId) {

  console.log(_move_id)

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }

   console.log('move image ',APIMaster.URL + APIMaster.Move.GetMove)
  axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
  .then((response)=> {
          
          console.log('MOVE: ',response.data.move)  
          
          if(response.status == 200)
              {
           

                _BidsList.push({id: response.data.move._id, 
                  date_time_of_pickup: response.data.move.date_time_of_pickup,
                  address_of_pickup: response.data.move.address_of_pickup,
                  address_of_delivery: response.data.move.address_of_delivery,
                  move_type_name: _title,
                  move_image: response.data.move.move_files[0].file_name,
                  amount:_amount,
                  BidsId:_bidId,
                  gps_of_pickup:response.data.move.gps_of_pickup,
                  gps_of_delivery:response.data.move.gps_of_delivery
                })
                setBidsList(_BidsList)
                
              }



              console.log('_BildList is current',_BidsList)
            
     
  })
  .catch( (error)=> {
    console.log('Error : ',error)  

    //setshowIndicator(false)
   
  })
}


let GetMoveType = async(_id,_image,_amount,_bidsId)=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.URL +
    APIMaster.Move.GetMoveType+'/'+_id, axiosConfig)
 .then((response)=> {


     console.log('movetype ',response.data)
        if(response.status == 200)
        {
          GetMove_Image(_image,_amount,response.data.move_type.name,_bidsId)
         
        }
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
  
 })
}



let GetMyBidsList = async()=>{
 
  _BidsList = []

  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
   axios.get(APIMaster.URL + 
    APIMaster.Bid.GetMyBidsList + LoginData.user_id + '/pending'  , axiosConfig)
    .then((response)=> {
      console.log('Bids :', response) 
      console.log('Bids Length :', response.data.bids.length) 
      console.log('Bids :', response.data)  

         
        if(response.data.status == 1)
        {
         
          console.log('******** Bids List Move ID : ', response.data.bids[0])

          for(let i=0; i<response.data.bids.length; i++)
          {
            GetMoveType(response.data.bids[i].move.move_type_id,response.data.bids[i].move_id,response.data.bids[i].amount,response.data.bids[i]._id)
                // GetMove_Image(response.data.bids[i].move_id,response.data.bids[i].amount)
          }

          console.log('_BildList is current 2 : ',_BidsList)
          
         
        }
        else
        {
          console.log('+++++++++++++++++++')
        }

 })
 .catch( (error)=> {
   console.log('Error : ',error)  
   setLoader_Visible(false)
 })
}

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


  axios.post(APIMaster.URL + APIMaster.Bid.CancelActiveBid, params, axiosConfig)
  .then((response)=> {
          
          console.log(response)  
          props.navigation.navigate('Home')
          props.navigation.navigate('ProviderMovesControl')
     
  })
  .catch( (error)=> {
    console.log('Error : ',error)  
    // setLoader_Visible(false)
    //setshowIndicator(false)
   
  })
}

useEffect(()=>{
  GetMyBidsList()

}, [])

  return (

<Drawer ref={ drawer }  type='displace' side='left' 
content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
      onClose={() => closeDrawer()} > 


    <View style={styles.Container}>

      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Open Bids'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {icon_size}
               LeftIconFunction = {()=>{openDrawer()}} />
{BidsList.length == 0 &&
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      
        <Text style ={styles._Text}>No Bids</Text>

      </ImageBackground>
      }

      {BidsList.length > 0 &&
        
<View style={[styles.backgroundImage, {justifyContent: 'center'}]}>
<FlatList
        data={BidsList}
        renderItem={({item}) => 
        // <TouchableOpacity onPress={()=>{
        //   props.navigation.navigate('ProviderMoveDetails')
          
        //                                     CurrentMove.move_id = item.id
        //                                     CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
        //                                     CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
        //                                     CurrentMove.pickup_description = item.address_of_pickup
        //                                     CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
        //                                     CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
        //                                     CurrentMove.delivery_description = item.address_of_delivery
        //                                     CurrentMove.provider_move_details_header = 'on' 
        // }}>
        <ProviderMovesItem ImageSrc = {{uri:item.move_image}} 
                           MoveTypeTitle = {item.move_type_name}
                           MoveDateTime = {item.date_time_of_pickup}
                           PickupAddress = {item.address_of_pickup}
                           DeliveryAddress = {item.address_of_delivery} 
                           ButtonTitle = {'Cancel'} 
                           MoveAmount={item.amount + '$'}
                           Function = {()=>{CancleBid(item.id, item.BidsId)}}/>
    //  </TouchableOpacity>
        }
      />
        
        
        </View>
      
 } 

      

    </View>  
   </Drawer>
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor:  ColorPalet.DarkBackground
  },
  backgroundImage: {
    height: hp('100%'),
    backgroundColor: ColorPalet.DarkBackground,
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
    textAlign: 'center',
    fontSize : wp('3.5%'), 
    fontWeight: '200', 
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
 
 export default OpenBids;