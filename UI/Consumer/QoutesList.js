import React, { useEffect, useState } from 'react';
import {View,
  Text,
  Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './Header/Header';
import RadioButton from './Components/RadioButton';
import Qoutes from './../Components/Qoutes';
import Button from './../Components/Button';
import Headers from './../Components/Headers'



const QoutesList = (props) => {

  const [CardsList, setCardsList] = useState([
    // {title: 'Qoute #1', date: '07/01/2021 02:49 PM'},
    // {title: 'Qoute #2', date: '07/01/2021 03:52 PM'},
    // {title: 'Qoute #3', date: '08/01/2021 09:05 AM'},
    // {title: 'Qoute #4', date: '08/01/2021 11:00 AM'},
    // {title: 'Qoute #5', date: '09/01/2021 08:20 AM'},
  ])
  

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'My Quotes'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {30}
               RightIconName = {'edit'} RightIconColor = {'#FFF'} 
               RightIconType = {'materialicon'} RightIconSize = {30}
               RightIconFunction = {()=>{SetEditEnable(!EditEnable)}} />

      <View style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), marginBottom:hp('2%'), backgroundColor: 'transparent'}}>
        
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Request a Quotes'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                />

        
        </View>

      
      {CardsList.length == 0 &&
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      
        <Text style ={styles._Text}>No Quotes</Text>

      </ImageBackground>
      }

      {!CardsList.length == 0 &&

      <View style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      <FlatList
        data={CardsList}
        renderItem={({item}) => 

        <Qoutes ItemHeight = {hp('8%')} ItemColor = {ColorPalet.MainBackground}
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
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.MainBackground
  },
  backgroundImage: {
    height: hp('90%'),
    backgroundColor: '#ABABAB',
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
 
 export default QoutesList;