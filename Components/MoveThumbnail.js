
import React, { useEffect, useState } from 'react';
import {View,
  Text,
  TouchableOpacity,FlatList, Image, StyleSheet, ImageComponent
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from './../Header/Header';
import { Icon } from 'react-native-elements';
import Button from './Button';
import { SliderBox } from "react-native-image-slider-box";


const MoveThumbnail = (props) => {
    const[Data,setData] = useState([])
   useEffect(()=>{
    console.log('props.ImageSrc',props.ImageSrc)
    var pushdata = [];
    for(let i=0;i<props.ImageSrc.length;i++)
    {
      pushdata.push(props.ImageSrc[i].file_name)
    }
    if(pushdata.length > 0)
    setData(pushdata)
    else
    setData([require("./../Image/ImagePlaceholder.png")])
    
   },[props.ImageSrc])
  return (

<View style = {{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center',
 alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                 >
      {
      //   props.ImageSrc == [] ?
      //    <Image source={require("./../Image/ImagePlaceholder.png")} resizeMode='contain' style={{width: '100%', height: '100%'}}/>
      // :
  
<SliderBox
  images={Data}
  sliderBoxHeight={'100%'}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
/>
      }


   
    {  props.PickedState == true &&
      <Text  style={{fontSize:wp('20%'),color:'blue',position:'absolute',top:'10%'}}>
                      Picked
      </Text>
    }
    {props.ShowEditButtons &&
    <TouchableOpacity style = {{width: wp('10%'), height: wp('10%'), 
                                position: 'absolute', top: wp('2%'), 
                                left: wp('76%'), justifyContent: 'center', 
                                alignItems: 'center', borderRadius: 10, 
                                borderColor: '#B8BBBD', borderWidth: 1,
                                backgroundColor: 'transparent'}}
                                onPress = {props.EditFunction}>

    <Icon name = {'edit'} color= {'#B8BBBD'} type = {"materialicon"} size={wp('7%') } />

    </TouchableOpacity>
    }

    {props.ShowButtons &&
    <TouchableOpacity style = {{width: wp('10%'), height: wp('10%'), 
                                position: 'absolute', top: wp('2%'), 
                                left: wp('88%'), justifyContent: 'center', 
                                alignItems: 'center', borderRadius: 10, 
                                borderColor: '#B8BBBD', borderWidth: 1,
                                backgroundColor: 'transparent'}}
                                onPress = {props.DeleteFunction}>

    <Icon name = {'delete'} color= {'#B8BBBD'} type = {"materialicon"} size={wp('7%')} />

    </TouchableOpacity>
    }

    {props.ShowPayButton &&

    <View style = {{width: '100%', height: '25%', 
                    position: 'absolute', top: '75%', 
                    left: '0%', backgroundColor: 'silver',
                    opacity: 0.5}}>

    </View>
    
    }

    {props.ShowPayButton &&

    <View style = {{width: '100%', height: '25%', 
                    position: 'absolute', top: '75%', 
                    left: '0%', justifyContent: 'center', alignItems: 'center'}}>

      <Button b_Width = {'95%'} b_Height = {'75%'} b_BackgroundColor = {ColorPalet.SignUpButton}
              b_BorderRadius = {10} b_Elevation = {3}
              t_FontSize = {20} t_FontWeight = {'bold'} 
              t_ButtonTitle = {props.ButtonTitle} t_Elevation = {3} 
              t_TextColor = {'white'} HasIcon = {false}
              Function = {props.Function}/>
  </View>
    }

     { 
      props.showDetails &&
    <TouchableOpacity style={{position:'absolute',width:'100%',height:50,justifyContent:'center',opacity:0.65,alignItems:'center'
    ,bottom:0,backgroundColor:'#ECA017'}}
     onPress = {props.MainFunction}
    >
        <Text style={{color:'white',fontSize:18}}>Details</Text>
    </TouchableOpacity>
    }
    

</View>


);
 };

 const styles = StyleSheet.create({
  
  
  _Text : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontSize : wp('4%'), 
    fontWeight: 'bold', 
    color: 'black',
    paddingLeft: 30
  },
  _Text2 : {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize : wp('3%'), 
    fontWeight: '100',
    color: '#B8BBBD'
  }

  });
 
 export default MoveThumbnail;