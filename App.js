
import React,{useEffect, useState,useContext} from 'react';
import {TabNavigator, TabBarBottom, createBottomTabNavigator
  ,createAppContainer,createStackNavigator,StackActions ,NavigationActions, createDrawerNavigator } 
from 'react-navigation';
import {Icon, Tile,Badge,withBadge } from 'react-native-elements';
import { I18nManager,View ,Image,Text,StyleSheet, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Font, Size, ColorPalet, CurrentUser} from './Header/Header';
import IconBadge from 'react-native-icon-badge';
import SignUpIn from './UI/Common/SignUpIn';
import SignUp from './UI/Common/SignUp';
import Login from './UI/Common/Login';
import ForgotPassword from './UI/Common/ForgotPassword';
import Home from './UI/Common/Home';
import Splash from './UI/Common/Splash';
import SelectLocation from './UI/Common/SelectLocation';
import MyQoutes from './UI/Consumer/MyQoutes';
import CreateMove_Location from './UI/Consumer/CreateMove_Location';
import CreateMove2 from './UI/Consumer/CreateMove2';
import CreateMove_Details from './UI/Consumer/CreateMove_Details';
import CreateMove_DateTime from './UI/Consumer/CreateMove_DateTime';
import CreateMove_Image from './UI/Consumer/CreateMove_Image';
import QoutesDetails from './UI/Consumer/QoutesDetails';
import CanceledMove from './UI/Common/CanceledMove';
import Profile from './UI/Common/Profile';
import ManageCard from './UI/Consumer/ManageCard';
import AddCard from './UI/Consumer/AddCard';
import PaymentDetails from './UI/Consumer/PaymentDetails';
import NotificationSetting from './UI/Common/NotificationSetting';
import ChangePassword from './UI/Common/ChangePassword';
import ActiveMove from './UI/Consumer/ActiveMove';
import PreviousMoves from './UI/Consumer/PreviousMoves';
import Notifications from './UI/Common/Notifications';
import Help from './UI/Common/Help';
import QoutesControl from './UI/Consumer/QoutesControl';
import ActiveMoveControl from './UI/Consumer/ActiveMoveControl';
import ProfessionalDetails from './UI/Provider/ProfessionalDetails';
import VehicleProperties from './UI/Provider/VehicleProperties';
import DriverDocument from './UI/Provider/DriverDocument';
import ProfessionalDetailsView from './UI/Provider/ProfessionalDetailsView';
import VehicleDetails from './UI/Provider/VehicleDetails';
import ProviderMoves from './UI/Provider/ProviderMoves';
import BidNow from './UI/Provider/BidNow';
import OpenBids from './UI/Provider/OpenBids';
import Workload from './UI/Provider/Workload';
import EarningDetails from './UI/Provider/EarningDetails';
import ProviderMoveDetails from './UI/Provider/ProviderMoveDetails';
import DriverMovesControl from './UI/Provider/DriverMovesControl';
import MovesControl from './UI/Consumer/MovesControl';
import MovesControls from './UI/Consumer/MovesControls';
import MerchantDetail from './UI/Provider/MerchantDetail';
import ActiveAccount from './UI/Common/ActiveAccount'
import PaymentPage from './UI/Consumer/PaymentPage'
import { LoginData } from './Redux/LoginData';
import axios from 'axios';
import { APIMaster } from './API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import {Redux} from './Redux/Data'
import realm from './UI/Common/realm'
import ProviderMovesControl from './UI/Provider/ProviderMovesControl'

