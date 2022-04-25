import React, { useEffect, useRef, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import ActiveMoveInfo from '../../Components/ActiveMoveInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { CurrentMove } from '../../Redux/MoveData';

const ActiveMove = (props) => {

  const [Loader_Visible, setLoader_Visible] = useState(false)
  const [BidsCount, SetBidsCount] = useState(0)
  const [MoveTypeTitle, SetMoveTypeTitle] = useState('Apartment Move')
  const [MoveDateTime, SetMoveDateTime] = useState('07/01/2021 02:49 PM')
  const [QouteComment, SetQouteComment] = useState('Test')
  const [QouteWeight, SetQouteWeight] = useState(5)
  const [RouteDistance, SetRouteDistance] = useState(121)
  
  
  const [moveList, setMoveList] = useState([])

  let icon_size = wp('7%')
  let drawer=useRef(null)

  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  let GetActiveMoveList = async()=>{
    
    setLoader_Visible(true)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.Move.GetMyQoutesList + LoginData.user_id + '/processing', axiosConfig)
   .then((response)=> {
           
           console.log('Active move',response.data.bids)  
           
           console.log('************')

           if(response.data.status == 1)
           {
             setMoveList(response.data.moves)


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

    GetActiveMoveList()
    
  }, [])

    return (

  <Drawer ref={ drawer }  type='displace' side='left' 
   content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
  onClose={() => closeDrawer()} > 


      <View style={styles.Container}>

      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Active Moves'} 
                LeftIconVisible = {true} RightIconVisible = {false}
                LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
                LeftIconType = {'material-community'} LeftIconSize = {icon_size}
                LeftIconFunction = {()=>{openDrawer()}} />


      

      {/* <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <MoveThumbnail  ImageSrc = {require("./../../Image/logo.png")}
                        ShowButtons = {false} 
                        MainFunction = {()=>{props.navigation.navigate('ActiveMovesControl')}}/>
        
      </View>

      <View style = {{width: '100%', height: hp('9%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <ActiveMoveInfo MoveTypeTitle = {MoveTypeTitle} MoveDateTime = {MoveDateTime} />

      </View> */}

      <FlatList
        style = {{marginTop: hp('1%')}}
        data={moveList}
        showsVerticalScrollIndicator = {false}
        renderItem={({item}) => 
        <View style = {{width: '100%', height: hp('45%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'silver', elevation: 2}}>
          <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
          
            <MoveThumbnail  ImageSrc = {item.move_files}
                            ShowButtons = {false} 
                            showDetails={true}
                            MainFunction = {()=>{props.navigation.navigate('ActiveMoveControl', {move_id: item._id})
                                                CurrentMove.move_id = item._id
                                                CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
                                                CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
                                                CurrentMove.pickup_description = item.address_of_pickup
                                                CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
                                                CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
                                                CurrentMove.delivery_description = item.address_of_delivery}}/>
          
          </View>

          <View style = {{width: '100%', height: hp('9%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

            <ActiveMoveInfo MoveTypeTitle = {item.move_type.name} MoveDateTime = {item.date_time_of_pickup} payment_status={item.bids[0].payment_status} />

          </View>
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
 
 export default ActiveMove;