import React, { useEffect, useState, useRef } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import MessageInputBox from '../../Components/MessageInputBox';
import MessageItem from '../../Components/MessageItem';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginData } from '../../Redux/LoginData';
import Loading_Data from '../../Components/LoadingData';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { MoveLocationsData, LocationData, DefaultLocationData } from '../../Redux/LocationData';
import SelectLocation from '../Common/SelectLocation';
import { CurrentMove, MoveData } from '../../Redux/MoveData';


const Messages = (props) => {
 
  const [MessageText, setMessageText] = useState('')

  const [MessageList, setMessageList] = useState([])
  const flatListRef = useRef(null)

  const [counter, setCounter] = useState(0);
  const timer = useRef(null);

  let GetMessagesList = ()=>{
    
    console.log('Get message list methode called')
    
    var params = {
      move_id : LoginData.move_id,
      receiver_id : '6169772b18165f6d673c9312',
      sender_id : LoginData.user_id
    }

  
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
  
     
    axios.post(APIMaster.URL + APIMaster.ChatMessage.GetMessageList, params, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
        

            if(response.data.status == 1)
            {
              setMessageList(response.data.messages)
              console.log('message loaded...')
              flatListRef.current.scrollToIndex({index: MessageList.length, animated: false, viewPosition: 0})
            }
  
    })
    .catch( (error)=> {
      console.log('Error : ',error)  

     
    })
  }

  let CreatMessage = (_message)=>{
    
    console.log('Get message list methode called')
    
    var params = {
      move_id : LoginData.move_id,
      receiver_id : '6169772b18165f6d673c9312',
      sender_id : LoginData.user_id,
      message : _message,
      time : new Date().getTime,
      message_id : '1'
    }

  
    var axiosConfig = {
      headers:{
        Accept : 'application/json',
        Content_Type : 'application/json'
      }
     }
  
     
    axios.post(APIMaster.URL + APIMaster.ChatMessage.CreateMessage, params, axiosConfig)
    .then((response)=> {
            
            console.log(response)  
        

            if(response.data.status == 1)
            {
              
              console.log('message sent...')
              setMessageText('')
              GetMessagesList()
            }
  
    })
    .catch( (error)=> {
      console.log('Error : ',error)  

     
    })
  }

  
  useEffect(() => {
    // useRef value stored in .current property
    GetMessagesList()
  }, []);


  return (

    <View style={styles.Container}>
      
      {/* <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {30}
                /> */}
       {/* <ScrollView scrollEnabled = {true} pagingEnabled = {true}> */}
       <FlatList
        data={MessageList}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
        onLayout={() => flatListRef.current.scrollToEnd({animated: true})}
        renderItem={({item}) => 
      <View style = {{width: '100%', height: 'auto', marginBottom: '2%'}}>

      <MessageItem IsRecieved = {item.class == 'receive' ? true : false} MessageText = {item.message} MessageTime = {item.time} />
        
      
      

      </View>
        }
        />
      {/* // </ScrollView> */}

      

      <MessageInputBox MessageText = {MessageText} SetMessageText = {setMessageText}
                       Function = {()=>{CreatMessage(MessageText)}}/>
      

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
    textAlign: 'left',
    fontSize : wp('3.5%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: 10
  },
  _Text2 : {
    width: '100%',
    textAlign: 'left',
    fontSize : wp('2.5%'), 
    fontWeight: '100', 
    color: '#9B9B9B',
    paddingLeft: 10
  }

  });
 
 export default Messages;