export default function App ()  {
  // const value = useContext(Redux);
  // const [context, setContext] = useContext(Redux);
  const [NoticCount, setNoticCount] = useState('0');
  const [ctrl, setctrl] = useState(0);
 
  let interval

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
        if(response.data.status == 1)
        {
        // value.Counter.setCount(response.data.badge)
        console.log('response.data.badge', LoginData.user_id,response.data.badge)
        
        }
        // setctrl(true)

   })
   .catch( (error)=> {
     console.log('notif error  : ',error)  
   })
   }

      let GetUser = async()=>{
        var UserIds =  await AsyncStorage.getItem("user_id")


         console.log('UserId',UserIds)
        if(UserIds != null && UserIds != '')
        {
          LoginData.user_id = UserIds
        }
       
      }

      let listener=()=>{
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
            if(response.data.status == 1)
            {
              // value.Counter.setCount(response.data.badge)
            console.log('response.data.badge', LoginData.user_id,response.data.badge)
            
            }
    
       })
       .catch( (error)=> {
         console.log('notif error  : ',error)  
       })
      }
      

          useEffect(()=>{
            // GetUser()
            //   interval =  setInterval(() => { 
            //   GetNoticCount() 
            //   console.log('test notif ',value.Counter.Count)
            //   // setctrl(ctrl+1)
            // }, 5000);
            
            //  return(()=>{
            //   clearInterval(interval)
             
            // })
            const pr = realm.objects('Counting')
            // console.log('pr',pr)
            if(pr.length >0)
            {
              setNoticCount(pr[0]['Counter'].toString())
            }
            


          },[])


  // const BadgedIcon = withBadge(NoticCount)(Icon);




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


// var ProviderMoveses = createStackNavigator({ 

//   ProviderMoves: { screen: ProviderMoves },  
// },{
//   headerMode: 'none'
//   }
//   )

var OpenBidses = createStackNavigator({ 

  OpenBids: { screen: OpenBids },  
},{
  headerMode: 'none'
  }
  )

var Workloades = createStackNavigator({ 

  Workload: { screen: Workload },  
},{
  headerMode: 'none'
  }
  )

// var MovesControls = createStackNavigator({ 

//   MovesControl: { screen: MovesControl },  
// },{
//   headerMode: 'none'
//   }
//   )



