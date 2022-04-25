import React, { Component } from "react";
import { StyleSheet, View, Text ,TouchableOpacity,ScrollView} from "react-native";
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import {Icon,Header} from 'react-native-elements';
import WorkloadDetails from './WorkloadDetails';
import Messages from '../Common/Messages';
import Headers from '../../Components/Headers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default class DriverMovesControl extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'Details', title: 'DETAILES' },
      { key: 'Messages', title: 'MESSAGES' }
    ],
  };



  _handleIndexChange = index => this.setState({ index:index });

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
   case 'Details':
    return <WorkloadDetails navigation={this.props.navigation}  jumpTo={jumpTo} />;
      case 'Messages':
        return <Messages  navigation={this.props.navigation}  jumpTo={jumpTo} />
    }
  }
 
  render() {
    return (
      
 

<View style={{flex:1}}>
<Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Moves'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{this.props.navigation.goBack()}}
                />

{/* <ScrollView> */}
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        onIndexChange={this._handleIndexChange}
        renderTabBar={props => <TabBar {... props} renderLabel={({ route, focused, color }) => (
            <Text style={{ color: focused ?'#ECA017': 'silver', margin: 8, size: wp('10%')}}>
              {route.title}
            </Text>
          )} indicatorStyle={{ backgroundColor: '#ECA017', height: 5}} style={{backgroundColor: '#FFF'}}/>}
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