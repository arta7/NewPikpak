



import React,{useEffect, useState} from 'react';
import {TabNavigator, TabBarBottom, createBottomTabNavigator
  ,createAppContainer,createStackNavigator,StackActions ,NavigationActions, createDrawerNavigator } 
from 'react-navigation';
import {Icon, Tile, withBadge} from 'react-native-elements';
import { I18nManager,View ,Image,Text,StyleSheet,Vibration} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IconBadge from 'react-native-icon-badge';


import MyQoutes from './MyQoutes'
import Help from './../Common/Help'
import ActiveMove from './ActiveMove'
import PreviousMoves from './PreviousMoves'
import Notifications from './../Common/Notifications'
import { LoginData } from '../../Redux/LoginData';
import { APIMaster } from '../../API/APIMaster';
import axios from 'axios';

export default  MovesControl=(props)=>{

    const [Badge, setBadge] = useState('0');

    useEffect(()=>{
      GetNoticCount()
        let interval = setInterval(() => { 
           
          GetNoticCount()
           // setCntr(cntr+1)
          }, 15000);
          
           return(()=>{
            clearInterval(interval)
          })
    
    },[])

    let GetNoticCount=()=>{            
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
          setBadge(response.data.badge == undefined ?'0':response.data.badge.toString())
          // setctrl(true)
  
     })
     .catch( (error)=> {
       console.log('notif error  : ',error)  
     })
     }


    // let GetNotification = async()=>{
    //     var axiosConfig = {
    //       headers:{
    //         Accept : 'application/json',
    //         Content_Type : 'application/json'
    //       }
    //      }
    //      axios.get(APIMaster.URL + 
    //       APIMaster.NotificationsSetting.GetPushNotifications +
    //       LoginData.user_id
    //         )
    //       .then((response)=> {
             
    //         if(response.data.badge > 0)
    //         {
    //          setBadge(response.data.badge)
    //         }
    
    //    })
    //    .catch( (error)=> {
    //      console.log('notif error  : ',error)  
    //    })
    //   }




    var MyQouteses = createStackNavigator({ 

        MyQoutes: { screen: MyQoutes },  
      },{
      headerMode: 'none'
      }
      )
      
      

      
      var ActiveMoves = createStackNavigator({ 
      
        ActiveMove: { screen: ActiveMove },  
      },{
        headerMode: 'none'
        }
        )
      var Notificationses = createStackNavigator({ 
      
        Notifications: { screen: Notifications },  
      },{
        headerMode: 'none'
        }
        )
        var PreviousMoveses = createStackNavigator({ 
      
          PreviousMoves: { screen: PreviousMoves },  
        },{
          headerMode: 'none'
          }
          )

  //  var Appcontainer = createStackNavigator({ 

   var Appcontainer = createBottomTabNavigator ({
  
            
      MyQoutes : {
        screen: MyQouteses ,
  
        navigationOptions: {
          tabBarIcon : ({focused, tintColor}) =>  <Icon name="file-document-edit" size={wp('6%')} color={tintColor} type='material-community' />,
          tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10,
           fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>My Quotes</Text>,
          tabBarOnPress: ({navigation, defaultHandler}) => {
           navigation.replace('MyQoutes')
          
          defaultHandler()
          },
        }
      },
      ActiveMove : {
          screen : ActiveMoves,
          navigationOptions: {
            tabBarIcon : ({focused, tintColor}) =>  <Icon name="text-box-check" size={wp('6%')} color={tintColor} type='material-community' />,
            tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight:
             'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Active Moves</Text>,
            tabBarOnPress: ({navigation, defaultHandler}) => {
             navigation.replace('ActiveMove')
            
            defaultHandler()
          }, 
        }
      },
      PreviousMoves : {
          screen : PreviousMoveses,
          navigationOptions: {
            tabBarIcon : ({focused, tintColor}) =>  <Icon name="text-box-search" size={wp('6%')} color={tintColor} type='material-community' />,
            tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, 
            fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Previous Moves</Text>,
            tabBarOnPress: ({navigation, defaultHandler}) => {
             navigation.replace('PreviousMoves')
            
            defaultHandler()
          }, 
        }
      },
      Notifications : {
          screen : Notificationses,
          navigationOptions: {
            tabBarIcon : ({focused, tintColor}) => 
            // context == 0 ? <Icon name="bell" size={wp('6%')} color={tintColor} type='material-community' /> :
            // <BadgedIcon name="bell" size={wp('6%')} color={tintColor} type='material-community' />
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
<IconBadge
MainElement={
<View style={{
margin:10
}}>
<Icon name="bell" size={wp('5%')} color={tintColor} type='material-community' />
</View>
}
BadgeElement={

<Text style={{color:'red',fontSize:8}}>{Badge}</Text>
}
IconBadgeStyle={
{width:15,
height:15,
backgroundColor: Badge == 0 ? 'transparent' : 'yellow',borderRadius:7.5}
}
Hidden={Badge==0}
/>
</View>
            ,
            tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold',
             color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Notification</Text>,
            tabBarOnPress: ({navigation, defaultHandler}) => {
             navigation.navigate('Notifications')
            
            defaultHandler()
          }, 
        }
      },
      Help : {
          screen : Help,
          navigationOptions: {
          tabBarIcon : ({focused, tintColor}) =>  <Icon name="question-circle" size={wp('6%')} color={tintColor} type='font-awesome' />,
          tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 
          'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Help</Text>,
          tabBarOnPress: ({navigation, defaultHandler}) => {
          // navigation.replace('PartInventory')
          
          defaultHandler()
          }, 
        }
      }
  
  
},{

lazy:true,
// tabBarPosition: 'bottom',
tabBarOptions : {

showIcon : true,
showLabel: true,
shifting:false,
style :{borderTopColor:'white', backgroundColor: '#FAFAFA', height: hp('8%')},
inactiveTintColor: '#ABABAB',
activeTintColor: 'black',
activeBackgroundColor: '#FAFAFA',
              
},
headerMode: 'none',
initialRouteName: 'MyQoutes'
})
  
 const MovesControls=  createAppContainer(Appcontainer);

return (
      
    <MovesControls  />
    
  )

}