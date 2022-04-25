import React, { useEffect, 
  useRef, 
  useState 
} from 'react';
import {View,
  Text,
  StyleSheet, 
  FlatList
} from 'react-native';
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import Button from '../../Components/Button';
import BidInfo from '../../Components/BidInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import { DefaultLocationData, 
  LocationData, 
  MoveLocationsData 
} from '../../Redux/LocationData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { CurrentMove, EditMoveData, MoveData } from '../../Redux/MoveData';
import Loading_Data from '../../Components/LoadingData';

let SelectedMoveId = ''

const MyQoutes = (props) => {

  const [Loader_Visible, setLoader_Visible] = useState(false)

  const [DeleteConfirm_Visible, setDeleteConfirm_Visible] = useState(false) 

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

  let GetMyQoutesList = async()=>{
    
    setLoader_Visible(true)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.Move.GetMyQoutesList + LoginData.user_id + '/open', axiosConfig)
    .then((response)=> {
      console.log(response)
      if(response.data.status == 1)
      {
        let Data = response.data.moves;
        for(let i=0;i<Data.length;i++)
        {
         
           if(Data[i].bids.length > 0)
           {
            // console.log('i + ',i,Data[i].bids)
              let BidsCounter=0;
              for(let j=0;j<Data[i].bids.length;j++)
              {
                console.log('i + ',i,Data[i].bids[j])
                if(Data[i].bids[j].status == 'pending')
                {
                  BidsCounter++;
                }
              }
              if(BidsCounter < 2)
              Data[i].total_bids = BidsCounter.toString() + ' Bid';
              else
              {
                Data[i].total_bids = BidsCounter.toString() + ' Bids';
              }
             

           }
        }
        setMoveList(Data)
      }

      setLoader_Visible(false)
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
   })
  }

  let DeleteMove =(_move_id)=>{
    
    setDeleteConfirm_Visible(false)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }

    axios.delete(APIMaster.URL + APIMaster.Move.DeleteMove + _move_id, axiosConfig)
    .then((response)=> { 
            
     // Toast.show(response.data.message)

      if(response.data.status == 1)
        {
          GetMyQoutesList()
        }
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
    
    })
  }

  let ConfirmDeleteItem =(_move_id)=>{

    SelectedMoveId = _move_id

    setDeleteConfirm_Visible(true)

    console.log(SelectedMoveId)
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
      console.log(response)
      if(response.status == 200)
        {
          
          EditMoveData.address_of_pickup = response.data.move.address_of_pickup
          EditMoveData.gps_of_pickup = response.data.move.gps_of_pickup

          EditMoveData.address_of_delivery = response.data.move.address_of_delivery
          EditMoveData.gps_of_delivery = response.data.move.gps_of_delivery

          EditMoveData.move_type_id = response.data.move.move_type_id

          EditMoveData.date_of_pickup = response.data.move.date_of_pickup

          console.log('EditMoveData.date_of_pickup',EditMoveData.date_of_pickup)
          EditMoveData.time_of_pickup = response.data.move.time_of_pickup

          EditMoveData.move_images = response.data.move.move_files
          console.log('Move Images: ', EditMoveData.move_images)

          EditMoveData.weight = response.data.move.weight
          EditMoveData.no_of_helpers = response.data.move.no_of_helpers
          EditMoveData.description = response.data.move.description
          
          props.navigation.navigate('CreateMove_Location', {move_id: _move_id, 
            pickup_coords: response.data.move.gps_of_pickup.toString().replace('[', '').replace(']', '').split(','),
            delivery_coords: response.data.move.gps_of_delivery.toString().replace('[', '').replace(']', '').split(','),})
          
        } 

        setLoader_Visible(false)
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)
    })
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
    MoveData.delivery_place_id = ''

}



  useEffect(()=>{

    GetMyQoutesList()

  }, []);
  
    return (
  
    <Drawer ref={ drawer }  type='displace' side='left'
    content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
    onClose={() => closeDrawer()} > 
  
      <View style={styles.Container}>
        
        <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'My Quotes'} 
                  LeftIconVisible = {true} RightIconVisible = {false}
                  LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
                  LeftIconType = {'material-community'} LeftIconSize = {icon_size}
                  LeftIconFunction = {()=>{openDrawer()}} />

        <View style = {{width: '100%', height: hp('9%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground, elevation: 2}}>

          <Button b_Width = {'90%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                  b_BorderRadius = {10} b_Elevation = {3}
                  t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Request a Quote'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>{
                    ResetEditMoveData()
                    ResetMoveData()
                    MoveLocationsData.pickup_description = ''
                    MoveLocationsData.pickup_latitude = ''
                    MoveLocationsData.pickup_longitude = ''

                    MoveLocationsData.delivery_description = ''
                    MoveLocationsData.delivery_latitude = ''
                    MoveLocationsData.delivery_longitude = ''

                    DefaultLocationData.default_latitude = LocationData.current_latitude
                    DefaultLocationData.default_longitude = LocationData.current_longitude

                    props.navigation.push('CreateMove_Location', {move_id: ''})}}/>

        </View>


        <FlatList
          data={moveList}
          renderItem={({item}) => 
          <View style = {{width: '100%', height: hp('45%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'silver', elevation: 2}}>
            <View style = {{width: '100%', height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
            
              <MoveThumbnail  ImageSrc = {item.move_files}
               showDetails={true}
                              ShowButtons = {true} ShowEditButtons = {item.total_bids == '0 Bid'} 
                              MainFunction = {()=>{CurrentMove.move_id = item._id
                                                  CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
                                                  CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
                                                  CurrentMove.pickup_description = item.address_of_pickup
                                                  CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
                                                  CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
                                                  CurrentMove.delivery_description = item.address_of_delivery
                                                  props.navigation.navigate('QoutesControl')}}
                              DeleteFunction = {()=>{ConfirmDeleteItem(item._id)}}
                              EditFunction = {()=>{ GetMove(item._id) }}/>
              
            </View>

            <View style = {{width: '100%', height: hp('9%'), marginTop: hp('1%'), flexDirection: 'row', justifyContent: 'center', 
            alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <BidInfo MoveTypeTitle = {item.move_type.name} MoveDateTime = {item.date_time_of_pickup} BidsCount = {item.total_bids}
              Function = {()=>{
                console.log('test')
                LoginData.CurrentPage = 1;
                CurrentMove.move_id = item._id
                CurrentMove.pickup_latitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[0])
                CurrentMove.pickup_longitude = parseFloat(item.gps_of_pickup.toString().replace('[', '').replace(']', '').split(',')[1])
                CurrentMove.pickup_description = item.address_of_pickup
                CurrentMove.delivery_latitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[0])
                CurrentMove.delivery_longitude = parseFloat(item.gps_of_delivery.toString().replace('[', '').replace(']', '').split(',')[1])
                CurrentMove.delivery_description = item.address_of_delivery
                

                props.navigation.navigate('QoutesControl')}}
              //DisableButton={true}
              />

            </View>
          </View>
          }
        />

        <Modal style={{  marginHorizontal: wp('15%')}}
            isVisible={Loader_Visible}>

          <Loading_Data />

        </Modal>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={DeleteConfirm_Visible}
          onBackdropPress={() => setDeleteConfirm_Visible(false)}>

          <View style={{width:wp('70%'), height: hp('15%'), backgroundColor: '#FFF', elevation: 2}}>

            <View style={{width:'100%', height: '60%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}>

              <Text style ={styles._Text}>Are you sure to delete this move?</Text>

            </View>

            <View style={{width:'100%', height: '40%', backgroundColor: '#FFF', flexDirection: 'row'}}>
              <View style={{width:'50%', height: '100%', backgroundColor: '#FFF', flexDirection: 'row'}}>

                <Button b_Width = {'90%'} b_Height = {'95%'} b_BackgroundColor = {'transparent'}
                  b_BorderRadius = {15} b_Elevation = {0}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'200'} 
                  t_ButtonTitle = {'No'} t_Elevation = {3} 
                  t_TextColor = {'#339cff'} HasIcon = {false}
                  Function = {()=>{ setDeleteConfirm_Visible(false) }}/>

              </View>

              <View style={{width:'50%', height: '100%', backgroundColor: '#FFF', flexDirection: 'row'}}>

                <Button b_Width = {'90%'} b_Height = {'95%'} b_BackgroundColor = {'transparent'}
                  b_BorderRadius = {15} b_Elevation = {0}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'200'} 
                  t_ButtonTitle = {'Yes'} t_Elevation = {3} 
                  t_TextColor = {'#339cff'} HasIcon = {false}
                  Function = {()=>{ DeleteMove(SelectedMoveId) }}/>

              </View>
            </View>

          </View>

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
  _Text : {
    width: '100%',
    textAlign: 'center',
    fontSize : wp('3.5%'), 
    fontWeight: '200', 
    color: 'black'
  }

  });
 
 export default MyQoutes;