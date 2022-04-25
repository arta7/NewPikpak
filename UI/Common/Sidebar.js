import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import { Icon } from 'react-native-elements';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { ColorPalet, AppSetting } from '../../Header/Header';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import SidebarItem from '../../Components/SidebarItem';
import Button from '../../Components/Button';
import { LoginData } from '../../Redux/LoginData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';



const App = (props) => {

  const [PerfessionalDetailNotApproved_Visible, setPerfessionalDetailNotApproved_Visible] = useState(false)
  const  [fileUri, setFileUri] = useState()

  // const [UserType, setUserType] = useState(false)
  let isDriver = AppSetting.IsDriver

  useEffect(()=>{
    GetUserProfile()
  }, [])



    

  let GetUserProfile = async()=>{


    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.User.GetUserProfile + LoginData.user_id, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           
           console.log('************')
     

           if(response.status == 200)
           {

              console.log("https://webapp.pikpakapp.com/storage/app/" + response.data.pic)
              setFileUri("https://webapp.pikpakapp.com/storage/app/" + response.data.pic)  
           }
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
   })
  }

  let UserLogout = async()=>{
    

    var params = {
      user_id: LoginData.user_id
    }
    
    console.log(params)

    axios.post(APIMaster.URL +
       APIMaster.Auth.Logout, params)
    .then((response)=> {
            
            console.log(response)  
            

            LoginData.user_id = '';
            LoginData.username = '';
            LoginData.role = '';


            if(response.data.status == 1)
                {
                  AsyncStorage.setItem("user_id", '')
                  AsyncStorage.setItem("username", '')
                  AsyncStorage.setItem("role", '')
                  console.log('Logout Successfully...')
                
                  
                }
    })
    .catch( (error)=> {
      console.log('Error : ',error)  
     
    })
    LoginData.user_id = '';
    LoginData.username = '';
    LoginData.role = '';
    props.closeItem()
    // props.navigator.navigate('Home')
    // console.log('test logout')
    props.navigator.navigate('SignUpIn')
    console.log('test logout 2')
  }

  let GetPerfessionalDetail = async()=>{
    var params = {
      user_id : LoginData.user_id
    }
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
    axios.get(APIMaster.URL +
      APIMaster.ProfessionalDetail.GetProfessionalDetail + LoginData.user_id, axiosConfig)
   .then((response)=> {
           
           console.log(response)  
           
           console.log('************')
     

           if(response.data.status == 0)
           {
            props.navigator.navigate('ProfessionalDetails')
              // setPerfessionalDetailNotApproved_Visible(true)
           }
           else if(response.data.status == 2)
           {
              // props.navigation.replace('Home')
              setPerfessionalDetailNotApproved_Visible(true)
           }
           else
           {
             // Fetch Data and goto screen
             props.navigator.navigate('ProfessionalDetailsView')
           }
          
   })
   .catch( (error)=> {
     console.log('Error : ',error)  
   
   })
  }
 
  return (
    <View style={styles.SidbarStyle}>
        <ScrollView>
      <View style={{width: '100%', height: hp('25%'), backgroundColor: '#FFF', elevation: 2, justifyContent: 'center', alignItems: 'center'}}>

        <View style = {{width: hp('15%'), height: hp('15%'), overflow: 'hidden', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>

          {/* <Image source = { require("./../../Image/person.png") } resizeMode = 'center' style={styles.logoImage}/> */}
          <Image source = { fileUri == null ? require('./../../Image/person.png') : { uri : fileUri }} resizeMode = 'contain' style={styles.logoImage}/>

        </View>

        <View style={{width: '100%', height: '15%', backgroundColor: '#FFF'}}>
          
          <Text style={[styles.TextStyle,{}]}>Welcome</Text>

        </View>

        <View style={{width: '100%', height: '20%', backgroundColor: '#FFF'}}>
          
          <Text style={[styles.TextStyle,{color: '#4152B2', fontWeight: 'bold', fontSize: wp('4.5%')}]}>{LoginData.username}</Text>

        </View>
        

      </View>

      

      <View style={{width: '100%', height: hp('75%'), backgroundColor: '#ADADAD', paddingTop: wp('0.5%')}}>
        
        

      <SidebarItem IconName = {'home'} IconType = {'font-awesome'} Title = {'Home'} 
                   Function = {()=>{
                    props.closeItem()
                    props.navigator.navigate('Home')}}/>

      <SidebarItem IconName = {'arrow-all'} IconType = {'material-community'} Title = {'Moves'} 
                   Function = {()=>{
                    props.closeItem()  
                    LoginData.role == 'provider' ? props.navigator.navigate('ProviderMovesControl') :
                    
                    props.navigator.navigate('MovesControl')}}/>

      <SidebarItem IconName = {'arrow-all'} IconType = {'material-community'} Title = {'Canceled Moves'} 
                   Function = {()=>{
                     props.closeItem()
                     props.navigator.navigate('CanceledMove')}}/>

      <SidebarItem IconName = {'account'} IconType = {'material-community'} Title = {'Manage Profile'} 
                   Function = {()=>{
                     props.closeItem()
                                    props.navigator.navigate('Profile')}}/>

      {LoginData.role == 'provider' &&
      <SidebarItem IconName = {'account-tie'} IconType = {'material-community'} Title = {'Manage Professional Detail'}
                   Function = {()=>{
                    props.closeItem()  
                    GetPerfessionalDetail()}} />
      }

      {LoginData.role != 'provider' &&
      <SidebarItem IconName = {'credit-card'} IconType = {'material-community'} Title = {'Manage Card'}  
                   Function = {()=>{
                    props.closeItem()  
                    props.navigator.navigate('ManageCard')}} />
      }

      {LoginData.role == 'provider' &&
      <SidebarItem IconName = {'credit-card'} IconType = {'material-community'} Title = {'Manage Merchant Detail'} 
                   Function = {()=>{
                    props.closeItem()  
                    props.navigator.navigate('MerchantDetail')}}/>
      }

      {LoginData.role != 'provider' &&
      <SidebarItem IconName = {'credit-card-clock'} IconType = {'material-community'} Title = {'Payment Details'} 
                   Function = {()=>{
                    props.closeItem()  
                     props.navigator.navigate('PaymentDetails')
                    }}/>
      }

      {LoginData.role == 'provider' &&
      <SidebarItem IconName = {'credit-card-clock'} IconType = {'material-community'} Title = {'Earning Detail'} 
                   Function = {()=>{}}/>
      }

      <SidebarItem IconName = {'bell'} IconType = {'font-awesome'} Title = {'Notification Setting'} 
                   Function = {()=>{
                    props.closeItem()  
                     props.navigator.navigate('NotificationSetting')
                    }}/>

      <SidebarItem IconName = {'lock'} IconType = {'font-awesome'} Title = {'Change Password'} 
                   Function = {()=>{
                    props.closeItem()   
                    props.navigator.navigate('ChangePassword')
                  
                  }}/>

      <SidebarItem IconName = {'power'} IconType = {'material-community'} Title = {'Logout'}           
                   Function = {()=>{UserLogout(LoginData.user_id)}}/> 


      <View style = {{width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        

      </View>

        
        
        
      </View>  
      
      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={PerfessionalDetailNotApproved_Visible}
          onBackdropPress={() => {}}>

          <View style={{width:wp('80%'), height: hp('15%'), backgroundColor: '#FFF'}}>

            <View style={{width:'100%', height: '60%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}}>

              <Text style ={styles._Text}>Your professional details are not approved yet.</Text>

            </View>

            <View style={{width:'100%', height: '40%', backgroundColor: '#FFF', flexDirection: 'row'}}>
              <View style={{width:'100%', height: '100%', backgroundColor: '#FFF', alignItems: 'center'}}>

                <Button b_Width = {'30%'} b_Height = {'95%'} b_BackgroundColor = {'transparent'}
                  b_BorderRadius = {15} b_Elevation = {0}
                  t_FontSize = {wp('3.5%')} t_FontWeight = {'200'} 
                  t_ButtonTitle = {'OK'} t_Elevation = {3} 
                  t_TextColor = {'#339cff'} HasIcon = {false}
                  Function = {()=>{ setPerfessionalDetailNotApproved_Visible(false) }}/>

              </View>

              
            </View>

          </View>

        </Modal>
      
        </ScrollView>
    </View>
  );
};








const styles = StyleSheet.create({
  SidbarStyle:{
    flex: 1, // maximiz
    backgroundColor: '#ADADAD'
  },
  TextStyle: {
    //fontFamily: Font.FontSansR, 
    fontSize: wp('4%'), 
    color: '#737373',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  TextInputStyle: {
    width: wp('80%'), 
    height: hp('6%'),
    marginLeft: wp('10%'), 
    marginRight: wp('10%'), 
    backgroundColor:'#d9d9d9', 
    borderRadius: 30,
    textAlign: 'center',
    fontSize: wp('3%'),
    elevation: 1
  },
  TitleText: {
    //fontFamily: Font.FontSansB, 
    fontSize: wp('7%'), 
    color: '#2196F3',
    width: '100%',
    height: '35%',
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  ButtonStyle: {
    width: wp('80%'), 
    height: hp('6%'),
    marginLeft: wp('10%'), 
    marginRight: wp('10%'), 
    backgroundColor:'#2196F3', 
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonTextStyle: {
    //fontFamily: Font.FontSansR, 
    fontSize: wp('4%'), 
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    color: 'white',
    elevation: 1
  },
  logoImage: {
    width : '100%',
    height : '100%',
    justifyContent : "center",
    opacity : 80
  },
  _Text : {
    fontSize : wp('3.5%'), 
    fontWeight: '200', 
    color: '#908E8E',
    elevation: 5
  }

});

export default App;
