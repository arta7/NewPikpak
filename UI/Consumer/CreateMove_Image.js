import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, Image,ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers'
import Modal from 'react-native-modal';
import RadioButton from '../../Components/RadioButton';
import BorderedTextBox from '../../Components/BorderedTextBox';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import { MoveData, EditMoveData } from '../../Redux/MoveData';
import Loading_Data from '../../Components/LoadingData';
import axios from 'axios';
import { APIMaster } from '../../API/APIMaster';
import { LoginData } from '../../Redux/LoginData';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
// import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

let selectedImageId = 0
let selectedImageUri = ''
let loc_history = []
let history_id = 1

const CreateMove_Image = (props) => {

const [Weight, SetWeight] = useState(0)
const [NumOfHelper, SetNumOfHelper] = useState(0)
const [Description, SetDescription] = useState('')
const [SelectImageVisible, setSelectImageVisible] = useState(false)
const [SelectHelperVisible, setSelectHelperVisible] = useState(false)

const [HelperState, setHelperState] = useState([false, false, false, false, false])
const [HelperTitle, setHelperTitle] = useState(['Driver Only', 'Driver + One Helper', 'Driver + Two Helpers', 'Driver + Three Helpers', 'Driver + Four Helpers'])
const [SelectedHelper, setSelectedHelper] = useState(-1)
const [SelectedItem, setSelectedItem] = useState(-1)

const [Loader_Visible, setLoader_Visible] = useState(false)
const [Image_Viewer, setImage_Viewer] = useState(false)

const [counter, setCounter] = useState(1)
const [imageCounter, setImageCounter] = useState(1)

// let selectedImageId = 0

// let ImageList = [
// {key: './Image/ImagePlaceholder.png', value: '1'},
// {key: 'Bikes', value: '2'},
// {key: 'Books', value: '3'},
// {key: 'Business Deliveries', value: '4'},
// {key: 'Donations', value: '5'},
// {key: 'Furniture Move', value: '6'},
// {key: 'Labor Only', value: '7'},
// {key: 'Office Moves', value: '8'},
// {key: 'Towing Vehicle', value: '9'},
// {key: 'Piano', value: '10'}
// ]

const options = {
  title: 'Select Image',
  cancelButtonTitle:'Cancel',
  takePhotoButtonTitle:'Take Photo',
  chooseFromLibraryButtonTitle:'Choose From Gallery ',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};  

let launchCamera=()=>{

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
    console.log('File Name = ', response.fileName);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        
      
          setImg('')
          setImgFN('')
          
    } else {
      
         console.log('imagge',response)
         var file = {
              uri:'file:///'+response.path,
              type:response.type,
              name:response.fileName,
         }
          setImg(response.uri)
          setImgFN(response.fileName)
          
          ImageList.push({name: imageCounter, value: file,state:0})
         ImageList.push({name: 0, value: '',state:0})
          console.log('len: ', ImageList.length)
          console.log('list: ', ImageList)
          // console.log('Filter: ', ImageList.filter(item => item.name !== 0).length)
          setCounter(counter + 1)
          setCounter(counter + 1)
          setImageCounter(imageCounter + 1)
          
    }
  });

  console.log(img, '====', imgFN)
  setCounter(counter + 1)
  setCounter(counter + 1)

}

const handleRemoveItem = () => {
  // const name = e.target.getAttribute("name")
  // if(ImageList.length > 1) {
  //  setImageList(ImageList.filter(item => item.name !== 0));
  // }
   console.log('len: ', ImageList.length)
   console.log('list: ', ImageList)
 };



 const addToList = () => {
  // setImageList(ImageList.filter(item => item.name !== 0));
    ImageList.push({name: 1})
    ImageList.push({name: 0})
   console.log('len: ', ImageList.length)
   console.log('list: ', ImageList)
   setCounter(counter + 1)
 };

 const deleteFromList = (_id) => {
  var array = ImageList.filter(item => item.name != 0); 
  console.log('array 1 : ',array)
    for(let i=0;i<array.length;i++)
    {
      // console.log('array'+i.toString(),array[i].name,_id.toString())
        if(array[i].name.toString() == _id.toString())
        {
          // console.log('array 111'+i.toString(),array[i].name)
           array.splice(i, 1);
        }
    }
    array.push({name: 0, value: ''})
    setImageList(array)
  console.log('array 222',array)
  // if (index != -1) {
  //   array.splice(index, 1);
  //   setImageList(array)
    
  // }
  // setImageList(ImageList.filter(item => item.name !== _id));
  
  // setImageList(ImageList.splice(ImageList.indexOf(_id), 1))
  setImage_Viewer(false)
  setCounter(counter + 1)
  console.log('ImageList : ',ImageList)
};

const showLen = () => {
  

  console.log('len: ', ImageList.length)
  console.log('list: ', ImageList)
};




const [ImageList, setImageList] = useState([
]);

const [img, setImg] = useState(null);
const [imgFN, setImgFN] = useState('');

let SelectHelper=()=>
{
  if(SelectedItem != -1)
  {
    setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[SelectedItem - 1])
    setSelectHelperVisible(false)
  }
  else
    setSelectHelperVisible(false)
}

let HelperSelection=(id)=>
{
  // console.log(id)
  setSelectedItem(id)
  SetNumOfHelper(id)

  // console.log('~~~~~~~~~~~~~~~~~~~~~')
  // setSelectHelperVisible(false)
  
  switch(id)
  {
    case 0:
      setHelperState([false, false, false, false, false])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

    case 1:
      setHelperState([true, false, false, false, false])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

    case 2:
      setHelperState([false, true, false, false, false])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

    case 3:
      setHelperState([false, false, true, false, false])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

    case 4:
      setHelperState([false, false, false, true, false])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

    case 5:
      setHelperState([false, false, false, false, true])
      setSelectedHelper(SelectedItem)
    SetNumOfHelper(HelperTitle[id - 1])
    setSelectHelperVisible(false)
    return

  }

  
}

