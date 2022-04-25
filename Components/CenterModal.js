import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, TextInput ,Text,TouchableOpacity, FlatList} from "react-native";

import { Icon }  from "react-native-elements";
import Modal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

export default CenterModals =(props)=>{
        



  
    return ( 
      <>          
<Modal isVisible={props.showModal} style={[{justifyContent: 'center',
width:'90%'
,marginRight:'5%',marginLeft:'5%',position:'absolute',top:1,opacity:0.9
               },props.ModalStyle]}
              //  onBackdropPress={props.closeModal}
              >
    
                <View style={[{
                borderRadius: 10,
                borderColor: 'white',
                height:120,width:'100%',backgroundColor:'white'
                },props.ViewStyle]}>
                    <TouchableOpacity style={{width:30,height:30,borderRadius:15,borderWidth:1,backgroundColor:'yellow',position:'absolute',top:10,left:5}}
                    onPress={props.closeModal}
                    >
                      <Icon name='close' color='red'/>
                    </TouchableOpacity>

                   <View style={{
                   justifyContent:'center',
                   alignItems:'center'
                   ,height:100
                   ,width:'100%',marginTop:10,justifyContent:'center',alignSelf:'center'}}   
                   >  
                   <Text style={{color:'black'
                   ,fontSize:wp('4%'),textAlign:'center'}}>{props.name}</Text>
                     </View>  
</View>

</Modal>



</>

    );
  }


