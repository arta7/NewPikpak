import React, { useEffect, useRef, useState } from 'react';
import {View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity, FlatList,Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import NotificationItem from '../../Components/NotificationItem';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';


const Notifications = (props) => {

  const [NotificationEnable, setNotificationEnable] = useState(true)
  const [Notification, setNotification] = useState([])
   
  let GetNotification = async()=>{
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
        setNotification(response.data.push_notifications)

   })
   .catch( (error)=> {
     console.log('notif error  : ',error)  
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


  let RemoveNotification = async()=>{
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
     var params = {
       "user_id":LoginData.user_id
     }

     axios.post(APIMaster.URL + 
      APIMaster.NotificationsSetting.RemoveNotif,params,axiosConfig)
      .then((response)=> {
        
        GetNotification()

   })
   .catch( (error)=> {
     console.log('notif error  : ',error)  
   })
  }



   useEffect(()=>{
    GetNotification()
   // ReadNotification()
   },[])




  let drawer=useRef(null)
let openDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.open()
}

let closeDrawer=()=>{
  if(drawer != null && drawer.current !=null && drawer.current._root != null )
  drawer.current._root.close()
}

  return (

<Drawer ref={ drawer }  type='displace' side='left' 
 content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
 onClose={() => closeDrawer()} > 



    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Notification'} 
               LeftIconVisible = {true} RightIconVisible = {true}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('6%')}
               LeftIconFunction = {()=>{openDrawer()}}
               RightIconName = {'delete'} RightIconColor = {'#FFF'} 
               RightIconType = {'materialicon'} RightIconSize = {wp('6%')}
               RightIconFunction={()=>{
                 
                Alert.alert(
                  'Alert',
                  'Do You Want to Delete All Notification?', // <- this part is optional, you can pass an empty string
                  [
                    {text: 'Yes', onPress: () =>  RemoveNotification()},
                    {text: 'No', onPress: () => {}},
                  ],
                  {cancelable: false},
                );
                
               
              
              }}
                />

      <FlatList
              data={Notification}
              renderItem={({item}) => 

              <NotificationItem ItemHeight = {hp('8%')} ItemColor = {ColorPalet.MainBackground}
                                ItemTopMargin ={wp('0.5%')} ItemHorMargin = {wp('0.5%')}
                                TitleFontSize ={wp('3.2%')} TitleTextColor = {'black'}
                                TitleLeftMargin = {wp('3%')} Title = {item.name}
                                SubTitleFontSize ={wp('2.5%')} SubTitleTextColor = {'#9B9B9B'}
                                SubTitleLeftMargin = {wp('3%')} SubTitle = {item.created_at}
                                PressItem={()=>{ReadNotification()}}
                                />
              }
            />

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
    flex : 1,
    opacity : 80
  },
  Item: {
    width: wp('100%'), 
    height: hp('7%'), 
    borderBottomColor: 'silver', 
    borderBottomWidth: 1, 
    flexDirection: 'row'
  },
  _Text : {
    marginLeft: '10%',
    fontSize : wp('4%'), 
    fontWeight: '200', 
    color: 'black'
  }

  });
 
 export default Notifications;