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
import { CurrentMove, MoveData } from '../../Redux/MoveData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { LocationData } from '../../Redux/LocationData';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';

const ProviderMoves = (props) => {
  const [Loader_Visible, setLoader_Visible] = useState(false)
// const [BidsCount, SetBidsCount] = useState(0)
// const [MoveTypeTitle, SetMoveTypeTitle] = useState('Business Deliveries')
// const [MoveDateTime, SetMoveDateTime] = useState('07/01/2021 02:49 PM')
// const [PickupAddress, SetPickupAddress] = useState('KLCC, Kuala Lumpur City Center, Kuala Lumpour, Federal Terriority of Kuala Lumpour')
// const [DeliveryAddress, SetDeliveryAddress] = useState('Pavilion Kuala Lumpour, Bukit Bintang Street, Bukit Bintang, Kuala Lumpour')
// const [SearchValue, SetSearchValue] = useState('')
const [MovesList, setMovesList] = useState([
    // {imageSrc: require("./../../Image/ImagePlaceholder.png"), moveTypeTitle: 'Business Deliveries', moveDateTime: '07/01/2021 02:49 PM', pickupAddress: 'Src address #1', deliveryAddress: 'Dest address #1'},
    // {imageSrc: require("./../../Image/ImagePlaceholder.png"), moveTypeTitle: 'Apartment Move', moveDateTime: '07/01/2021 02:49 PM', pickupAddress: 'Src address #2', deliveryAddress: 'Dest address #2'},
    // {imageSrc: require("./../../Image/ImagePlaceholder.png"), moveTypeTitle: 'Business Deliveries', moveDateTime: '07/01/2021 02:49 PM', pickupAddress: 'Src address #3', deliveryAddress: 'Dest address #3'},
    // {imageSrc: require("./../../Image/ImagePlaceholder.png"), moveTypeTitle: 'Donations', moveDateTime: '07/01/2021 02:49 PM', pickupAddress: 'Src address #4', deliveryAddress: 'Dest address #4'},
    // {imageSrc: require("./../../Image/ImagePlaceholder.png"), moveTypeTitle: 'Piano', moveDateTime: '07/01/2021 02:49 PM', pickupAddress: 'Src address #5', deliveryAddress: 'Dest address #5'},
])

let drawer=useRef(null)
let openDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.open()
}

let closeDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.close()
}

let GetAvailableMoveList = async()=>{
  setLoader_Visible(true)
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
   axios.get(APIMaster.URL + 
    APIMaster.Move.GetAvailableMoveList + LoginData.user_id + '?latitude='+
     LocationData.current_latitude
    +'&longitude='+
     LocationData.current_longitude
      , axiosConfig)
    .then((response)=> {
  console.log('Get Place Lat & long')
        
         console.log(response.data.moves)  
         
         setMovesList(response.data.moves)
         setLoader_Visible(false)
 })
 .catch( (error)=> {
   console.log('Error : ',error)  
   setLoader_Visible(false)
 })
}



useEffect(()=>{
  GetAvailableMoveList()

}, [])


  return (

<Drawer ref={ drawer }  type='displace' side='left' content={<Sidebar navigator={props.navigation} 
closeItem = {()=> closeDrawer()}/>} closeItem = {()=> closeDrawer()} > 


    <View style={styles.Container}>

      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Moves'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('6%')}
               LeftIconFunction = {()=>{openDrawer()}} />

        {/* <SearchBox SearchValue = {SearchValue} OnChangeFunction = {(v)=>{SetSearchValue(v)}}
                   OnPressFunction = {()=>{SetSearchValue('')}}/> */}

<FlatList
style = {{marginTop: hp('1%')}}
        data={MovesList}
        showsVerticalScrollIndicator = {false}
        renderItem={({item}) => 
<View style = {{width: '100%', height: hp('35%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', elevation: 5}}>
<ProviderMovesItem ImageSrc = { item.move_files.length >0 ? {uri: item.move_files[0].file_name }: require("./../../Image/ImagePlaceholder.png") } 
                           MoveTypeTitle = {item.move_type.name}
                           MoveDateTime = {item.date_time_of_pickup}
                           PickupAddress = {item.address_of_pickup}
                           DeliveryAddress = {item.address_of_delivery}
                           ButtonTitle = {'Detail'} 
                           Function = {()=>{props.navigation.navigate('ProviderMoveDetails')
                                            CurrentMove.move_id = item._id
                                            CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
                                            CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
                                            CurrentMove.pickup_description = item.address_of_pickup
                                            CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
                                            CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
                                            CurrentMove.delivery_description = item.address_of_delivery
                                            CurrentMove.provider_move_details_header = 'on' 
                                            console.log('test gps 2 ',CurrentMove)
                                            }} />
                           {/* Function = {()=>{props.navigation.navigate('BidNow', {move_id: item._id, user_id: LoginData.user_id, 
                                                                                move_img: require("./../../Image/ImagePlaceholder.png"), 
                                                                                move_type_title: item.move_type.name,
                                                                                move_date_time: item.date_time_of_pickup,
                                                                                vehicle_number: '6169784f45a3eb528f304f43'})}} /> */}
</View>
        }
      />
      
        
        

      
      

      <Modal style={{  marginHorizontal: wp('15%')}}
            isVisible={Loader_Visible}
            // onBackdropPress={() => setLoader_Visible(false)}
            >

          <Loading_Data />

        </Modal>

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
    textAlign: 'left',
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
 
 export default ProviderMoves;