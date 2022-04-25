import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';




const Button = (props) => {

  return (

    <TouchableOpacity style = {{width : props.b_Width, height : props.b_Height, 
                                justifyContent : 'center', alignItems : 'center',
                                backgroundColor : props.b_BackgroundColor, overflow : 'hidden',
                                borderRadius : props.b_BorderRadius, elevation : props.b_Elevation,
                                borderColor: props.b_BorderColor, borderWidth: props.b_BorderWidth, flexDirection : 'row'}}
                                disabled={props.DisableButton}
                                onPress = {props.Function}>

      {props.HasIcon &&
      <Icon name = {['home', props.IconName]} color= {['#FFF', props.IconColor]} type = {["font-awesome", props.IconType]} size={[30, props.IconSize]}/> 
      
      
      }
      <Text style = {{color : props.t_TextColor, fontSize : props.t_FontSize, 
                      marginLeft : props.HasIcon ? 15 : 0,
                      fontWeight : props.t_FontWeight, elevation : props.t_Elevation}}>{props.t_ButtonTitle}</Text>
    </TouchableOpacity>

   );
 };

 
 export default Button;