let ImageSelectionVisible=()=>
{
  if(SelectedHelper == -1)
    HelperSelection(0)

  setSelectHelperVisible(true)
}



let SetMoveData = async(_address_of_pickup,
                        _gps_of_pickup,
                        _address_of_delivery,
                        _gps_of_delivery,
                        _move_type_id,
                        _pickup_unit_number,
                        _pickup_stairs,
                        _pickup_elevator_building,
                        _pickup_parking_info,
                        _delivery_unit_Number,
                        _delivery_stairs,
                        _delivery_elevator_building,
                        _delivery_parking_info,
                        _date_of_pickup,
                        _time_of_pickup,
                        _move_images,
                        _weight,
                        _no_of_helpers,
                        _description
                        )=>{  
                          
                        
                          {
                          try
                          {
  setLoader_Visible(true)

  var param =new FormData();
  param.append('user_id',LoginData.user_id)
  param.append('address_of_pickup',_address_of_pickup)
  param.append('gps_of_pickup',_gps_of_pickup)
  param.append('address_of_delivery',_address_of_delivery)
  param.append('gps_of_delivery',_gps_of_delivery)
  param.append('move_type_id',_move_type_id)
  param.append('pickup_unit_number',Number(_pickup_unit_number))
  param.append('pickup_stairs',_pickup_stairs)
  param.append('pickup_elevator_building',_pickup_elevator_building)
  param.append('pickup_parking_info',_pickup_parking_info)
  param.append('delivery_unit_Number',Number(_delivery_unit_Number))
  param.append('delivery_stairs',_delivery_stairs)
  param.append('delivery_elevator_building',_delivery_elevator_building)
  param.append('delivery_parking_info',_delivery_parking_info)
  param.append('date_of_pickup',_date_of_pickup)
  param.append('time_of_pickup',_time_of_pickup)
  if(ImageList.filter(item => item.name != 0).length > 0 )
  param.append('pic1',ImageList.filter(item => item.name != 0)[0].value)
  if(ImageList.filter(item => item.name != 0).length > 1 )
  param.append('pic2',ImageList.filter(item => item.name != 0)[1].value)
  if(ImageList.filter(item => item.name != 0).length > 2 )
  param.append('pic3',ImageList.filter(item => item.name != 0)[2].value)
  
  param.append('weight',Number(_weight))
  param.append('no_of_helpers',_no_of_helpers)
  param.append('description',_description)


  console.log(param)
  var axiosConfig = {
   }
  axios.post(APIMaster.URL+APIMaster.Move.CreateMove,param,axiosConfig)
 .then((response)=> {
         
         console.log('Accept',response.data)  
         
         console.log('************')
   
         Toast.show(response.data.message)
         if(response.data.status == 1)
         {
          
           Add_To_History(MoveData.address_of_delivery, MoveData.delivery_place_id)

           props.navigation.replace('MovesControl')
         }

       
        setLoader_Visible(false)
        
 })
 .catch((error)=> {
  setLoader_Visible(false)
   console.log('Error setmove : ',error)  
 
 })
}
catch
{
  setLoader_Visible(false)
  console.log('ERror Caatch')
}
  }
}


 let UpdateMove=async(_address_of_pickup,
    _gps_of_pickup,
    _address_of_delivery,
    _gps_of_delivery,
    _move_type_id,
    _date_of_pickup,
    _time_of_pickup,
    _weight,
    _no_of_helpers,
    _description
    )=>{  
      try
      {
setLoader_Visible(true)

 let param = {
    //  user_id : LoginData.user_id,
      move_id: EditMoveData.move_id,
      address_of_pickup : _address_of_pickup,
      gps_of_pickup : _gps_of_pickup,
      address_of_delivery : _address_of_delivery,
      gps_of_delivery : _gps_of_delivery,
      move_type_id : _move_type_id,
      date_of_pickup : _date_of_pickup,
      time_of_pickup : _time_of_pickup,
      weight : Number(_weight),
      no_of_helpers :_no_of_helpers,
      description : _description
      
    
 }



console.log('params : ',param)
var axiosConfig = {
}
axios.post(APIMaster.URL+APIMaster.Move.UpdateMove,param,axiosConfig)
.then((response)=> {

console.log('Accept',response.data)  

console.log('************')

Toast.show(response.data.message)
if(response.data.status == 1)
{

Add_To_History(EditMoveData.address_of_delivery, EditMoveData.delivery_place_id)

props.navigation.replace('MovesControl')
}


setLoader_Visible(false)

})
.catch((error)=> {
setLoader_Visible(false)
console.log('Error update : ',error)  

})
}
catch(err)
{
setLoader_Visible(false)
console.log('ERror Caatch',err)
}

 }


let DataValidation=()=>{

  MoveData.weight = Weight
  MoveData.no_of_helpers = SelectedItem-1
  // console.log(img.uri)
  // console.log(img, '====', imgFN)
  MoveData.move_images = img
  MoveData.description = Description
  if(ImageList.filter(item => item.name != 0).length == 0)
  {
    Toast.show('Please Fill at Least One Image.') 
  }
  else
  {
    if(props.navigation.getParam('_edit') == true)
    {


      EditMoveData.description = Description
      EditMoveData.no_of_helpers = SelectedItem-1
      EditMoveData.weight = Weight

      UpdateMove(EditMoveData.address_of_pickup,
        EditMoveData.gps_of_pickup,
        EditMoveData.address_of_delivery,
        EditMoveData.gps_of_delivery,
        EditMoveData.move_type_id,
        EditMoveData.date_of_pickup,
        EditMoveData.time_of_pickup,
        EditMoveData.weight,
        EditMoveData.no_of_helpers,
        EditMoveData.description)
       
    }
    else
    {
  SetMoveData(MoveData.address_of_pickup,
              MoveData.gps_of_pickup,
              MoveData.address_of_delivery,
              MoveData.gps_of_delivery,
              MoveData.move_type_id,
              MoveData.pickup_unit_number,
              MoveData.pickup_stairs,
              MoveData.pickup_elevator_building,
              MoveData.pickup_parking_info,
              MoveData.delivery_unit_Number,
              MoveData.delivery_stairs,
              MoveData.delivery_elevator_building,
              MoveData.delivery_parking_info,
              MoveData.date_of_pickup,
              MoveData.time_of_pickup,
              MoveData.move_images,
              MoveData.weight,
              MoveData.no_of_helpers,
              MoveData.description)
           
  }

 
  }

}

