import React, { Component } from "react";
import { StyleSheet, View, Text ,TouchableOpacity,ScrollView} from "react-native";
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import {Icon,Header} from 'react-native-elements';
import MyQoutes from '../Consumer/MyQoutes'
import Help from '../Common/Help'
import OpenBids from './OpenBids';
import Workload from './Workload';
import Notifications from '../Common/Notifications'
import { LoginData } from '../../Redux/LoginData';
import { APIMaster } from '../../API/APIMaster';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconBadge from 'react-native-icon-badge';
import ProviderMoves from './ProviderMoves';
let interval;

export default class ProviderMovesControl extends Component {
  state = {
    index: LoginData.CurrentPage,Badge:'0',
    routes: [
      { key: 'Moves', title: 'Moves',icon:'file-document',type:'material-community' },
      { key: 'OpenBids', title: 'Open Bids',icon:'gavel',type:'materialicon' },
      { key: 'work', title: 'Workload',icon:'work',type:'materialicon' },
      { key: 'Notif', title: 'Notification',icon:'bell',type:'material-community' },
      { key: 'Help', title: 'Help',icon:'question-circle',type:'font-awesome' },
    ],
    Dates: new Date()
  };


  
componentDidMount()
{
  console.log('test page')
this.setState({Dates:new Date()})
  this.GetNoticCount()
   interval = setInterval(() => { 
     
    this.GetNoticCount()
     // setCntr(cntr+1)
    }, 15000);
    
  
}

componentWillUnmount() {
  
clearInterval(interval)
  console.log('setInterval cleared');
}

  GetNoticCount(){            
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
      this.setState({Badge:response.data.badge == undefined ?'0':response.data.badge.toString()})
      console.log('success  : ',response.data.badge) 
      // setctrl(true)

 })
 .catch( (error)=> {
   console.log('notif error  : ',error)  
 })
 }

  _handleIndexChange = index => this.setState({ index:index });

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
   case 'Moves':
    return <ProviderMoves navigation={this.props.navigation}  jumpTo={jumpTo} />;
    case 'OpenBids':
      return <OpenBids navigation={this.props.navigation}  jumpTo={jumpTo} />;
      case 'work':
        return <Workload navigation={this.props.navigation}  jumpTo={jumpTo} />;
        case 'Notif':
          return <Notifications navigation={this.props.navigation}  jumpTo={jumpTo} />;
          case 'Help':
            return <Help navigation={this.props.navigation}  jumpTo={jumpTo} />;
    }
  }

  
 
  render() {
    return (
      
 

<View style={{flex:1}}>

{/* <ScrollView> */}
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        onIndexChange={this._handleIndexChange}
        tabBarPosition='bottom'
        indicatorStyle={{backgroundColor:'transparent'}}
       
        renderTabBar={props => <TabBar {... props} renderIcon={({ route, focused, color }) => (
            // <Text style={{ color: focused ?'#ECA017': 'silver', margin: 8, size: wp('10%')}}>
            //   {route.title}
            // </Text>
            route.key != 'Notif'?
            <Icon name={route.icon} size={wp('6%')} color={focused ?'#ECA017': 'silver'} type={route.type} />
            :      
             <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
            <IconBadge
            MainElement={
            <View style={{
            margin:10
            }}>
            <Icon name="bell" size={wp('5%')} color={focused ?'#ECA017': 'silver'} type='material-community' />
            </View>
            }
            BadgeElement={
            
            <Text style={{color:'red',fontSize:8}}>{this.state.Badge}</Text>
            }
            IconBadgeStyle={
            {width:15,
            height:15,
            backgroundColor: this.state.Badge == 0 ? 'transparent' : 'yellow',borderRadius:7.5}
            }
            Hidden={this.state.Badge==0}
            />
            </View>
          )}
          renderLabel={({ route, focused, color }) => (
            <Text style={{ color: focused ?'#ECA017': 'silver', textAlign:'center', fontSize: 8}}>
              {route.title}
            </Text>
          )}
          indicatorStyle={{ backgroundColor: '#ECA017', height: 5}} style={{backgroundColor: '#FFF'}}/>}
          lazy={false}
      />
    {/* </ScrollView> */}
</View>



     
    );
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
   // backgroundColor: "rgb(255,255,255)"
  },
  materialHeader2: {
    top: -1.01,
    left: "0%",
    height: 56,
    position: "absolute",
    right: 0
  },
  group6: {
    top: 54.99,
    left: 0,
    width: 360,
    height: 500.17,
    position: "absolute"
  },
  group5: {
    width: 360,
    height: 500.17,
    position: "absolute"
  },
  group4: {
    width: 360,
    height: 500.17,
    backgroundColor: "rgba(158,154,154,1)",
    position: "absolute"
  },
  group3: {
    top: 0,
    left: 0,
    width: 360,
    height: 500.17,
    position: "absolute"
  },
  rect: {
    width: 360,
    height: 500.17,
    position: "absolute"
  },
  group: {
    top: 0,
    left: 0,
    width: 360,
    height: 563.32,
    position: "absolute"
  },
  materialBasicTab: {
    top: 0,
    width: 360,
    height: 500,
    position: "absolute"
  },
  rect2: {
    top: 105.94,
    left: 0,
    height: 116.78,
    backgroundColor: "rgba(164,164,164,1)",
    position: "absolute",
    right: 0
  },
  rect3: {
    top: 117.19,
    left: 251.06,
    width: 2.81,
    height: 94.27,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute"
  },
  text: {
    top: 128.44,
    left: 157.77,
    color: "#121212",
    position: "absolute"
  },
  text2: {
    top: 157.32,
    left: 157.77,
    color: "#121212",
    position: "absolute"
  },
  rect4: {
    top: 117.19,
    left: 256.87,
    width: 96.64,
    height: 94.27,
    backgroundColor: "rgba(230, 230, 230,1)",
    position: "absolute"
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',backgroundColor: '#263238'
  },
  animatedView: {
 flex: 1,alignItems: 'center', padding: 16,borderBottomWidth:3
  },
});