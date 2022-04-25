import React, { useRef, useState, useEffect } from 'react';
import {View,
  Text,
  Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import TextBox from '../../Components/TextBox';
import Button from '../../Components/Button';
import Headers from '../../Components/Headers'
import {Drawer} from 'native-base';
import Sidebar from '../Common/Sidebar';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';

const MerchantDetail = (props) => {

  const _accountHolderName = useRef(null)
  const _bankName = useRef(null)
  const _accountNunber = useRef(null)
  const _routingNumber = useRef(null)

  const [EditEnable, setEditEnable] = useState(false)
  const [IsFirst, setIsFirst] = useState(false)
  const [DeleteConfirm_Visible, setDeleteConfirm_Visible] = useState(false)

  const [BankAccountList, setBankAccountList] = useState([])

  const [BankAccount_Id, setBankAccount_Id] = useState('')
  const [AccountHolderName, setAccountHolderName] = useState('')
  const [BankName, setBankName] = useState('')
  const [AccountNumber, setAccountNumber] = useState('')
  const [RoutingNumber, setRoutingNumber] = useState('')
  const [Loader_Visible, setLoader_Visible] = useState(false)


  let GetMerchantDetail = async()=>{
    console.log('=== ', LoginData.user_id)
    setLoader_Visible(true)
    var params = {
      user_id : LoginData.user_id
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.post(APIMaster.URL +
      APIMaster.BankAccount.GetBankAccount, params)
   .then((response)=> {
           
          console.log('response data1 : ', response.data.status) 
         // console.log('response data : ',response.data.data[0]) 
           
          if(response.data.status == 0) 
          {
            setIsFirst(true)
            setEditEnable(true)
            setLoader_Visible(false)
            _accountHolderName.current.focus()
          }
          else
          {
            // setBankAccountList(response.data.data[0])

            // console.log('b.acc', response.data.data[0].id)
            setBankAccount_Id(response.data.data[0].id)
            setAccountHolderName(response.data.data[0].account_holder_name)
            setBankName(response.data.data[0].bank_name)
            setAccountNumber(response.data.data[0].account_number)
            setRoutingNumber(response.data.data[0].branch_address)

            setLoader_Visible(false)
          }
          //  LoginData.user_id = response.data.data._id;
          //  LoginData.username = response.data.data.username;
          //  LoginData.role = response.data.data.role;
           // LoginData.Code = code;
           // CheckUserActive();
          //  console.log(LoginData.user_id)
           console.log('************')
          //  console.log(response.data.data._id)

          //  if(response.data.data)
          //      {
          //        AsyncStorage.setItem("Token",LoginData.user_id)
          //        AsyncStorage.setItem("Username",LoginData.username)
          //        AsyncStorage.setItem("Role",LoginData.role)
          //        console.log('---------------')
          //        console.log(LoginData.role)
                
          //        props.navigation.replace('Home')

          //        setLoader_Visible(false)
          //      }
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
     //setshowIndicator(false)
    
   })
  }
 
  let SetMerchantDetail = async(_user_id,
                                _account_holder_name,
                                _bank_name,
                                _account_number,
                                _ifsc_code,
                                _branch_address)=>{
    console.log('=== ', LoginData.user_id)
    setLoader_Visible(true)
    var params = {
                  user_id : LoginData.user_id,
                  account_holder_name: _account_holder_name,
                  bank_name: _bank_name,
                  account_number: _account_number,
                  ifsc_code: _ifsc_code,
                  branch_address: _branch_address
                  }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.post(APIMaster.URL +
      APIMaster.BankAccount.SetBankAccount, params)
   .then((response)=> {
           
          console.log(response.data)  
          Toast.show(response.data.message)

           console.log('************')
           setLoader_Visible(false)
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
     setLoader_Visible(false)
    
   })
  }

  let EditMerchantDetail = async(_bank_account_id,
          _user_id,
          _account_holder_name,
          _bank_name,
          _account_number,
          _ifsc_code,
          _branch_address)=>{
      console.log('=== ', LoginData.user_id)
      setLoader_Visible(true)
      var params = {
        id : _bank_account_id,
        user_id : LoginData.user_id,
        account_holder_name: _account_holder_name,
        bank_name: _bank_name,
        account_number: _account_number,
        ifsc_code: _ifsc_code,
        branch_address: _branch_address
        }
      var axiosConfig = {
      headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
      }
      }
      axios.post(APIMaster.URL +
      APIMaster.BankAccount.EditBankAccount, params)
      .then((response)=> {

      console.log(response.data)  
      Toast.show(response.data.message)
      if(response.data.status == 1) 
      {
        setEditEnable(false)
        setLoader_Visible(false)
        //BlurControls()
      }
      else
      {
        setLoader_Visible(false)
      }
      //  LoginData.user_id = response.data.data._id;
      //  LoginData.username = response.data.data.username;
      //  LoginData.role = response.data.data.role;
      // LoginData.Code = code;
      // CheckUserActive();
      //  console.log(LoginData.user_id)
      console.log('************')
      //  console.log(response.data.data._id)

      //  if(response.data.data)
      //      {
      //        AsyncStorage.setItem("Token",LoginData.user_id)
      //        AsyncStorage.setItem("Username",LoginData.username)
      //        AsyncStorage.setItem("Role",LoginData.role)
      //        console.log('---------------')
      //        console.log(LoginData.role)

      //        props.navigation.replace('Home')

      setLoader_Visible(false)
      //      }
      })
      .catch( (error)=> {
      console.log('Error : ',error)  
      setLoader_Visible(false)
      //setshowIndicator(false)

    })
  }

  let DeleteMerchantDetail = async(_user_id,
                                   _bank_account_id)=>{
              console.log('=== ', LoginData.user_id)
              setDeleteConfirm_Visible(false)
              console.log('+++ ', _bank_account_id)
              setLoader_Visible(true)
              var params = {
              user_id : _user_id,
              id : _bank_account_id
              }
              var axiosConfig = {
              headers:{
              Accept : 'application/json',
              Content_Type : 'application/json'
              }
              }
              axios.post(APIMaster.URL +
              APIMaster.BankAccount.DeleteBankAccount, params)
              .then((response)=> {

              console.log(response.data)  
              Toast.show(response.data.message)
              // if(response.data.status == 0) 
              // {
              //   setIsFirst(false)
              //   setEditEnable(true)
              //   setLoader_Visible(false)
              //   _accountHolderName.current.focus()
              // }
              // else
              // {
              //   setLoader_Visible(false)
              // }
              //  LoginData.user_id = response.data.data._id;
              //  LoginData.username = response.data.data.username;
              //  LoginData.role = response.data.data.role;
              // LoginData.Code = code;
              // CheckUserActive();
              //  console.log(LoginData.user_id)
              console.log('************')
              //  console.log(response.data.data._id)

              //  if(response.data.data)
              //      {
              //        AsyncStorage.setItem("Token",LoginData.user_id)
              //        AsyncStorage.setItem("Username",LoginData.username)
              //        AsyncStorage.setItem("Role",LoginData.role)
              //        console.log('---------------')
              //        console.log(LoginData.role)

              //        props.navigation.replace('Home')

              setLoader_Visible(false)
              
              //      }
              })
              .catch( (error)=> {
              console.log('Error : ',error)  
              setLoader_Visible(false)
              //setshowIndicator(false)

    })
  }

  let ConfirmDelete =()=>{

   

    setDeleteConfirm_Visible(true)


  }

  let SetEditEbable=(_state)=>
  {
    if(_state)
    {
      setEditEnable(_state)

      if(!_state)
      {
        //BlurControls()
      }
    }
    else
    {
      setDeleteConfirm_Visible(true)
    }
  }

  let BlurControls=()=>{
      _accountHolderName.current.blur()
      _bankName.current.blur()
      _accountNunber.current.blur()
      _routingNumber.current.blur()
  }

  let ValidationData=()=>{

    if(AccountHolderName == '' ||
       BankName == '' ||
       AccountNumber == '' ||
       RoutingNumber == '')
       {
         Toast.show('All items must be fill!')
       }
       else
       {
         if(IsFirst)
         {
           console.log('first')
            SetMerchantDetail(LoginData.user_id,
                              AccountHolderName,
                              BankName,
                              AccountNumber,
                              0,
                              RoutingNumber)
             
         }
         else
         {
            EditMerchantDetail(BankAccount_Id,
                                LoginData.user_id,
                                AccountHolderName,
                                BankName,
                                AccountNumber,
                                0,
                                RoutingNumber)
         }
         props.navigation.replace('ProviderMovesControl')
       }
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
    GetMerchantDetail()
    },[])
  
    return (
  
  <Drawer ref={ drawer }  type='displace' side='left' 
  content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
  onClose={() => closeDrawer()} > 
  
  

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Merchant Detail'} 
               LeftIconVisible = {true} RightIconVisible = {!EditEnable}
               LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
               LeftIconType = {'material-community'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{openDrawer()}}
               RightIconName = {'edit'} RightIconColor = {'#FFF'} 
               RightIconType = {''} RightIconSize = {wp('6%')}
               RightIconFunction = {()=>{SetEditEbable(!EditEnable)}} />



      {/* <View style = {{width: wp('100%'), height: hp('93.5%'), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent'}}> */}

      {/* <View style = {{width: wp('100%'), height: hp('30%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Image source = { require("./../../Image/person.png") } resizeMode = 'center' style={styles.logoImage}/>

      </View> */}

      <View style = {{width: wp('100%'), height: hp('35%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Account Holder Name'} Value = {AccountHolderName} 
                setValue = {setAccountHolderName} notEmpty = {AccountHolderName.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {EditEnable}
                TextColor = {'black'} ControlName = {_accountHolderName}/>
        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Bank Name'} Value = {BankName} 
                setValue = {setBankName} notEmpty = {BankName.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {EditEnable}
                TextColor = {'black'} ControlName = {_bankName}/>

        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Account Number'} Value = {AccountNumber} 
                setValue = {setAccountNumber} notEmpty = {AccountNumber.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {EditEnable}
                TextColor = {'black'} ControlName = {_accountNunber}/>

        </View>

        <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
          
          <TextBox Title = {'Routing Number'} Value = {RoutingNumber} 
                setValue = {setRoutingNumber} notEmpty = {RoutingNumber.length == 0 ? false : true}
                MarginTop = {hp('0%')} IsSecure = {false} EditEnable = {EditEnable}
                TextColor = {'black'} ControlName = {_routingNumber}/>
        </View>

      </View>

      <View style = {{width: wp('100%'), height: hp('45%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}></View>

      <View style = {{width: '100%', height: hp('7%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        {EditEnable &&
        <Button b_Width = {'90%'} b_Height = {'100%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{ValidationData()}}/>

        }
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
                  Function = {()=>{ DeleteMerchantDetail(LoginData.user_id, BankAccount_Id) }}/>

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
    flex : 1,
    justifyContent : "center",
    opacity : 80
  },
  logoImage: {
    width : '80%',
    height : '80%',
    justifyContent : "center",
    opacity : 80
  },
  _Text : {
    fontSize : wp('3.2%'), 
    fontWeight: '200', 
    color: '#908E8E',
    elevation: 5
  }

  });
 
 export default MerchantDetail;