let Add_To_History= async(_delivery_address, _delivery_place_id)=>{
  console.log('start stor')
  if(history_id < 5)
  {
    loc_history.push({id: history_id,
      delivery_address: _delivery_address, 
      delivery_place_id: _delivery_place_id})

    history_id = history_id + 1
  }
  else
  {
    loc_history = loc_history.filter(item => item.id != loc_history[0].id)

    loc_history.push({id: history_id, 
      pickup_address: _pickup_address, 
      pickup_gps: _pickup_gps, 
      delivery_address: _delivery_address, 
      delivery_gps: _delivery_gps})

    history_id = history_id + 1

    console.log(loc_history)
  }

  // AsyncStorage.setItem("LocationHistory", loc_history)
  try {
    await AsyncStorage.setItem('@LocationHistory:key', JSON.stringify(loc_history));
  } catch (error) {
    // Error saving data
    console.log('Error history: ', error)
  }
}

useEffect(()=>{
    // setLoader_Visible(false)
  console.log('List Len props.navigation.getParam: ', props.navigation.getParam('_edit'))
  
  if(props.navigation.getParam('_edit') == true)
  {
    // setImageList([])
    for(let i=0;i<EditMoveData.move_images.length;i++)
    {
      ImageList.push({name:(i+1).toString() , value: EditMoveData.move_images[i].file_name,state:1})
    }
    SetWeight(EditMoveData.weight.toString())
    SetDescription( EditMoveData.description)
    SetNumOfHelper(HelperTitle[EditMoveData.no_of_helpers])
    setSelectedItem(EditMoveData.no_of_helpers)
   
    
    console.log('List Len first run : ', EditMoveData.weight)
  }



  //  setCounter(counter + 1)
}, [counter])

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                />
        <ScrollView>
      <View style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

        <Text style = {styles._Text}>Other Details</Text>

      </View>

      { ImageList.filter(item => item.name != 0).length == 0 &&
      <View style = {{width: '100%', height: hp('8%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
        
        <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
          <Text style = {styles._Text}>Upload Image</Text>
        </View>
        <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: '10%', backgroundColor: ColorPalet.MainBackground}}>
          <Button b_Width = {'60%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                b_BorderRadius = {30} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Select'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{launchCamera()}}/>
        </View>
      </View>
      }
      { ImageList.filter(item => item.name != 0).length > 0 &&
      <View style = {{width: '100%', height: hp('15%') , justifyContent: 'center', alignItems: 'center'
      , marginLeft: hp('0.5%'), flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
      {/* <View style = {{width: ImageList.length == 0 ? '0%': (ImageList.length == 1 ? '35%': '64%'), height: '100%', justifyContent: 'center', alignItems: 'center'}}> */}
      <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15}}>
      <FlatList 
     data={ImageList}
      contentContainerStyle={{flexWrap:'wrap',flexDirection:'row'}}
      renderItem={({item,index})=>{
        return(
        <View style={{flex:1,flexWrap:'wrap',flexDirection:'row'}}>
          {(item.name == 0) && (index == ImageList.length - 1) && (ImageList.filter(item => item.name != 0).length < 3) &&
            <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderColor: ColorPalet.SignUpButton, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}
              disabled= {ImageList.filter(item => item.name != 0).length < 3 ? false : true}
            onPress = {()=>{launchCamera()}}>

              <Icon name = {'plus'} color={ImageList.length >= 3? 'silver' : '#ECA017'} type = "font-awesome" size={40}/>

            </TouchableOpacity>
          }
          {!item.name == 0 &&
          <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}
          onPress={()=>{selectedImageId = item.name
            selectedImageUri = (props.navigation.getParam('_edit') == true) ?item.value :  item.value.uri
            setImage_Viewer(true)}}>
            <Image source = {{ uri :   (props.navigation.getParam('_edit')) ? item.value:  item.value.uri }} resizeMode = 'center' style={{width: '90%', height: '90%'}}/>
          </TouchableOpacity>
      }

      
      {/* {
        (index+1 >= ImageList.length && index+1 < 5 ) && 
        <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderColor: ColorPalet.SignUpButton, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
          {/* // <Image source = { item } resizeMode = 'center' style={{width: '90%', height: '90%'}}/> */}
          {/* <Icon name = {'plus'} color={ImageList.length >= 5? 'silver' : '#ECA017'} type = "font-awesome" size={40}/>
        </TouchableOpacity>
      } */} 
    </View>
       )
      }
      }
    />

