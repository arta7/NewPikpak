import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import TextBox from '../../Components/TextBox';
import MaskedTextBox from '../../Components/MaskedTextBox';
import TextBoxButton from '../../Components/TextBoxButton';
import CanceledMoveItem from '../../Components/CanceledMoveItem';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import { Icon } from 'react-native-elements';
import CheckBox from '../../Components/CheckBox';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import UpDownValue from '../../Components/UpDownValue';
import { LoginData } from '../../Redux/LoginData';


const AddCard = (props) => {

  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [CardNumber, setCardNumber] = useState('')
  const [Month, setMonth] = useState('')
  const [_month, set_month] = useState(new Date().getMonth())
  const [_Year, setYear] = useState('')
  const [_year, set_year] = useState(new Date().getFullYear())
  const [CVV, setCVV] = useState('')
  const [AgreeTerms, setAgreeTerms] = useState(false)

  const [YearList_Visible, setYearList_Visible] = useState(false)
  const [MonthList_Visible, setMonthList_Visible] = useState(false)

  const MonthList = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])


  function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }


  let ChangeMonth=(_operator)=>
  {
    if(_operator == '+')
    {
        if(_month == 12)
          set_month(1)
        else
          set_month(_month + 1)
    }
    else
    {
      if(_month == 1)
          set_month(12)
        else
          set_month(_month - 1)
    }
  }

  let ChangeYear=(_operator)=>
  {
    if(_operator == '+')
    {
        if(_year == new Date().getFullYear() + 20)
          set_year(new Date().getFullYear() + 20)
        else
          set_year(_year + 1)
    }
    else
    {
      if(_year == new Date().getFullYear())
        set_year(new Date().getFullYear())
      else
        set_year(_year - 1)
    }
  }

  let DataValidation =()=>{

    // checking filled all items
    if (FirstName == '' || LastName == '' ||
        CardNumber == '' || Month == '' ||
        _Year == '' || Month == '' )
    {
      Toast.show('Please fill all data.')
    }
    else
    {
      // chack email address syntax

      // check pass length and complexity
      if(CardNumber.length < 16)
      {
      Toast.show('Card Number must be more than 16 charachter!')

        setCardNumber('')

      }
      else if(_Year == new Date().getFullYear() && Month < new Date().getMonth())
      {
        Toast.show('Your card has expired!')

        setMonth('')
        setYear('')

      }
      // check password and confirm password
      else if(CVV.length < 3)
      {
        Toast.show('Card Number must be equal 3 charachter!')

        setCVV('')

      }
      else if(AgreeTerms == false)
      {
        Toast.show('You must agree the terms of condition to continue')

      }
      else
      {
        
        AddPaymentCard(LoginData.user_id, FirstName, LastName, CardNumber, padLeadingZeros(Month, 2), _year, CVV)

      }

      // check phone number and zip code

    }
  }

  // "user_id": "string",
  // "number": "string",
  // "first_name": "string",
  // "last_name": "string",
  // "expire_month": "string",
  // "expire_year": "string",
  // "cvv2": "string"

  let AddPaymentCard = async(_user_id, 
                          _first_name, 
                          _last_name, 
                          _number, 
                          _expire_month, 
                          _expire_year, 
                          _cvv2)=>{
    
    
    // setLoader_Visible(true)
    

    var params = {
      user_id : _user_id,
      first_name : _first_name,
      last_name : _last_name,
      number : _number,
      expire_month : _expire_month,
      expire_year : _expire_year,
      cvv2 : _cvv2
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    console.log(params)

    axios.post(APIMaster.URL +
       APIMaster.PaymentCard.AddPaymentCard, params, axiosConfig)
    .then((response)=> {
            
            console.log('data response',response.data)  
            
            Toast.show(response.data.message)
            
            // LoginData.Code = code;
            // CheckUserActive();
           
            
            if(response.data.status == 1)
                {
                  // AsyncStorage.setItem("user_id", response.data.data._id)
                  // AsyncStorage.setItem("username", response.data.data.username)
                  // AsyncStorage.setItem("role", response.data.data.role)
                  console.log('---------------')
                  
                  props.navigation.replace('ManageCard')

                  // setLoader_Visible(false)
                  
                }
              
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      // setLoader_Visible(false)
      //setshowIndicator(false)
     
    })


  }




  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Add Card'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
               LeftIconFunction = {()=>{props.navigation.goBack()}} />

        <View style = {{width: '100%', height: hp('9%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), flexDirection: 'row', backgroundColor: 'transparent'}}>
        
          <View style = {{width: '47.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            <TextBox Title = {'First Name'} Value = {FirstName} 
                  setValue = {setFirstName} notEmpty = {FirstName.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false}/>
          
          </View>
          
          <View style = {{width: '47.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            <TextBox Title = {'Last Name'} Value = {LastName} 
                  setValue = {setLastName} notEmpty = {LastName.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false}/>
          
          </View>

        </View>

        <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), backgroundColor: 'transparent'}}>
            
            {/* <MaskedTextBox Title = {'Card Number'} Value = {CardNumber}  
                  setValue = {setCardNumber} notEmpty = {CardNumber.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false}
                  MaskType = {'custom'} keyboardType = {'numeric'} Mask = {'9999 9999 9999 9999'}
                  MaxLen = {16} /> ControlName = {_cardNumber} */}

            <MaskedTextBox Title = {'Card Number'} Value = {CardNumber} 
                  SetValue = {setCardNumber} notEmpty = {CardNumber.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false} 
                  MaskType = {'custom'} keyboardType = {'numeric'} Mask = {'9999999999999999'}
                  />
          
        </View>

        <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), flexDirection: 'row', backgroundColor: 'transparent'}}>
        
          <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            <TextBoxButton Title = {'Month'} Value = {Month == '' ? '' : padLeadingZeros(Month, 2)} 
                  notEmpty = {Month == '' ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {false}
                  Function = {() => setMonthList_Visible(true)} />
          
          </View>
          
          <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            <TextBoxButton Title = {'Year'} Value = {_Year} 
                  setValue = {setYear} notEmpty = {_Year.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {false} 
                  Function = {() => setYearList_Visible(true)} />
          
          </View>

          <View style = {{width: '30.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            
          
          </View>
        
        </View>

        <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), flexDirection: 'row', backgroundColor: 'transparent'}}>
        
          <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            <TextBox Title = {'CVV'} Value = {CVV} 
                  setValue = {setCVV} notEmpty = {CVV.length == 0 ? false : true}
                  MarginTop = {hp('0%')} IsSecure = {false} keyboardType = {'numeric'}
                  MaxLen = {3} />
          
          </View>
          
          <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            
          
          </View>

          <View style = {{width: '30.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
            
            
          
          </View>

        </View>

        <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('2%'), flexDirection: 'row', backgroundColor: 'transparent'}}>
        
          <View style = {{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>

            <CheckBox IsVisible = {AgreeTerms} Function = {()=>{setAgreeTerms(!AgreeTerms)}} BackgroundColor = {'silver'}/>

          </View>

          <View style = {{width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            
            <Text style = {styles._Text}>By adding your debit / credit card, you agree to the Terms and Condination</Text>

          </View>
        
        </View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('5%'), backgroundColor: 'transparent'}}>
        
        
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Add a Card'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()
                // console.log(CardNumber)
              }}
                />

        
        </View>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={MonthList_Visible}
          onBackdropPress={() => setMonthList_Visible(false)}>

          <View style={{width:wp('80%'), height: hp('35%'),   backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: '80%', borderBottomColor: '#EEEEEE', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {padLeadingZeros(_month, 2)}
                              UpKeyFunction = {()=>{ChangeMonth('+')}}
                              DownKeyFunction = {()=>{ChangeMonth('-')}}/>
                  
              </View>

              

            </View>

            <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setMonthList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

              </TouchableOpacity>

              <TouchableOpacity style = {{width: '50%', height: '100%', borderLeftColor: '#EEEEEE', borderLeftWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setMonth(_month)
                                  setMonthList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>OK</Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={YearList_Visible}
          onBackdropPress={() => setYearList_Visible(false)}>

          <View style={{width:wp('80%'), height: hp('35%'),   backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: '80%', borderBottomColor: '#EEEEEE', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {_year}
                              UpKeyFunction = {()=>{ChangeYear('+')}}
                              DownKeyFunction = {()=>{ChangeYear('-')}}/>
                  
              </View>

              

            </View>

            <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setYearList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

              </TouchableOpacity>

              <TouchableOpacity style = {{width: '50%', height: '100%', borderLeftColor: '#EEEEEE', borderLeftWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setYear(_year)
                                                setYearList_Visible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>OK</Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>


    </View>  
   
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
    textAlign: 'left',
    fontSize : wp('3%'), 
    fontWeight: '200', 
    color: 'black',
    paddingRight: 30
  }

  });
 
 export default AddCard;