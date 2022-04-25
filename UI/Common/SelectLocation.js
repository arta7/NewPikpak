import React, { useEffect,
  useRef } from 'react';
import {View,
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import { Icon, Input } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMaps } from '../../Redux/GoogleMapsData';
import { MoveLocationsData, 
  DefaultLocationData 
} from '../../Redux/LocationData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { MoveData } from '../../Redux/MoveData';

const SelectLocation = (props) => {

const call_id = props.navigation.state.params.call_id
const screen_title = props.navigation.state.params.screen_title
const last_location = props.navigation.state.params.last_location

const SearchBar = useRef(null)
  
let GetPlaceLatLng = async(place_id)=>{
    
  var axiosConfig = {
    headers:{
      Accept : 'application/json',
      Content_Type : 'application/json'
    }
   }
  axios.get(APIMaster.GURL + 
            APIMaster.GooglePlace.GetLatLng.replace('{placeid}', place_id).replace('{key}', GoogleMaps.map_api_key))
    .then((result)=> {
    
      if(result.data.status == 'OK')
      {
        if(call_id == 'src')
        {
          MoveLocationsData.pickup_latitude = result.data.result.geometry.location.lat
          MoveLocationsData.pickup_longitude = result.data.result.geometry.location.lng

        }
        else
        {
          MoveLocationsData.delivery_latitude = result.data.result.geometry.location.lat
          MoveLocationsData.delivery_longitude = result.data.result.geometry.location.lng

          MoveData.delivery_place_id = place_id

        }

        DefaultLocationData.default_latitude = result.data.result.geometry.location.lat
        DefaultLocationData.default_longitude = result.data.result.geometry.location.lng

        props.navigation.replace('CreateMove_Location', {
          move_id: props.navigation.state.params.move_id != null ? props.navigation.state.params.move_id:''
         
        })
      }

    })
    .catch( (error)=> {
      console.log('Error : ',error)  
      
    })
  }

  useEffect(()=>{

    SearchBar.current.focus()

    if(last_location != '') {
      SearchBar.current.setAddressText(last_location)
    }


  }, [])
  
  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {screen_title} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                />
      <ImageBackground source={require("./../../Image/watermark.png")} resizeMode="cover" style={styles.backgroundImage}>

        <GooglePlacesAutocomplete
          ref = {SearchBar}
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: ColorPalet.HeaderColor,
            },
            textInput: {
              height: hp('7%'),
              color: '#5d5d5d',
              fontSize: 16,
              marginLeft: wp('2%'),
              borderRadius: 0,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          onPress={(data, details = null) => {

            if(details != null && details != '')
               {
                 console.log('call id = ')
                 if(call_id == 'src')
                 {MoveLocationsData.pickup_description = data.description}
                 else
                 {MoveLocationsData.delivery_description = data.description}
                 
                 GetPlaceLatLng(details.place_id)

               }
          }}
          query={{
            key: GoogleMaps.map_api_key,
            language: 'en',
          }}
          renderRightButton={() => (
            <TouchableOpacity
              style={{
                width: hp('7%'), 
                height: hp('7%'), 
                backgroundColor: '#FFF',
                marginRight: wp('2%'),
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center'
              }}
              onPress={() => {
                SearchBar.current.setAddressText('')
              }}
            >
              <Icon
                
                style={{color : 'red'}}
                name="close-circle" size={wp('7%')} color={'silver'} type='material-community'
              />
            </TouchableOpacity>
          )}
        />

      </ImageBackground>
      
    </View>
   
   );
 };

 const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.MainBackground
  },
  backgroundImage: {
    height: hp('100%'),
    backgroundColor: '#ABABAB',
    opacity : 100
  }
  });
 
 export default SelectLocation;