{/* <FlatList 
     data={x}
      contentContainerStyle={{flexWrap:'wrap',flexDirection:'row'}}
      renderItem={({item,index})=>{
        return(
        <View style={{flex:1,flexWrap:'wrap',flexDirection:'row'}}>
      <View style={{width:100,height:100,borderWidth:1,margin:10}}>
         
      </View>
      {
        (index+1 >= x.length ) &&
          <View style={{width:100,height:100,borderWidth:1
   ,justifyContent:'center',alignItems:'center',margin:10}}>
     <Text>+</Text>
    </View>
      }
    </View>
       )
      }
      }
    /> */}
        
      </View>
      {/* <View style = {{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
        
        <TouchableOpacity style = {{width: hp('17%'), height: hp('14%'), marginLeft: hp('1%'), borderWidth: 3, borderColor: ImageList.length >= 5? 'silver' : '#ECA017', justifyContent: 'center', alignItems: 'center'}}
                          disabled = {ImageList.length >= 5}
                          onPress = {()=>{setSelectImageVisible(true)}}>
          <Icon name = {'plus'} color={ImageList.length >= 5? 'silver' : '#ECA017'} type = "font-awesome" size={40}/>
        </TouchableOpacity>
      </View> */}
      </View>
      }
      <View style = {{width: '100%', height: hp('40%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
      
      <View style = {{width: '100%', height: '22.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {'silver'} BorderRadius = {5}
                    LocTitle = {'Weight (lbs.)'} LocTitleColor = {'#000'}
                    Value = {Weight} IsTextBox = {true} FontSize = {wp('4%')} KeyboardType = {'decimal-pad'}
                    MultiLine = {false} OnChangeFunction = {SetWeight}/>
                    
      </View>

      <View style = {{width: '100%', height: '22.5%', justifyContent: 'center',
       alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {'silver'} BorderRadius = {5}
                    LocTitle = {'Number of Helper'} LocTitleColor = {'#000'}
                    Value = {NumOfHelper} IsTextBox = {false} FontSize = {wp('4%')}
                    OnPressFunction = {()=>ImageSelectionVisible()}
                    HasIcon = {true} IconName = {'angle-down'} IconColor = {'#9B9B9B'} 
                    IconType = {"font-awesome"} IconSize = {wp('7%')}/>
                    
      </View>

      <View style = {{width: '100%', height: '22.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
                    BorderColor = {'silver'} BorderRadius = {5}
                    LocTitle = {'Description / Special Instructions'} LocTitleColor = {'#000'}
                    Value = {Description} IsTextBox = {true} FontSize = {wp('4%')}
                    MultiLine = {false} OnChangeFunction = {SetDescription}/>
                    
      </View>

      <View style = {{width: '100%', height: '32.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
        <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save & Continue'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{
                    // console.log('ImageList 1',ImageList)
                  DataValidation()
                  }}/>
        
                    
      </View>

      

      </View>

      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={SelectImageVisible}
          onBackdropPress={() => setSelectImageVisible(true)}>

          <View style={{width:wp('80%'), height: hp('25%'),   backgroundColor: '#C4C4C4'}}>

            <View style = {{width: '100%', height: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setSelectImageVisible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Take Picture</Text>

              </TouchableOpacity>

            </View>

            <View style = {{width: '100%', height: '32%', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setSelectImageVisible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Upload Picture</Text>

              </TouchableOpacity>

            </View>

            <View style = {{width: '100%', height: '32%', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setSelectImageVisible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={SelectHelperVisible}
          onBackdropPress={() => setSelectHelperVisible(false)}>

          <View style={{width:wp('80%'), height: hp('45%'),   backgroundColor: '#C4C4C4'}}>

            <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

              <Text style = {[styles._Text,{textAlignVertical: 'center'}]}>Number of Helper</Text>

            </View>

            <View style = {{width: '100%', height: '80%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

              <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver Only'} TextSize = {wp('4%')}
                       Selected = {HelperState[0]} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>HelperSelection(1)}/>

              <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver + One Helper'} TextSize = {wp('4%')}
                       Selected = {HelperState[1]} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>HelperSelection(2)}/>
              
              <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver + Two Helpers'} TextSize = {wp('4%')}
                       Selected = {HelperState[2]} PaddingLeft = {30} TextPaddingLeft = {10} 
                       Function = {()=>HelperSelection(3)}/>

              <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver + Three Helpers'} TextSize = {wp('4%')}
                       Selected = {HelperState[3]} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>HelperSelection(4)}/>

              <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
                       RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver + Four Helpers'} TextSize = {wp('4%')}
                       Selected = {HelperState[4]} PaddingLeft = {30}  TextPaddingLeft = {10} 
                       Function = {()=>HelperSelection(5)}/>

            </View>

            {/* <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
              <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
                <Button b_Width = {'85%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                  b_BorderRadius = {15} b_Elevation = {3}
                  t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Select'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>SelectHelper()}/>
              </View>
              <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
                <Button b_Width = {'85%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
                  b_BorderRadius = {15} b_Elevation = {3}
                  t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Cancel'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>setSelectHelperVisible(false)}/>
              </View>
            </View> */}

          </View>

        </Modal>

        <Modal style={{  marginHorizontal: wp('15%')}}
          isVisible={Loader_Visible}
          // onBackdropPress={() => setLoader_Visible(false)}
          >

          <Loading_Data />

        </Modal>

        <Modal style={{  marginHorizontal: wp('5%')}}
          isVisible={Image_Viewer}
          onBackdropPress={() => setImage_Viewer(false)}>

          
          <View style={{width: wp('90%'), height: 'auto', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{width: wp('90%'), height: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
          <Button b_Width = {35} b_Height = {35} b_BackgroundColor = {ColorPalet.SignUpButton}
                  b_BorderRadius = {30} b_Elevation = {3}
                  t_FontSize = {wp('5%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'X'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>setImage_Viewer(false)}/>
          </View>
          <View style={{width: wp('90%'), height: '80%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Image source = {{ uri : selectedImageUri }} resizeMode = 'center' style={{width: '100%', height: '100%'}}/>
            {/* <Text>{selectedImageId}</Text> */}
          </View>
          <View style={{width: wp('90%'), height: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
          {  !(props.navigation.getParam('_edit')) &&
          <Button b_Width = {'35%'} b_Height = {35} b_BackgroundColor = {ColorPalet.SignUpButton}
                  b_BorderRadius = {30} b_Elevation = {3}
                  t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Delete'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>deleteFromList(selectedImageId)}/>
          }
          </View>
          </View>

        </Modal>
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
    textAlign: 'left',
    fontSize : wp('4%'), 
    fontWeight: '200', 
    color: 'black',
    paddingLeft: 30
  },
  picker: {
    backgroundColor: '#E5E5E5'
  }

  });
 
 export default CreateMove_Image;
//************************************************************************************************************* */
// import React, { useEffect, useState } from 'react';
// import {View,
//   Text,
//   StyleSheet, FlatList, TouchableOpacity, Image
// } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import {ColorPalet} from '../../Header/Header';
// import Headers from '../../Components/Headers'
// import Modal from 'react-native-modal';
// import RadioButton from '../../Components/RadioButton';
// import BorderedTextBox from '../../Components/BorderedTextBox';
// import { Icon } from 'react-native-elements';
// import Button from '../../Components/Button';
// import { EditMoveData, MoveData } from '../../Redux/MoveData';
// import Loading_Data from '../../Components/LoadingData';
// import axios from 'axios';
// import { APIMaster } from '../../API/APIMaster';
// import { LoginData } from '../../Redux/LoginData';
// import { Toast } from 'native-base';
// import ImagePicker from 'react-native-image-picker';
// import { ScrollView } from 'react-native-gesture-handler';

// let selectedImageId = 0
// let selectedImageUri = ''
// let init_list = false

// // const [imgList, setImgList] = useState([])

// // let imgList = props.navigation.state.params._img_list

// const CreateMove_Image = (props) => {

//   const _img_list = props.navigation.state.params._img_list
// const [ImageList, setImageList] = useState(_edit ? EditMoveData.move_images : []);
// const [Weight, SetWeight] = useState(0)
// const [NumOfHelper, SetNumOfHelper] = useState(0)
// const [Description, SetDescription] = useState('')
// const [SelectImageVisible, setSelectImageVisible] = useState(false)
// const [SelectHelperVisible, setSelectHelperVisible] = useState(false)

// const [HelperState, setHelperState] = useState([false, false, false, false, false])
// const [HelperTitle, setHelperTitle] = useState(['Driver Only', 'Driver + 1', 'Driver + 2', 'Driver + 3', 'Driver + 4'])
// const [SelectedHelper, setSelectedHelper] = useState(-1)
// const [SelectedItem, setSelectedItem] = useState(-1)

// const [Loader_Visible, setLoader_Visible] = useState(false)
// const [Image_Viewer, setImage_Viewer] = useState(false)

// const [counter, setCounter] = useState(1)
// const [imageCounter, setImageCounter] = useState(1)

// const _edit = props.navigation.state.params._edit



// const options = {
//   title: 'Select Image',
//   cancelButtonTitle:'Cancel',
//   takePhotoButtonTitle:'Take Photo',
//   chooseFromLibraryButtonTitle:'Choose From Gallery ',
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };  

// let launchCamera=()=>{

//   ImagePicker.showImagePicker(options, (response) => {
//     console.log('Response = ', response);
//     console.log('File Name = ', response.fileName);
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
        
      
//           setImg('')
//           setImgFN('')
          
//     } else {
      
//          console.log('imagge',response)
//          var file = {
//               uri:'file:///'+response.path,
//               type:response.type,
//               name:response.fileName,
//          }
//           setImg(response.uri)
//           setImgFN(response.fileName)
          
//           ImageList.push({name: imageCounter, value: file})
//           ImageList.push({name: 0, value: ''})
//           console.log('len: ', ImageList.length)
//           console.log('list: ', ImageList)
//           // console.log('Filter: ', ImageList.filter(item => item.name !== 0).length)
//           setCounter(counter + 1)
//           setCounter(counter + 1)
//           setImageCounter(imageCounter + 1)
          
//     }
//   });

//   console.log(img, '====', imgFN)
//   setCounter(counter + 1)
//   setCounter(counter + 1)

// }

//  const deleteFromList = (_id) => {
//   console.log('_id: ', _id)
//   console.log('ImageList: ', ImageList)
//   setImageList(ImageList.filter(item => item.name !== _id));
//   setImage_Viewer(false)
//   setCounter(counter + 1)
// };




// const [img, setImg] = useState(null);
// const [imgFN, setImgFN] = useState('');

// let SelectHelper=()=>
// {
//   if(SelectedItem != -1)
//   {
//     setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[SelectedItem - 1])
//     setSelectHelperVisible(false)
//   }
//   else
//     setSelectHelperVisible(false)
// }

// let HelperSelection=(id)=>
// {
//   // console.log(id)
//   setSelectedItem(id)
//   SetNumOfHelper(id)

//   // console.log('~~~~~~~~~~~~~~~~~~~~~')
//   // setSelectHelperVisible(false)
  
//   switch(id)
//   {
//     case 0:
//       setHelperState([false, false, false, false, false])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//     case 1:
//       setHelperState([true, false, false, false, false])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//     case 2:
//       setHelperState([false, true, false, false, false])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//     case 3:
//       setHelperState([false, false, true, false, false])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//     case 4:
//       setHelperState([false, false, false, true, false])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//     case 5:
//       setHelperState([false, false, false, false, true])
//       setSelectedHelper(SelectedItem)
//     SetNumOfHelper(HelperTitle[id - 1])
//     setSelectHelperVisible(false)
//     return

//   }

  
// }

// let ImageSelectionVisible=()=>
// {
//   if(SelectedHelper == -1)
//     HelperSelection(0)

//   setSelectHelperVisible(true)
// }

// let SetMoveData = async(_address_of_pickup,
//                         _gps_of_pickup,
//                         _address_of_delivery,
//                         _gps_of_delivery,
//                         _move_type_id,
//                         _pickup_unit_number,
//                         _pickup_stairs,
//                         _pickup_elevator_building,
//                         _pickup_parking_info,
//                         _delivery_unit_Number,
//                         _delivery_stairs,
//                         _delivery_elevator_building,
//                         _delivery_parking_info,
//                         _date_of_pickup,
//                         _time_of_pickup,
//                         _move_images,
//                         _weight,
//                         _no_of_helpers,
//                         _description
//                         )=>{  
//                           try
//                           {
//   setLoader_Visible(true)

//   var param =new FormData();
//   param.append('user_id',LoginData.user_id)
//   param.append('address_of_pickup',_address_of_pickup)
//   param.append('gps_of_pickup',_gps_of_pickup)
//   param.append('address_of_delivery',_address_of_delivery)
//   param.append('gps_of_delivery',_gps_of_delivery)
//   param.append('move_type_id',_move_type_id)
//   param.append('pickup_unit_number',Number(_pickup_unit_number))
//   param.append('pickup_stairs',_pickup_stairs)
//   param.append('pickup_elevator_building',_pickup_elevator_building)
//   param.append('pickup_parking_info',_pickup_parking_info)
//   param.append('delivery_unit_Number',Number(_delivery_unit_Number))
//   param.append('delivery_stairs',_delivery_stairs)
//   param.append('delivery_elevator_building',_delivery_elevator_building)
//   param.append('delivery_parking_info',_delivery_parking_info)
//   param.append('date_of_pickup',_date_of_pickup)
//   param.append('time_of_pickup',_time_of_pickup)
//   if(_move_images.length > 0 )
//   param.append('pic1',_move_images[0].value)
//   if(_move_images.length > 1 )
//   param.append('pic2',_move_images[1].value)
//   if(_move_images.length > 2 )
//   param.append('pic3',_move_images[2].value)
//   if(_move_images.length > 3 )
//   param.append('pic4',_move_images[3].value)
//   if(_move_images.length > 4 )
//   param.append('pic5',_move_images[4].value)
//   param.append('weight',Number(_weight))
//   param.append('no_of_helpers',1)
//   param.append('description',_description)






 
//   // var params = {
//   //   user_id : LoginData.user_id,
//   //   address_of_pickup : _address_of_pickup,
//   //   gps_of_pickup : _gps_of_pickup,
//   //   address_of_delivery : _address_of_delivery,
//   //   gps_of_delivery : _gps_of_delivery,
//   //   move_type_id : _move_type_id,
//   //   pickup_unit_number : Number(_pickup_unit_number),
//   //   pickup_stairs : _pickup_stairs,
//   //   pickup_elevator_building : _pickup_elevator_building,
//   //   pickup_parking_info : _pickup_parking_info,
//   //   delivery_unit_Number : Number(_delivery_unit_Number),
//   //   delivery_stairs : _delivery_stairs,
//   //   delivery_elevator_building : _delivery_elevator_building,
//   //   delivery_parking_info : _delivery_parking_info,
//   //   date_of_pickup : _date_of_pickup,
//   //   time_of_pickup : _time_of_pickup,
//   //   move_images : _move_images,
//   //   weight : Number(_weight),
//   //   no_of_helpers : 1,//_no_of_helpers,
//   //   description : _description
    
//   // }
//   console.log(param)
//   var axiosConfig = {
//     // headers:{
//     //   // Access-Control-Allow-Origin : 'application/json',
//     //   'Content-Type': 'multipart/form-data',
//     // }
//    }
//   axios.post(APIMaster.URL+APIMaster.Move.CreateMove,param,axiosConfig)
//  .then((response)=> {
         
//          console.log('Accept',response.data)  
         
//          console.log('************')
   

//          if(response.data.status == 1)
//          {
//            Toast.show(response.data.message)
//          }

//         //     setUsername(response.data.username)
//         //     setEmailAddress(response.data.email)
//         //     setPhoneNumber(response.data.phone_number)
//         //     setZipCode(response.data.zip_code)

           



            
//         //  }
//         //   props.navigator.replace('ProfessionalDetails')
//         //     // setPerfessionalDetailNotApproved_Visible(true)
//         //  }
//         //  else if(response.data.status == 2)
//         //  {
//         //     // props.navigation.replace('Home')
//         //     setPerfessionalDetailNotApproved_Visible(true)
//         //  }
//         //  else
//         //  {
//         //    // Fetch Data and goto screen
//         //    props.navigator.replace('ProfessionalDetailsView')
//         //  }
//         setLoader_Visible(false)
        
//  })
//  .catch((error)=> {
//   setLoader_Visible(false)
//    console.log('Error : ',error)  
 
//  })
// }
// catch
// {
//   setLoader_Visible(false)
//   console.log('ERror Caatch')
// }
// }

// let DataValidation=()=>{

//   MoveData.weight = Weight
//   MoveData.no_of_helpers = SelectedHelper
//   // console.log(img.uri)
//   // console.log(img, '====', imgFN)
//   MoveData.move_images = img
//   MoveData.description = Description

//   SetMoveData(MoveData.address_of_pickup,
//               MoveData.gps_of_pickup,
//               MoveData.address_of_delivery,
//               MoveData.gps_of_delivery,
//               MoveData.move_type_id,
//               MoveData.pickup_unit_number,
//               MoveData.pickup_stairs,
//               MoveData.pickup_elevator_building,
//               MoveData.pickup_parking_info,
//               MoveData.delivery_unit_Number,
//               MoveData.delivery_stairs,
//               MoveData.delivery_elevator_building,
//               MoveData.delivery_parking_info,
//               MoveData.date_of_pickup,
//               MoveData.time_of_pickup,
//               ImageList,
//               MoveData.weight,
//               MoveData.no_of_helpers,
//               MoveData.description)

//   props.navigation.navigate('MyQoutes')

// }

// useEffect(()=>{
// console.log('Edit Move Data: ', EditMoveData.move_images)
// console.log('initial list: ', init_list)


//   if(_edit)
//   {
//     if(!init_list)
//     {
//       // setImageList(EditMoveData.move_images)
//       for(let i=0; i < EditMoveData.move_images.length; i++)
//       {
//         ImageList.push({name: imageCounter, value: EditMoveData.move_images.file_name})
//           ImageList.push({name: 0, value: ''})
//           // console.log('len: ', ImageList.length)
//           // console.log('list: ', ImageList)
//           // // console.log('Filter: ', ImageList.filter(item => item.name !== 0).length)
//           setCounter(counter + 1)
//           // setCounter(counter + 1)
//           setImageCounter(imageCounter + 1)
//       }
//       init_list = true
//     }

//     if(EditMoveData.move_images.length == 1)
//     {

//     }
//   }
//   console.log('Image List: ', ImageList)
//   // console.log('List Len : ', ImageList.length)

// }, [counter])

//   return (

//     <View style={styles.Container}>
      
//       <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Create Move'} 
//                LeftIconVisible = {true} RightIconVisible = {false}
//                LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
//                LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
//                LeftIconFunction = {()=>{props.navigation.goBack()}}
//                 />
//         <ScrollView>
//       <View style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//         <Text style = {styles._Text}>Other Details</Text>

//       </View>

//       {ImageList.length != 0 &&
//       <View style = {{width: '100%', height: hp('8%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
        
//         <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
//           <Text style = {styles._Text}>Upload Image</Text>
//         </View>
//         <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: '10%', backgroundColor: ColorPalet.MainBackground}}>
//           <Button b_Width = {'60%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.SignUpButton}
//                 b_BorderRadius = {30} b_Elevation = {3}
//                 t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
//                 t_ButtonTitle = {'Select'} t_Elevation = {3} 
//                 t_TextColor = {'white'} HasIcon = {false}
//                 Function = {()=>{launchCamera()}}/>
//         </View>
//       </View>
//       }
//       {ImageList.length > 0 &&
//       <View style = {{width: '100%', height:  hp('15%') , justifyContent: 'center', alignItems: 'center', marginLeft: hp('0.5%'), flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
//       {/* <View style = {{width: ImageList.length == 0 ? '0%': (ImageList.length == 1 ? '35%': '64%'), height: '100%', justifyContent: 'center', alignItems: 'center'}}> */}
      

//       <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15, backgroundColor: 'red'}}>
//       <FlatList 
//      data={ImageList}
//       contentContainerStyle={{flexWrap:'wrap',flexDirection:'row', backgroundColor: 'red'}}
//       renderItem={({item,index})=>{
//         return(
//         <View style={{flex:1,flexWrap:'wrap',flexDirection:'row'}}>
//           {item.name == 0 && index == ImageList.length - 1 && ImageList.filter(item => item.name != 0).length < 3 &&
//             <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderColor: ColorPalet.SignUpButton, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}
//               disabled= {ImageList.filter(item => item.name != 0).length < 3 ? false : true}
//             onPress = {()=>{launchCamera()}}>

//               <Icon name = {'plus'} color={ImageList.length >= 5? 'silver' : '#ECA017'} type = "font-awesome" size={40}/>

//             </TouchableOpacity>
//           }
//           {!item.name == 0 &&
//           <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}
//           onPress={()=>{selectedImageId = item.name
//             selectedImageUri = item.value
//             setImage_Viewer(true)}}>
//             <Image source = {{ uri : item.value }} resizeMode = 'center' style={{width: '90%', height: '90%'}}/>
//           </TouchableOpacity>
//       }
//       {_edit &&
//           <TouchableOpacity style = {{width: hp('15.5%'), height: hp('12%'), marginLeft: hp('1%'), marginTop: hp('1%'), borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}
//           onPress={()=>{selectedImageId = item._id
//             selectedImageUri = item.file_name
//             setImage_Viewer(true)}}>
//             <Image source = {{ uri : item.file_name }} resizeMode = 'center' style={{width: '90%', height: '90%'}}/>
//           </TouchableOpacity>
//       }

//     </View>
//        )
//       }
//       }
//     />

        
//       </View>
      
//       </View>
//       }
//       <View style = {{width: '100%', height: hp('40%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
      
//       <View style = {{width: '100%', height: '22.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
//         <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
//                     BorderColor = {'silver'} BorderRadius = {5}
//                     LocTitle = {'Weight (lbs.)'} LocTitleColor = {'#000'}
//                     Value = {Weight} IsTextBox = {true} FontSize = {wp('4%')}
//                     MultiLine = {false} OnChangeFunction = {SetWeight}/>
                    
//       </View>

//       <View style = {{width: '100%', height: '22.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
//         <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
//                     BorderColor = {'silver'} BorderRadius = {5}
//                     LocTitle = {'Number of Helper'} LocTitleColor = {'#000'}
//                     Value = {NumOfHelper} IsTextBox = {false} FontSize = {wp('4%')}
//                     OnPressFunction = {()=>ImageSelectionVisible()}
//                     HasIcon = {true} IconName = {'angle-down'} IconColor = {'#9B9B9B'} 
//                     IconType = {"font-awesome"} IconSize = {wp('7%')}/>
                    
//       </View>

//       <View style = {{width: '100%', height: '22.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
//         <BorderedTextBox BoxWidth = {'90%'} BoxHeight = {'85%'}
//                     BorderColor = {'silver'} BorderRadius = {5}
//                     LocTitle = {'Description / Special Instructions'} LocTitleColor = {'#000'}
//                     Value = {Description} IsTextBox = {true} FontSize = {wp('4%')}
//                     MultiLine = {false} OnChangeFunction = {SetDescription}/>
                    
//       </View>

//       <View style = {{width: '100%', height: '32.5%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
        
//         <Button b_Width = {'90%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
//                 b_BorderRadius = {15} b_Elevation = {3}
//                 t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
//                 t_ButtonTitle = {'Save & Continue'} t_Elevation = {3} 
//                 t_TextColor = {'white'} HasIcon = {false}
//                 Function = {()=>{DataValidation()}}/>
        
                    
//       </View>

      

//       </View>

//       <Modal style={{  marginHorizontal: wp('10%')}}
//           isVisible={SelectImageVisible}
//           onBackdropPress={() => setSelectImageVisible(true)}>

//           <View style={{width:wp('80%'), height: hp('25%'),   backgroundColor: '#C4C4C4'}}>

//             <View style = {{width: '100%', height: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//               <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
//                                 onPress = {()=>{setSelectImageVisible(false)}}>

//                 <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Take Picture</Text>

//               </TouchableOpacity>

//             </View>

//             <View style = {{width: '100%', height: '32%', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//               <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
//                                 onPress = {()=>{setSelectImageVisible(false)}}>

//                 <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Upload Picture</Text>

//               </TouchableOpacity>

//             </View>

//             <View style = {{width: '100%', height: '32%', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//               <TouchableOpacity style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}
//                                 onPress = {()=>{setSelectImageVisible(false)}}>

//                 <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

//               </TouchableOpacity>

//             </View>

//           </View>

//         </Modal>

//         <Modal style={{  marginHorizontal: wp('10%')}}
//           isVisible={SelectHelperVisible}
//           onBackdropPress={() => setSelectHelperVisible(false)}>

//           <View style={{width:wp('80%'), height: hp('45%'),   backgroundColor: '#C4C4C4'}}>

//             <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//               <Text style = {[styles._Text,{textAlignVertical: 'center'}]}>Number of Helper</Text>

//             </View>

//             <View style = {{width: '100%', height: '80%', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: ColorPalet.MainBackground}}>

//               <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
//                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Driver Only'} TextSize = {wp('4%')}
//                        Selected = {HelperState[0]} PaddingLeft = {30}  TextPaddingLeft = {10} 
//                        Function = {()=>HelperSelection(1)}/>

//               <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
//                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'One Helper'} TextSize = {wp('4%')}
//                        Selected = {HelperState[1]} PaddingLeft = {30}  TextPaddingLeft = {10} 
//                        Function = {()=>HelperSelection(2)}/>
              
//               <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
//                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Two Helper'} TextSize = {wp('4%')}
//                        Selected = {HelperState[2]} PaddingLeft = {30} TextPaddingLeft = {10} 
//                        Function = {()=>HelperSelection(3)}/>

//               <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
//                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Three Helper'} TextSize = {wp('4%')}
//                        Selected = {HelperState[3]} PaddingLeft = {30}  TextPaddingLeft = {10} 
//                        Function = {()=>HelperSelection(4)}/>

//               <RadioButton Width = {'60%'} RadioButtonDm = {22} RadioBorderColor = {'#6A6A6A'} RadioButtonColor = {'#6A6A6A'} 
//                        RadioButtonTextColor = {'#6A6A6A'} RadioBattunText = {'Four Helper'} TextSize = {wp('4%')}
//                        Selected = {HelperState[4]} PaddingLeft = {30}  TextPaddingLeft = {10} 
//                        Function = {()=>HelperSelection(5)}/>

//             </View>

//             {/* <View style = {{width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

//               <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//                 <Button b_Width = {'85%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
//                   b_BorderRadius = {15} b_Elevation = {3}
//                   t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
//                   t_ButtonTitle = {'Select'} t_Elevation = {3} 
//                   t_TextColor = {'white'} HasIcon = {false}
//                   Function = {()=>SelectHelper()}/>

//               </View>
//               <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

//                 <Button b_Width = {'85%'} b_Height = {'50%'} b_BackgroundColor = {ColorPalet.LoginButton}
//                   b_BorderRadius = {15} b_Elevation = {3}
//                   t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
//                   t_ButtonTitle = {'Cancel'} t_Elevation = {3} 
//                   t_TextColor = {'white'} HasIcon = {false}
//                   Function = {()=>setSelectHelperVisible(false)}/>

//               </View>

//             </View> */}

//           </View>

//         </Modal>

//         <Modal style={{  marginHorizontal: wp('15%')}}
//           isVisible={Loader_Visible}
//           // onBackdropPress={() => setLoader_Visible(false)}
//           >

//           <Loading_Data />

//         </Modal>

//         <Modal style={{  marginHorizontal: wp('5%')}}
//           isVisible={Image_Viewer}
//           onBackdropPress={() => setImage_Viewer(false)}>

          
//           <View style={{width: wp('90%'), height: 'auto', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
//           <View style={{width: wp('90%'), height: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
//           <Button b_Width = {35} b_Height = {35} b_BackgroundColor = {ColorPalet.SignUpButton}
//                   b_BorderRadius = {30} b_Elevation = {3}
//                   t_FontSize = {wp('5%')} t_FontWeight = {'bold'} 
//                   t_ButtonTitle = {'X'} t_Elevation = {3} 
//                   t_TextColor = {'white'} HasIcon = {false}
//                   Function = {()=>setImage_Viewer(false)}/>
//           </View>
//           <View style={{width: wp('90%'), height: '80%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end'}}>
//             <Image source = {{ uri : selectedImageUri }} resizeMode = 'center' style={{width: '100%', height: '100%'}}/>
//             {/* <Text>{selectedImageId}</Text> */}
//           </View>
//           <View style={{width: wp('90%'), height: '10%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
//           <Button b_Width = {'35%'} b_Height = {35} b_BackgroundColor = {ColorPalet.SignUpButton}
//                   b_BorderRadius = {30} b_Elevation = {3}
//                   t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
//                   t_ButtonTitle = {'Delete'} t_Elevation = {3} 
//                   t_TextColor = {'white'} HasIcon = {false}
//                   Function = {()=>deleteFromList(selectedImageId)}/>
//           </View>
//           </View>

//         </Modal>
//         </ScrollView>
//     </View>  
   
//    );
//  };

//  const styles = StyleSheet.create({
  
//   Container : {
//     flex : 1,
//     backgroundColor:  ColorPalet.DarkBackground
//   },
//   backgroundImage: {
//     height: hp('80%'),
//     backgroundColor: '#E9EAEF',
//     opacity : 100
//   },
//   Item: {
//     width: wp('100%'), 
//     height: hp('7%'), 
//     borderBottomColor: 'silver', 
//     borderBottomWidth: 1, 
//     flexDirection: 'row'
//   },
//   _Text : {
//     width: '100%',
//     textAlign: 'left',
//     fontSize : wp('4%'), 
//     fontWeight: '200', 
//     color: 'black',
//     paddingLeft: 30
//   },
//   picker: {
//     backgroundColor: '#E5E5E5'
//   }

//   });
 
//  export default CreateMove_Image;