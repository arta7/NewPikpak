import React, { useRef, useState } from 'react';
import {View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import SwitchButton from '../../Components/SwitchButton';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import Toast from 'react-native-simple-toast';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';


const NotificationSetting = (props) => {

  const [NotificationEnable, setNotificationEnable] = useState(true)


  

let SetNotificationSetting = async(_user_id, 
    _notification_status)=>{


// setLoader_Visible(true)


var params = {
user_id : _user_id,
notification_status : _notification_status
}
var axiosConfig = {
headers:{
Accept : 'application/json',
Content_Type : 'application/json'
}
}
console.log(params)

axios.post(APIMaster.URL +
APIMaster.NotificationsSetting.SetNotificationsSetting, params, axiosConfig)
.then((response)=> {

console.log(response)  

Toast.show(response.data.message)

// LoginData.Code = code;
// CheckUserActive();
if(response.data.status != 1)
{
  setNotificationEnable(!_notification_status)
}




})
.catch( (error)=> {
console.log('Error : ',error)  
setNotificationEnable(!_notification_status)


})


}

let Set_Notification_Setting=(_status)=>{
  setNotificationEnable(!_status)
  SetNotificationSetting(LoginData.user_id, !_status ? "on" : "off")
}


  let Dim = wp('7%')


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
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Notification Setting'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {30}
               LeftIconFunction = {()=>{openDrawer()}} />

      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={styles.backgroundImage}>
        
        <View style = {styles.Item}>
          
          <View style = {{width: '50%', height: '100%', justifyContent: 'center'}}>
            
            <Text style ={styles._Text}>Notifications</Text>
          
          </View>
          
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', paddingRight: '5%'}}>

            <SwitchButton Diameter = {Dim} ActiveState = {NotificationEnable}
                          Function = {()=>{Set_Notification_Setting(NotificationEnable)}}/>
          
          </View>

        </View>

      </ImageBackground>

    </View>  
   </Drawer>
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.MainBackground
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
 
 export default NotificationSetting;