var AppNavigator = createStackNavigator({ 
    
  SignUpIn:{ screen:SignUpIn },

  SignUp: { screen: SignUp },

  Login: { screen: Login },   

  ForgotPassword: { screen: ForgotPassword }, 

  Home: { screen: Home },    

  ActiveAccount: { screen: ActiveAccount },  

  CreateMove_Location: { screen: CreateMove_Location }, 

  CreateMove2: { screen: CreateMove2 }, 

  CreateMove_Details: { screen: CreateMove_Details },

  CreateMove_DateTime: { screen: CreateMove_DateTime },

  CreateMove_Image: { screen: CreateMove_Image },

  ProfessionalDetails: { screen: ProfessionalDetails },

  CanceledMove: { screen: CanceledMove },

  Profile: { screen: Profile },

  ManageCard: { screen: ManageCard },

  AddCard: { screen: AddCard },

  PaymentDetails: { screen: PaymentDetails },

  NotificationSetting: { screen: NotificationSetting },

  ChangePassword: { screen: ChangePassword },

  QoutesControl: { screen: QoutesControl },

  ActiveMoveControl: { screen: ActiveMoveControl },

  DriverMovesControl: { screen: DriverMovesControl },

  VehicleProperties: { screen: VehicleProperties },

  DriverDocument: { screen: DriverDocument },

  ProfessionalDetailsView: { screen: ProfessionalDetailsView },

  VehicleDetails: { screen: VehicleDetails },

  SelectLocation: { screen: SelectLocation },

  BidNow: { screen: BidNow },

  // OpenBids: { screen: OpenBids},

  Splash: { screen: Splash},

  EarningDetails: { screen: EarningDetails },

  ProviderMoveDetails: { screen: ProviderMoveDetails },

  MerchantDetail: { screen: MerchantDetail },
  PaymentPage:{
    screen:PaymentPage
  },
  // MovesControl:{screen: MovesControl},
  MovesControl:{screen:MovesControls}
  // SectionInventory: {
  //   screen: SectionInventory
  // },
  
//   MovesControl:MovesControl = createBottomTabNavigator ({
  
            
    
//                   MyQoutes : {
//                     screen: MyQouteses ,
              
//                     navigationOptions: {
//                       tabBarIcon : ({focused, tintColor}) =>  <Icon name="file-document-edit" size={wp('6%')} color={tintColor} type='material-community' />,
//                       tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>My Quotes</Text>,
//                       tabBarOnPress: ({navigation, defaultHandler}) => {
//                        navigation.replace('MyQoutes')
                      
//                       defaultHandler()
//                       },
//                     }
//                   },
//                   ActiveMove : {
//                       screen : ActiveMoves,
//                       navigationOptions: {
//                         tabBarIcon : ({focused, tintColor}) =>  <Icon name="text-box-check" size={wp('6%')} color={tintColor} type='material-community' />,
//                         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Active Moves</Text>,
//                         tabBarOnPress: ({navigation, defaultHandler}) => {
//                          navigation.replace('ActiveMove')
                        
//                         defaultHandler()
//                       }, 
//                     }
//                   },
//                   PreviousMoves : {
//                       screen : PreviousMoveses,
//                       navigationOptions: {
//                         tabBarIcon : ({focused, tintColor}) =>  <Icon name="text-box-search" size={wp('6%')} color={tintColor} type='material-community' />,
//                         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Previous Moves</Text>,
//                         tabBarOnPress: ({navigation, defaultHandler}) => {
//                          navigation.replace('PreviousMoves')
                        
//                         defaultHandler()
//                       }, 
//                     }
//                   },
//                   Notifications : {
//                       screen : Notificationses,
//                       navigationOptions: {
//                         tabBarIcon : ({focused, tintColor}) => 
//                         // context == 0 ? <Icon name="bell" size={wp('6%')} color={tintColor} type='material-community' /> :
//                         // <BadgedIcon name="bell" size={wp('6%')} color={tintColor} type='material-community' />
//                         <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
//   <IconBadge
//     MainElement={
//       <View style={{
//         margin:10
//       }}>
//       <Icon name="bell" size={wp('5%')} color={tintColor} type='material-community' />
//       </View>
//     }
//     BadgeElement={
     
//       <Text style={{color:'red',fontSize:8}}>{NoticCount}</Text>
//     }
//     IconBadgeStyle={
//       {width:15,
//       height:15,
//       backgroundColor: NoticCount == 0 ? 'transparent' : 'yellow',borderRadius:7.5}
//     }
//     Hidden={NoticCount==0}
//     />
// </View>
//                         ,
//                         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Notification</Text>,
//                         tabBarOnPress: ({navigation, defaultHandler}) => {
//                          navigation.navigate('Notifications')
                        
//                         defaultHandler()
//                       }, 
//                     }
//                   },
//                   Help : {
//                       screen : Help,
//                       navigationOptions: {
//                       tabBarIcon : ({focused, tintColor}) =>  <Icon name="question-circle" size={wp('6%')} color={tintColor} type='font-awesome' />,
//                       tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Help</Text>,
//                       tabBarOnPress: ({navigation, defaultHandler}) => {
//                       // navigation.replace('PartInventory')
                      
//                       defaultHandler()
//                       }, 
//                     }
//                   }

//                   // Home:{
//                   //   screen: Home,
//                   //   navigationOptions:{
//                   //     tabBarIcon: ({ focused, tintcolor }) => (
//                   //       <Icon name="ios-home" size={24}  />
//                   //     )
//                   //   }
//                   // },
              
              
//     },{
        
//       lazy:true,
//       // tabBarPosition: 'bottom',
//       tabBarOptions : {
//           showIcon : true,
//           showLabel: true,
//           shifting:false,
//           style :{borderTopColor:'white', backgroundColor: '#FAFAFA', height: hp('8%')},
//           inactiveTintColor: '#ABABAB',
//           activeTintColor: 'black',
//           activeBackgroundColor: '#FAFAFA',

//           // labelStyle: {
//           //     fontSize: 18,
//           //     paddingBottom: 3,paddingLeft:50,
              
//           // },               
//       },
//       headerMode: 'none',
//       initialRouteName: 'MyQoutes'
//   })
  ,



ProviderMovesControl:{screen:ProviderMovesControl} ,
// createBottomTabNavigator ({
  
            
    
//   ProviderMoves : {
//     screen: ProviderMoveses ,
//     navigationOptions: {
//       tabBarIcon : ({focused, tintColor}) =>  <Icon name="file-document" size={wp('6%')} color={tintColor} type='material-community' />,
//       tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10,
//        fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Moves</Text>,
//       tabBarOnPress: ({navigation, defaultHandler}) => {
//        navigation.replace('ProviderMoves')
      
//       defaultHandler()
//       },
//     }
//   },
//   OpenBids : {
//       screen : OpenBidses,
//       navigationOptions: {
//         tabBarIcon : ({focused, tintColor}) =>  <Icon name="gavel" size={wp('6%')} color={tintColor} type='materialicon' />,
//         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 
//         'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Open Bids</Text>,
//         tabBarOnPress: ({navigation, defaultHandler}) => {
//        navigation.replace('OpenBids')
        
//         defaultHandler()
//       }, 
//     }
//   },
//   Workload : {
//       screen : Workloades,
//       navigationOptions: {
//         tabBarIcon : ({focused, tintColor}) =>  <Icon name="work" size={wp('6%')} color={tintColor} type='materialicon' />,
//         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, 
//         fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Workload</Text>,
//         tabBarOnPress: ({navigation, defaultHandler}) => {
//         navigation.replace('Workload')
        
//         defaultHandler()
//       }, 
//     }
//   },
//   Notifications : {
//       screen : Notificationses,
//       navigationOptions: {
//         tabBarIcon : ({focused, tintColor}) => 
//         //  context == 0 ? <Icon name="bell" size={wp('6%')} color={tintColor} type='material-community' /> :
//         // <BadgedIcon name="bell" size={wp('6%')} color={tintColor} type='material-community' />
//         <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
//         <IconBadge
//           MainElement={
//             <View style={{
//               margin:10
//             }}>
//             <Icon name="bell" size={wp('5%')} color={tintColor} type='material-community' />
//             </View>
//           }
//           BadgeElement={
           
//             <Text style={{color:'red',fontSize:8}}>{NoticCount}</Text>
           
//           }
//           IconBadgeStyle={
//             {width:15,
//             height:15,
//             backgroundColor: NoticCount == 0 ? 'transparent' : 'yellow',borderRadius:7.5}
//           }
//           Hidden={NoticCount==0}
//           />
//       </View>
//         ,
//         tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Notification</Text>,
//         tabBarOnPress: ({navigation, defaultHandler}) => {
//         navigation.replace('Notifications')
        
//         defaultHandler()
//       }, 
//     }
//   },
//   Help : {
//       screen : Help,
//       navigationOptions: {
//       tabBarIcon : ({focused, tintColor}) =>  <Icon name="question-circle" size={wp('6%')} color={tintColor} type='font-awesome' />,
//       tabBarLabel :({tintColor, focus})=><Text style={{fontSize: wp('2.25%'), marginBottom: 10, fontWeight: 'bold', color: tintColor, width: '100%', height: '30%', textAlign: 'center', textAlignVertical: 'center'}}>Help</Text>,
//       tabBarOnPress: ({navigation, defaultHandler}) => {
//       // navigation.replace('PartInventory')
      
//       defaultHandler()
//       }, 
//     }
//   }

//   // Home:{
//   //   screen: Home,
//   //   navigationOptions:{
//   //     tabBarIcon: ({ focused, tintcolor }) => (
//   //       <Icon name="ios-home" size={24}  />
//   //     )
//   //   }
//   // },


// }
}
// ,{

// lazy:true,
// // tabBarPosition: 'bottom',
// tabBarOptions : {
// showIcon : true,
// showLabel: true,
// shifting:false,
// style :{borderTopColor:'white', backgroundColor: '#FAFAFA', height: hp('8%')},
// inactiveTintColor: '#ABABAB',
// activeTintColor: 'black',
// activeBackgroundColor: '#FAFAFA',

// // labelStyle: {
// //     fontSize: 18,
// //     paddingBottom: 3,paddingLeft:50,

// // },               
// },
// headerMode: 'none',
// initialRouteName: 'ProviderMoves'

// })
// }
,
    
    
 {
    headerMode: 'none',
    headerVisible: 'false',
    // initialRouteName: 'ChangePincode'
    initialRouteName: 'Splash'
  }
 
 )


const AppContainer= createAppContainer(AppNavigator);

    return (
      
     
      <AppContainer   />
      // :
      // <ActivityIndicator size='large' color='red' style={{justifyContent:'center',alignItems:'center',alignItems:'center'}} />
      
      
    )
  }



