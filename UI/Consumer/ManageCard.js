import React, { useRef, useState, useEffect } from 'react';
import {View,
  Text,
  Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import PaymentCardItem from '../../Components/PaymentCardItem';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import Loading_Data from '../../Components/LoadingData';
import { LoginData } from '../../Redux/LoginData';


let SelectedCardId = ''
const ManageCard = (props) => {

  // const isFocused = useIsFocused();
  const [Loader_Visible, setLoader_Visible] = useState(false)
  const [CardListEmpty, setCardListEmpty] = useState(false)
  const [DeleteConfirm_Visible, setDeleteConfirm_Visible] = useState(false)
  const [CardsList, setCardsList] = useState([
    // {_id: 1, number: 'Card #1', type: 'xxxx xxxx xxxx xxxx', expire_date: '', default: 0},
    // {_id: 2, number: 'Card #2', type: 'xxxx xxxx xxxx xxxx', expire_date: '', default: 0},
    // {_id: 3, number: 'Card #3', type: 'xxxx xxxx xxxx xxxx', expire_date: '', default: 0},
    // {_id: 4, number: 'Card #4', type: 'xxxx xxxx xxxx xxxx', expire_date: '', default: 0},
    // {_id: 5, number: 'Card #5', type: 'xxxx xxxx xxxx xxxx', expire_date: '', default: 0}
  ])

  
  
  let GetPaymentCardList =()=>{
    setLoader_Visible(true)
    
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }

    axios.get(APIMaster.URL + APIMaster.PaymentCard.PaymentCardList + LoginData.user_id)
    .then((response)=> {
            
            if(response.data.status == 1)
                {
                  setCardListEmpty(false)
                  setCardsList(response.data.payment_cards)

                  setLoader_Visible(false)
                  
                }
                else
                {
                  setCardListEmpty(true)
                }
                setLoader_Visible(false)
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

  let SetCardAsDefault =(_card_id)=>{
    
    var params = {
      user_id : LoginData.user_id,
      id : _card_id
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }


    axios.post(APIMaster.URL + APIMaster.PaymentCard.SetAsDefaultCard, params, axiosConfig)
    .then((response)=> {
            
            // console.log(response)  
            
            // Toast.show(response.data.message)

            // console.log(response.data.status)
            
            // LoginData.Code = code;
            // CheckUserActive();
           
            
            if(response.data.status == 1)
                {
                  GetPaymentCardList()

                  // console.log(CardsList.length)
                  // AsyncStorage.setItem("user_id", response.data.data._id)
                  // AsyncStorage.setItem("username", response.data.data.username)
                  // AsyncStorage.setItem("role", response.data.data.role)
                  // console.log('---------------')
                  
                  // props.navigation.goBack()

                  // setLoader_Visible(false)
                  
                }
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

  let DeletePaymentCard =(_card_id)=>{
    
    console.log('Delete methode called')
    setDeleteConfirm_Visible(false)

    console.log(_card_id)

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }

     console.log(APIMaster.URL + APIMaster.PaymentCard.DeleteCard)
    axios.delete(APIMaster.URL + APIMaster.PaymentCard.DeleteCard + _card_id, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
            
            Toast.show(response.data.message)

            // console.log(response.data.status)
            
            // LoginData.Code = code;
            // CheckUserActive();
           
            
            if(response.data.status == 1)
                {
                  GetPaymentCardList()

                  // console.log(CardsList.length)
                  // AsyncStorage.setItem("user_id", response.data.data._id)
                  // AsyncStorage.setItem("username", response.data.data.username)
                  // AsyncStorage.setItem("role", response.data.data.role)
                  // console.log('---------------')
                  
                  // props.navigation.goBack()

                  // setLoader_Visible(false)
                  
                }
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

  let ConfirmDeleteItem =(_card_id)=>{

    SelectedCardId = _card_id

    setDeleteConfirm_Visible(true)

    console.log(SelectedCardId)
  }
  

  let drawer=useRef(null)
  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }
  
  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  useEffect(()=>{
    GetPaymentCardList()
    },[])
  
    return (
  
  <Drawer ref={ drawer }  type='displace' side='left'  
  content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
  onClose={() => closeDrawer()} > 
  
  

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Manage Card'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {30}
               LeftIconFunction = {()=>{openDrawer()}} />
      {CardListEmpty &&
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      
        <Text style ={styles._Text}>No Card</Text>

      </ImageBackground>
      }

      {!CardListEmpty &&

      <View style={[styles.backgroundImage, {justifyContent: 'center'}]}>
      <FlatList
        data={CardsList}
        renderItem={({item}) => 

        <PaymentCardItem ItemHeight = {hp('8%')} ItemColor = {ColorPalet.MainBackground}
                          ItemTopMargin ={wp('0.5%')} ItemHorMargin = {wp('0.5%')}
                          CardNumberFontSize ={wp('3.5%')} CardNumberTextColor = {'black'}
                          CardNumberLeftMargin = {wp('3%')} CardNumber = {item.number}
                          CardTypeFontSize ={wp('3%')} CardTypeTextColor = {'#9B9B9B'}
                          CardTypeLeftMargin = {wp('3%')} CardType = {item.type}
                          IsDefault = {item.default} SetAsDefaultFunction = {()=>{SetCardAsDefault(item._id)}}
                          DeleteFunction = {()=>{ConfirmDeleteItem(item._id)}}/>
        }
      />

      </View>
      }
      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), backgroundColor: 'transparent'}}>
        
        
        <Button b_Width = {'90%'} b_Height = {'95%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Add a Card'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{ props.navigation.push('AddCard') }}/>

        
        </View>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={Loader_Visible}
          // onBackdropPress={() => setLoader_Visible(false)}
          >

          <Loading_Data />

        </Modal>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={DeleteConfirm_Visible}
          onBackdropPress={() => setDeleteConfirm_Visible(false)}>

          <View style={{width:wp('70%'), height: hp('15%'), backgroundColor: '#FFF'}}>

            <View style={{width:'100%', height: '60%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}>

              <Text style ={styles._Text}>Are you sure to delete this item?</Text>

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
                  Function = {()=>{ DeletePaymentCard(SelectedCardId) }}/>

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
    backgroundColor: ColorPalet.MainBackground
  },
  backgroundImage: {
    height: hp('80%'),
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
 
 export default ManageCard;