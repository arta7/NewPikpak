import React, {Component} from 'react'
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground,Linking,Alert,ScrollView,Platform
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import RadioButton from '../../Components/RadioButton';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import LocationAddress from '../../Components/LocationAddress';
import { Icon } from 'react-native-elements';
import ServiceProvider from '../../Components/ServiceProvider';
import ActiveMoveInfo from '../../Components/ActiveMoveInfo';
import MoveThumbnail from '../../Components/MoveThumbnail';
// import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Toast from 'react-native-simple-toast';
import { MoveLocationsData, LocationData, DefaultLocationData } from '../../Redux/LocationData';
import SelectLocation from '../Common/SelectLocation';
import Polyline from '@mapbox/polyline';
import { GoogleMaps } from '../../Redux/GoogleMapsData';
import { MoveData, CurrentMove } from '../../Redux/MoveData';
import { WebView } from 'react-native-webview';


export default class  PaymentPage extends Component  {
  constructor(props) {
    super(props)
    this.state = {
       Amount:''//this.props.navigation.getParam('Amount','')
    }
  }

    
// Payment 1


// componentDidMount() {
//   Alert.alert('url','test url')
//   if (Platform.OS === 'android') {
//     Linking.getInitialURL().then(async (url) => {
//       this.handleOpenURL(url);
     
//     }).catch(err => console.error('An error occurred', err));
//   } else {
//       Linking.addEventListener('url', this.handleOpenURL);
//     }
//   }
  
//   componentWillUnmount() {
//   //  Linking.removeEventListener('url', this.handleOpenURL);
//   }



  PaymentsComplete=(move_id)=>{
  var params = {
    user_id: LoginData.user_id,
    move_id: move_id,
  "transaction_id": move_id,
  "payment_type":"paypal",
  "transaction_type":"payment",
  "status": "completed",
  "amount": Amount,
  "logs": move_id
}

var axiosConfig = {
  headers:{
    Accept : 'application/json',
    Content_Type : 'application/json'
  }
 }


axios.post(APIMaster.URL + APIMaster.PaymentCard.CompletePayment, params, axiosConfig)
.then((response)=> {
        
        console.log(response.data.message)  
      Alert.alert('Alert',response.data.message)
})
.catch( (error)=> {
  console.log('Error PaymentComplete : ',error.response.data)  
  // setLoader_Visible(false)
  //setshowIndicator(false)
 
})
 }






 handleOpenURL=(event)=>{
 

     if(event.url.includes('https://pikpakcancel'))
     {
      Alert.alert('Alert ','Your Payment is not Complete')
      this.props.navigation.goBack()
      this.props.navigation.state.params.onSelect();
     }
     else  if(event.url.includes('https://pikpaksuccess'))
     {
      Alert.alert('Alert ','Your Payment is Complete')
      this.props.navigation.goBack()
      this.props.navigation.state.params.onSelect();
     }

//   Alert.alert('Alert','Your Payment Is Not Complete.')
//   {
//   if(event.split('/')[2] == "paypal.com")
//   {
//     console.log('success back to app')
//     this.PaymentsComplete(CurrentMove.move_id);
//   }
//   else  
//   if(event.split('/')[2] == "paypalerror.com")
//   {
//     console.log('Error back to app :')
//     Alert.alert('Alert','Your Payment Is Not Complete.')
//   }
// }
}

// Payment 3
 PaypalPayment=()=>{
 
  const dataDetail = {
    "intent": "CAPTURE",
    "purchase_units": [{
        "amount": {
          "currency_code": "USD",
          "value": this.state.Amount
        }
      }],
      "application_context": {
        // "user_action": "PAY_NOW",
        "return_url ": "pikpak://paypal.com",
        "cancel_url": "pikpakerror://paypalerror.com"
    }
  }

  var form = new URLSearchParams()
  form.append("grant_type","client_credentials");


  const options = {
    method: 'POST',
    headers: { 
      "content-type": "application/x-www-form-urlencoded",
        'authorization': 'Basic QVljNWJkTFB3SWhkRGRNMF9hZnNxNUY3XzVZSnVsOFN0OEhXWE9ONDU5MW1FeGxYa3p1cTB0di1vSE9kbUZaaWdvX2ZLM1lEVHk5emFUdWU6RUloWUx3MGdIZFRFMnhXTEUwazRHbkt0MUdYbWxEZXI0S0NRN0tyYlBmaWJmVnhFbGFtSWp3YVhBajBtZjN0RWg0Tk1NN29keTd0bmloZlk='
        ,"cache-control": "no-cache",
      },
    data: form,
    url:'https://api-m.paypal.com/v1/oauth2/token'
  }

axios(options)
.then(response => {
    console.log('access token : ',response.data)
    const options2 = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ response.data.access_token
          ,"cache-control": "no-cache",
        },
      data: dataDetail,
      url:'https://api-m.paypal.com/v1/payments/payment'
    }
    axios(options2)
        .then(response1 => {
          
          const {  links } = response1.data
          const approvalUrl = links.find(data => data.rel == "approval_url")
          console.log('reponse 1 : ',approvalUrl)
          
            Linking.openURL(approvalUrl.href.toString());
            
         
        }).catch(err => {
            console.log('error 1',err)
        })
}).catch(err => {
  console.log('error 2',err)
})

    }


// Payment 4  (function)
 PaymentFunction=()=>{
  this.PaypalPayment()
  // insert payment codes
  // setPaymentTypeVisible(false)
}


render(){
  return (

    <View style={styles.Container}>

<WebView
                        source={{ uri: this.props.navigation.getParam('Address') }}
                        onNavigationStateChange={data =>
                            
                            this.handleOpenURL(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />

    </View>  
   
   )
  }
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
    textAlign: 'right',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '100', 
    color: 'black'
  },
  _Text2 : {
    width: 'auto',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('4%'), 
    fontWeight: '100',
    color: '#797979',
    flexWrap: 'wrap'
  },
  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 