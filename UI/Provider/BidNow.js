import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, TextInput,ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import MovesLocationAddress from '../../Components/MovesLocationAddress';
import { Icon } from 'react-native-elements';
import BidInfo from '../../Components/BidInfo';
import BorderedTextBox from '../../Components/BorderedTextBox';
// import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import BidMove from '../../Components/BidMove';
import Button from '../../Components/Button';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import Loading_Data from '../../Components/LoadingData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';

const BidNow = (props) => {

const [BidsCount, SetBidsCount] = useState(0)
const MoveId = props.navigation.state.params.move_id
const UserId = LoginData.user_id; 
//props.navigation.state.params.user_id
const MoveTypeTitle = props.navigation.state.params.move_type_title
const MoveDateTime = props.navigation.state.params.move_date_time
const MoveImage = props.navigation.state.params.move_img
const VehicleNumber = props.navigation.state.params.vehicle_number
const [Cost, SetCost] = useState(0)
const [ServiceCost, SetServiceCost] = useState(0)
const [Earn, SetEarn] = useState(0)
const [Comment, SetComment] = useState('')



let GetCost = (costValue)=>
{
    SetCost(costValue)
    SetServiceCost(Number(costValue * 0.2).toFixed(2))
    console.log(ServiceCost)
    SetEarn(Number(costValue - (Number(costValue * 0.2).toFixed(2))).toFixed(2))
}

let DataValidation=()=>{
    // console.log('Move Id ', MoveId)
    // console.log('User Id ', UserId)
    // console.log('Vehicle Number ', VehicleNumber)
    // console.log('Cost ', Cost)
    // console.log('Comment ', Comment)
    if(Cost != 0)
    SetBid()
    else
    Toast.show("Please Fill Cost Price.")
}

let SetBid =()=>{
    
    console.log('Bid methode called')

    var params = {
        user_id: UserId,
  move_id: MoveId,
  amount: Cost,
  description: Comment,
  vehicle_number: VehicleNumber
    }

    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }


    axios.post(APIMaster.URL + APIMaster.Bid.SetBid, params, axiosConfig)
    .then((response)=> {
            
            console.log('response data : ',response.data)  
           
            
           // if(response.data.status == 1)
                {
                  
                    props.navigation.navigate('Home')
                    props.navigation.navigate('ProviderMovesControl')
                  
                }
       
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
    //   props.navigation.replace('ProviderMovesControl')
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })
  }

  return (

    <View style={styles.Container}>

        <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Bid Now'} 
                 LeftIconVisible = {true} RightIconVisible = {false}
                 LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
                 LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
                 LeftIconFunction = {()=>{props.navigation.goBack()}}
                 />

        <ScrollView showsVerticalScrollIndicator = {false}>

        <View style = {{width: '100%', height: hp('17.5%'), backgroundColor: ColorPalet.MainBackground}}>
        
            <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>

                <View style = {{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

                    <Image source = { MoveImage } resizeMode = 'center' style={{width: '95%', height: '95%'}}/>

                </View>

                <View style = {{width: '60%', height: '100%'}}>
                    
                    <BidMove MoveTypeTitle = {MoveTypeTitle} 
                            MoveDateTime = {MoveDateTime} 
                            HasButton = {false} />
                            
                </View>

            </View>

        </View>

        
        <View style = {{width: '100%', height: hp('12%'), marginTop: 10, backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: hp('4%')}}>

                <Text style = {[styles._Text,{width: '100%', height: '100%'}]}>Cost</Text>

            </View>

            <View style = {{width: '100%', height: hp('8%'), flexDirection: 'row'}}>

                <View style = {{width: '60%', height: '100%'}}>

                    <Text style = {[styles._Text2,{}]}>This is the amount the client will see on your proposal</Text>

                </View>
                <View style = {{width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <Text style = {[styles._Text,{fontSize: wp('5%'), color: '#2C2C7E', width: 'auto', marginRight: 10}]}>$</Text>

                    <BorderedTextBox BoxWidth = {'70%'} BoxHeight = {hp('5.5%')}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {''} LocTitleColor = {'#000'} FontSize = {wp('3.5%')}
                            Value = {Cost} IsTextBox = {true}
                            MultiLine = {false} OnChangeFunction = {GetCost} />
                </View>

            </View>

        </View>

        <View style = {{width: '100%', height: hp('12%'), marginTop: 5, backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: hp('4%'), }}>

                <Text style = {[styles._Text,{}]}>PikPak Service fee</Text>

            </View>

            <View style = {{width: '100%', height: hp('8%'), flexDirection: 'row'}}>

                <View style = {{width: '60%', height: '100%'}}>

                    <Text style = {[styles._Text2,{color: ColorPalet.SignUpButton}]}>20% of Bid cost</Text>

                </View>
                <View style = {{width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <Text style = {[styles._Text,{fontSize: wp('5%'), color: '#2C2C7E', width: 'auto', marginRight: 10}]}>$</Text>

                    <BorderedTextBox BoxWidth = {'70%'} BoxHeight = {hp('5.5%')}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {''} LocTitleColor = {'#000'} FontSize = {wp('3.5%')}
                            Value = {ServiceCost} IsTextBox = {false}
                            MultiLine = {false} OnChangeFunction = {SetServiceCost} />

                </View>

            </View>

        </View>

        <View style = {{width: '100%', height: hp('12%'), marginTop: 5, backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: hp('4%')}}>

                <Text style = {[styles._Text,{}]}>You'll Earn</Text>

            </View>

            <View style = {{width: '100%', height: hp('8%'), flexDirection: 'row'}}>

                <View style = {{width: '60%', height: '100%'}}>

                    <Text style = {[styles._Text2,{}]}>This estimate amount you’ll earn after compelet our move</Text>

                </View>
                <View style = {{width: '40%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>

                    <Text style = {[styles._Text,{fontSize: wp('5%'), color: '#2C2C7E', width: 'auto', marginRight: 10}]}>$</Text>

                    <BorderedTextBox BoxWidth = {'70%'} BoxHeight = {hp('5.5%')}
                            BorderColor = {ColorPalet.TextInputBorder} BorderRadius = {5}
                            LocTitle = {''} LocTitleColor = {'#000'} FontSize = {wp('3.5%')}
                            Value = {Earn} IsTextBox = {false}
                            MultiLine = {false} OnChangeFunction = {SetEarn} />

                </View>

            </View>

        </View>

        <View style = {{width: '100%', height: hp('5.5%')}}>

            <Text style = {[styles._Text2,{color: '#767676', paddingLeft: 25}]}>Comments:</Text>

        </View>

        <View style = {{width: wp('90%'), height: hp('15.5%'), marginLeft: wp('5%'), 
                        backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, 
                        borderColor: ColorPalet.TextInputBorder, flexDirection: 'row'}}>

            <View style = {{width: '10%', height: '100%'}}>

                <Icon name = {'message-reply-text'} color= {'#B8BBBD'} type = {"material-community"} size={wp('6%')} style = {{paddingLeft: 5, paddingTop: 7}}/>

            </View>

            <View style = {{width: '90%', height: '100%'}}>

                <TextInput style = {[styles._Text, {width: '100%', height: '100%', paddingHorizontal: 20, 
                                  color: '#000', fontSize: wp('3.5%'), fontWeight: '100', textAlignVertical: 'top'}]} 
                                  placeholder = {'Please Enter'} placeholderTextColor = {'#9B9B9B'}
                                  numberOfLines = {3} multiline = {true}
                                  onChangeText = {(v)=>{SetComment(v)}}/>

            </View>


        </View>

        <View style = {{width: '100%', height: hp('13%'), justifyContent: 'center', alignItems: 'center'}}>
        
            <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                    b_BorderRadius = {15} b_Elevation = {3}
                    t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                    t_ButtonTitle = {'Submit'} t_Elevation = {3} 
                    t_TextColor = {'white'} HasIcon = {false}
                    Function = {()=>{DataValidation()}}/>
        
                    
        </View>

        
        

      
        </ScrollView>

      

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
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3.75%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: 10
  },
  _Text2 : {
    width: 'auto',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3.25%'), 
    fontWeight: '100',
    color: 'black',
    flexWrap: 'wrap',
    paddingLeft: 10
  },
  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 
 export default BidNow;