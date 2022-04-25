import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import DriverInfo from '../../Components/DriverInfo';
import Button from '../../Components/Button';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { MoveLocationsData, LocationData, DefaultLocationData } from '../../Redux/LocationData';
import SelectLocation from '../Common/SelectLocation';
import { CurrentMove, MoveData } from '../../Redux/MoveData';



const App = (props) => {
 
  const [DriverName, setDriverName] = useState('Driver Name')
  const [MoveComment, setMoveComment] = useState('Comment ...')
  const [Loader_Visible, setLoader_Visible] = useState(false)
  const [QoutesBidsList, setQoutesBidsList] = useState([])

  
  let GetBidsList = (_move_id)=>{
    
    console.log('Get bids list methode called _move_id',_move_id)
    
  
    console.log(_move_id)
  
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
  
     
    axios.get(APIMaster.URL + APIMaster.Move.GetMove + _move_id, axiosConfig)
    .then((response)=> {
            
            console.log(response.data.move.bids.length)  
        

            if(response.data.move.bids.length > 0)
            {
              let BidsData=[];
              for(let j=0;j<response.data.move.bids.length;j++)
              {
                if(response.data.move.bids[j].status =='pending')
                {
                  BidsData.push(response.data.move.bids[j])
                }
              }
              setQoutesBidsList(BidsData)
              console.log('response.data.move.bids',BidsData)
            }
  
    })
    .catch( (error)=> {
      console.log('Error : ',error)  

     
    })
  }

  let ActionOnBid = (_bid_id, _action)=>{
    
    console.log('Action On Bid methode called')
    setLoader_Visible(true)
  
    console.log(_bid_id, _action)
  
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }

     var params = {
       id : _bid_id,
       action : _action
     }
  
     
    axios.post(APIMaster.URL + APIMaster.Bid.ActionOnBid, params, axiosConfig)
    .then((response)=> {
      setLoader_Visible(false)
            console.log('response',response.data)  
        

            // if(response.data.status == 1)
            {
              // props.self.setState({lastRefresh:props.self.lastRefresh+1})
              // props.navigation.goBack()
              props.navigation.replace('QoutesControl')
            }
  
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      Alert.alert('error')
      setLoader_Visible(false)

     
    })
  }
  
  useEffect(()=>{

    GetBidsList(CurrentMove.move_id)
    // setQoutesBidsList(MoveData.move_bids)

  }, []);

  return (

    <View style={styles.Container}>
      
      {/* <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
                />  */}

      <FlatList
        data={QoutesBidsList}
        renderItem={({item}) => 
        <View style = {{width: '100%', height: hp('20%'), marginBottom: hp('1%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'silver', elevation: 2}}>
          <View style = {{width: '100%', height: hp('10%'), justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
           

           <DriverInfo DriverName = {item.user.username} MoveComment = {item.description}/>
           
         </View>
         <View style = {{width: '100%', height: hp('8%'), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

        
        <View style = {{width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {[styles._Text2, {color: 'black', textAlign: 'center', paddingLeft: 0}]}>Amount: </Text>

          <Text style = {[styles._Text3, {paddingLeft: 0}]}>{item.amount} $</Text>

        </View>

        <View style = {{width: '10%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}></View>
        

        <View style = {{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Button b_Width = {'90%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'200'} 
                t_ButtonTitle = {'Accept'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function={()=>{ActionOnBid(item._id, 'accepted')}}/>

        </View>

        <View style = {{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Button b_Width = {'90%'} b_Height = {'65%'} b_BackgroundColor = {'transparent'}
                b_BorderRadius = {30} b_Elevation = {3}
                b_BorderWidth = {2} b_BorderColor = {'red'}
                t_FontSize = {wp('4%')} t_FontWeight = {'100'} 
                t_ButtonTitle = {'Decline'} t_Elevation = {1} 
                t_TextColor = {'red'} HasIcon = {false}
                Function = {()=>{ActionOnBid(item._id, 'declined')}}/>

        </View>

        <View style = {{width: '5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}></View>

        </View>

        </View>
        }
      />

      
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
    fontSize : wp('3.5%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: 10
  },
  _Text2 : {
    width: '100%',
    textAlign: 'left',
    fontSize : wp('2.5%'), 
    fontWeight: '100', 
    color: '#9B9B9B',
    paddingLeft: 10
  },
  _Text3 : {
    width: '100%',
    textAlign: 'center',
    fontSize : wp('4%'), 
    fontWeight: 'bold', 
    color: '#000',
    paddingLeft: 10
  }

  });
 
 export default App;