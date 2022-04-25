import React, { useRef, useState } from 'react';
import {View,
  Text,
  Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import CanceledMoveItem from '../../Components/CanceledMoveItem';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';


const PreviousMoves = (props) => {

  const [MovesList, setMoveList] = useState([
    // {title: 'Move #1', date: '07/01/2021 02:49 PM'},
    // {title: 'Move #2', date: '07/01/2021 03:52 PM'},
    // {title: 'Move #3', date: '08/01/2021 09:05 AM'},
    // {title: 'Move #4', date: '08/01/2021 11:00 AM'},
    // {title: 'Move #5', date: '09/01/2021 08:20 AM'},
  ])
  
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
      
    <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Previous Moves'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{openDrawer()}} />

      {MovesList.length == 0 &&
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      
        <Text style ={styles._Text}>No Move</Text>

      </ImageBackground>
      }

      {!MovesList.length == 0 &&
      <View style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      <FlatList
        data={MovesList}
        renderItem={({item}) => 

        <CanceledMoveItem ItemHeight = {hp('8%')} ItemColor = {ColorPalet.MainBackground}
                          ItemTopMargin ={wp('0.5%')} ItemHorMargin = {wp('0.5%')}
                          TitleFontSize ={wp('3.2%')} TitleTextColor = {'black'}
                          TitleLeftMargin = {wp('3%')} Title = {item.title}
                          SubTitleFontSize ={wp('2.5%')} SubTitleTextColor = {'#9B9B9B'}
                          SubTitleLeftMargin = {wp('3%')} SubTitle = {item.date}/>
        }
      />

      </View>
      }

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
 
 export default PreviousMoves;