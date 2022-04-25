import React, { useRef, useState, useEffect } from 'react';
import {View,
  Text,
  Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import ActiveMoveInfo from '../../Components/ActiveMoveInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { MoveData, CurrentMove } from '../../Redux/MoveData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { LocationData } from '../../Redux/LocationData';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';


const Workload = (props) => {

  const [WorkloadList, setWorkloadList] = useState([])
  const [Loader_Visible, setLoader_Visible] = useState(false)
  let icon_size = wp('6%')
  let drawer=useRef(null)

  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  let GetWorkloadList = async()=>{
    
    setLoader_Visible(true)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.Move.GetWorkloadList + LoginData.user_id , axiosConfig)
   .then((response)=> {
           
           console.log('response workLoad : ',response.data)  
           
           console.log('************')

           if(response.data.status == 1)
           {
             setWorkloadList(response.data.moves)


             console.log(response.data.moves) 
           }

           setLoader_Visible(false)
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
   })
  }

  useEffect(()=>{

    GetWorkloadList()
    
  }, [])
  
    return (
  
  <Drawer ref={ drawer }  type='displace' side='left' 
   content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
  onClose={() => closeDrawer()} > 
  

    <View style={styles.Container}>
      
    <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Workload'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {icon_size}
               LeftIconFunction = {()=>{openDrawer()}} />

      {WorkloadList.length == 0 &&
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      
        <Text style ={styles._Text}>No Workload</Text>

      </ImageBackground>
      }

      {!WorkloadList.length == 0 &&
      // <View style={[styles.backgroundImage, {justifyContent: 'center'}]}>

      <FlatList
        style = {{marginTop: hp('1%')}}
        data={WorkloadList}
        showsVerticalScrollIndicator = {false}
        renderItem={({item}) => 
        <View style = {{width: '100%', height: hp('45%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'silver', elevation: 2}}>
          <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
          
            <MoveThumbnail  ImageSrc = {item.move_files}
                            ShowButtons = {false} 
                            PickedState={item.status == 'picked' ? true : false}
                            showDetails={true}
                            MainFunction = {()=>{props.navigation.navigate('DriverMovesControl', {move_id: item._id})
                                                CurrentMove.move_id = item._id
                                                CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
                                                CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
                                                CurrentMove.pickup_description = item.address_of_pickup
                                                CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
                                                CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
                                                CurrentMove.delivery_description = item.address_of_delivery

                                                CurrentMove.provider_move_details_header == 'off'}}/>
          
          </View>

          <View style = {{width: '100%', height: hp('9%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <ActiveMoveInfo MoveTypeTitle = {item.move_type.name}
             MoveDateTime = {item.date_time_of_pickup} payment_status={item.bids[0].payment_status}
             payment_status=''
             />

          </View>
        </View>
        }
      />

      

      // {/* </View> */}
      }
          <Modal style={{  marginHorizontal: wp('15%') }}
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
    backgroundColor: ColorPalet.DarkBackground
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
  }

  });
 
 export default Workload;