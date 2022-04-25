import React, { useEffect, useState } from 'react';
import {View,
  Text,
  StyleSheet, FlatList, TouchableOpacity, ScrollView,Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ColorPalet} from '../../Header/Header';
import Headers from '../../Components/Headers';
import Modal from 'react-native-modal';
import UpDownValue from '../../Components/UpDownValue';
import Button from '../../Components/Button';
import CalendarPicker from 'react-native-calendar-picker';
import { EditMoveData, MoveData } from '../../Redux/MoveData';
import Toast from 'react-native-simple-toast';
import moment from 'moment';



const CreateMove_DateTime = (props) => {

  const [SelectedStartDate, setSelectedStartDate] = useState(null)
  const [TimePickerVisible, setTimePickerVisible] = useState(false)
  const [SelectedTime, setSelectedTime] = useState('')
  const [Middy, SetMiddy] = useState(true)
  const [Hour, SetHour] = useState(0)
  const [Minute, SetMinute] = useState(0)
  const [DisplayTime, setDisplayTime] = useState('')

  const minDate = new Date()
  const [selectedDate, setSelectedDate] = useState(EditMoveData.date_of_pickup == '' ? new Date(1986, 9, 30) : new Date(EditMoveData.date_of_pickup.substring(0, 4), EditMoveData.date_of_pickup.substring(5, 7) - 1, EditMoveData.date_of_pickup.substring(8, 10)))
  let sdate

  const CalenPicker = React.useRef(null)

  const _edit = props.navigation.state.params._edit

  let customDatesStyles = [];
  const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = (new Date().getMonth() + 1);
    console.log('new Date().getMonth() + 1).length',month.toString().length)
    if(month.toString().length ==1)
    {
    month = '0'+month;
    }
   
   
    var year = new Date().getFullYear();

    return year + '-' + month + '-' + date;
}

  useEffect(()=>{
    
    

   // if(props.navigation.getParam('_edit') == true)
    {
      console.log('date: ', EditMoveData.date_of_pickup)
      console.log('Hour: ', EditMoveData.date_of_pickup.substring(0, 4))
      console.log('Min: ', EditMoveData.date_of_pickup.substring(5, 7))
      console.log('Hour: ', EditMoveData.date_of_pickup.substring(8, 10))

      // CalenPicker.current.handleOnPressDay(2021,11,18)
      let yyyy = Number(EditMoveData.date_of_pickup.substring(0, 4))
      let mm = Number(EditMoveData.date_of_pickup.substring(5, 7))
      let dd = Number(EditMoveData.date_of_pickup.substring(8, 10))

      sdate = new Date(yyyy, mm, dd)
    
      setDisplayTime(EditMoveData.time_of_pickup)
      
      GetCustomTime(EditMoveData.time_of_pickup)
      var date1 = moment(EditMoveData.date_of_pickup);
      console.log('date1: ', date1,sdate)
      onDateChange2(date1)
      // if(EditMoveData.date_of_pickup!='')
      // {
      //   setSelectedStartDate(EditMoveData.date_of_pickup)
      // }
      // setSelectedStartDate(date1)
      // sdate=  EditMoveData.date_of_pickup !='' ?date1:sdate
      // MoveData.date_of_pickup= sdate
      console.log('date2: ', SelectedStartDate)

        //  if(EditMoveData.date_of_pickup <= getCurrentDate())
        //  {
        //    Alert.alert('test',getCurrentDate())
        //  }


      // setSelectedDate(date1)

      // setSelectedDate(new Date(Number(EditMoveData.date_of_pickup.substring(0, 4)), 
      // Number(EditMoveData.date_of_pickup.substring(5, 7)), 
      // Number(EditMoveData.date_of_pickup.substring(8, 10))))
      
    }
    

    },[])

  let GetCustomTime=(_time_str)=>
  {

    var hours = _time_str.substring(0, 2);
    var min = _time_str.substring(3, 5);
    var middy = _time_str.substring(6, 8)

    SetHour(hours)
    SetMinute(min)
    SetMiddy(middy == 'AM' ? true : false)
    setDisplayTime(hours + ':' + min + '-' + middy)
    setSelectedTime(hours + ':' + min + ' ' + middy)
      
  }

  let GetCurrentTime=()=>
  {

    var hours = new Date().getHours();
    var min = new Date().getMinutes();

    if(hours > 11)
    {
      SetMiddy(false)
      SetHour(hours - 12)
    }
    else
    {
      SetMiddy(true)
      SetHour(hours)
    }

    SetMinute(min)
  }

  let ChangeHour=(_operator)=>
  {
    if(_operator == '+')
    {
        if(Hour == 11)
          SetHour(0)
        else
          SetHour(Hour + 1)
    }
    else
    {
      if(Hour == 0)
          SetHour(11)
        else
          SetHour(Hour - 1)
    }  
  }

  let ChangeMinute=(_operator)=>
  {
    if(_operator == '+')
    {
        if(Minute == 59)
          SetMinute(0)
        else
          SetMinute(Minute + 1)
    }
    else
    {
      if(Minute == 0)
          SetMinute(59)
        else
          SetMinute(Minute - 1)
    }
  }

  let ChangeMidday=()=>
  {
    SetMiddy(!Middy)
  }


  let onDateChange2=(date)=> {
    setSelectedStartDate(date)

    console.log('selected start date',date)
  }

  let GetSelectedTime = ()=>
  {
    setSelectedTime(Hour.toString() + ':' + Minute.toString() + ' ' + Middy.toString())
    console.log(Hour.toString() + ':' + Minute.toString() + ' ' + Middy.toString())
    setTimePickerVisible(false)
    setDisplayTime(padLeadingZeros(Hour, 2) + ':' + padLeadingZeros(Minute, 2) + '-' + (Middy ? 'AM' : 'PM'))
  }

  let LoadTimePicker=()=>{
    GetCurrentTime()
    setTimePickerVisible(true)
  }
  

  function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

  let DataValidation=()=>{
   
    MoveData.time_of_pickup = DisplayTime
    console.log('Time: ', DisplayTime)
    if(props.navigation.getParam('_edit') == true)
    {
      console.log('Time: EditMoveData.date_of_pickup.toString()', EditMoveData.date_of_pickup)
      if(EditMoveData.date_of_pickup != 'undefined-NaN-undefined')
      {
      if(EditMoveData.date_of_pickup >= getCurrentDate())
      {
      EditMoveData.time_of_pickup = DisplayTime
      console.log('Time: SelectedStartDate', SelectedStartDate)
      // console.log('MDate: ', MoveData.date_of_pickup)
      if(SelectedStartDate._i.year != undefined)
      {
        EditMoveData.date_of_pickup = SelectedStartDate._i.year + '-' +
        padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
        padLeadingZeros(SelectedStartDate._i.day, 2)
console.log('Date EditMoveData.date_of_pickup : ',SelectedStartDate._i.year , EditMoveData.date_of_pickup)
    
    props.navigation.push('CreateMove_Image', { _edit: true, _image_list: EditMoveData.move_images}) 
      }
      else if (EditMoveData.date_of_pickup!='')
      {
         props.navigation.push('CreateMove_Image', { _edit: true, _image_list: EditMoveData.move_images})
       
      }
      else
      {
        Toast.show('Please Select Time.')
      }

    }
    else  if(SelectedStartDate != null)
    {
    EditMoveData.time_of_pickup = DisplayTime
    
    // console.log('MDate: ', MoveData.date_of_pickup)
    if(SelectedStartDate != null)
    {
      EditMoveData.date_of_pickup = SelectedStartDate._i.year + '-' +
      padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
      padLeadingZeros(SelectedStartDate._i.day, 2)
console.log('Date: ', SelectedStartDate._i.year + '-' +
  padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
  padLeadingZeros(SelectedStartDate._i.day, 2))
  props.navigation.push('CreateMove_Image', { _edit: true, _image_list: EditMoveData.move_images}) 
    }
    else
    {
      Toast.show('Please Select Time.')
    }
  }
  else
    {
      Toast.show('Please Select New Date,Your Current Date is Out Date.', Toast.LONG)
    }
  }
  else
  {
    console.log('testyyyy',SelectedStartDate)
    EditMoveData.time_of_pickup = DisplayTime
    
    // console.log('MDate: ', MoveData.date_of_pickup)
    if(SelectedStartDate != null && SelectedStartDate.toString() != 'Invalid date')
    {
      EditMoveData.date_of_pickup = SelectedStartDate._i.year + '-' +
      padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
      padLeadingZeros(SelectedStartDate._i.day, 2)
console.log('Date: ', SelectedStartDate._i.year + '-' +
  padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
  padLeadingZeros(SelectedStartDate._i.day, 2))
  console.log(' EditMoveData.date_of_pickup', EditMoveData.date_of_pickup)
  props.navigation.push('CreateMove_Image', { _edit: true, _image_list: EditMoveData.move_images}) 
    }
    else
    {
      Toast.show('Please Select Date.')
    }
  }
    }
    else
    {
      if(SelectedStartDate != null)
      {
        MoveData.date_of_pickup = SelectedStartDate._i.year + '-' +
        padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
        padLeadingZeros(SelectedStartDate._i.day, 2)
console.log('Date: ', SelectedStartDate._i.year + '-' +
    padLeadingZeros(SelectedStartDate._i.month + 1, 2) + '-' +
    padLeadingZeros(SelectedStartDate._i.day, 2))
    props.navigation.push('CreateMove_Image', { _edit: false, _image_list: EditMoveData.move_images})
      }
      else
      {
        Toast.show('Please Select Time.')
      }
    }
    
    

  }

  return (

    <View style={styles.Container}>
      
      <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Date and Time'} 
               LeftIconVisible = {true} RightIconVisible = {false}
               LeftIconName = {'angle-left'} LeftIconColor = {'#FFF'}
               LeftIconType = {'font-awesome'} LeftIconSize = {wp('7%')}
               LeftIconFunction = {()=>{props.navigation.goBack()}}
                />

        <ScrollView>

        <View style = {{width: '100%', height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

          <Text style = {styles._Text}>Scheduled Date and Time</Text>

        </View>

        <View style = {{width: '100%', height: hp('8%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>
        
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>
            {/* <Text style = {styles._Text}>Pik Up Time</Text> */}
            <Text style = {{width: '100%', textAlign: 'left', fontSize : SelectedTime != '' ? wp('3%') : wp('4%'), fontWeight: '200', color: 'black', paddingLeft: 30}}>Pick Up Time</Text>
            {SelectedTime != '' &&
            <Text style = {{width: '100%', textAlign: 'left', fontSize : wp('3.5%'), fontWeight: '200', color: '#9B9B9B', paddingLeft: 30}}>{DisplayTime.toString()}</Text>
            }
          </View>
          <View style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: '10%', backgroundColor: ColorPalet.MainBackground}}>
            <Button b_Width = {'60%'} b_Height = {'65%'} b_BackgroundColor = {ColorPalet.SignUpButton}
                  b_BorderRadius = {30} b_Elevation = {3}
                  t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                  t_ButtonTitle = {'Select'} t_Elevation = {3} 
                  t_TextColor = {'white'} HasIcon = {false}
                  Function = {()=>LoadTimePicker()}/>
          </View>
        </View>

        <View style = {{width: '100%', height: hp('55%'), justifyContent: 'flex-start', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
           

        <CalendarPicker
          ref = {CalenPicker}
          customDatesStyles={[{
            date: selectedDate,
            style: {backgroundColor: '#4cc9f0'}
          }]}
          onDateChange={(v)=>onDateChange2(v)}
          minDate={minDate}
          // initialDate= {SelectedStartDate}
          selectedDayColor='#FF4181'
          selectedDayTextColor= '#FFF'
        />


        </View>

        


      <View style = {{width: '100%', height: hp('12%'), justifyContent: 'center', alignItems: 'center', marginTop:hp('1%'), backgroundColor: ColorPalet.MainBackground}}>
        
        <Button b_Width = {'90%'} b_Height = {'55%'} b_BackgroundColor = {ColorPalet.LoginButton}
                b_BorderRadius = {15} b_Elevation = {3}
                t_FontSize = {wp('4%')} t_FontWeight = {'bold'} 
                t_ButtonTitle = {'Save & Continue'} t_Elevation = {3} 
                t_TextColor = {'white'} HasIcon = {false}
                Function = {()=>{DataValidation()}}/>

        </View>
      
      </ScrollView>

      <Modal style={{  marginHorizontal: wp('10%')}}
          isVisible={TimePickerVisible}
          onBackdropPress={() => setTimePickerVisible(true)}>

          <View style={{width:wp('80%'), height: hp('35%'),   backgroundColor: ColorPalet.MainBackground}}>

            <View style = {{width: '100%', height: '80%', borderBottomColor: '#EEEEEE', borderBottomWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {padLeadingZeros(Hour, 2)}
                              UpKeyFunction = {()=>{ChangeHour('+')}}
                              DownKeyFunction = {()=>{ChangeHour('-')}}/>
                  
              </View>

              <View style = {{width: '2%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                <Text style = {[styles._Text,{color: '#787878', paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center', fontSize: wp('6%'), fontWeight: 'bold'}]}>:</Text>

              </View>

              <View style = {{width: '31.5%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                 <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {padLeadingZeros(Minute, 2)}
                              UpKeyFunction = {()=>{ChangeMinute('+')}}
                              DownKeyFunction = {()=>{ChangeMinute('-')}}/>
              </View>
              
              <View style = {{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorPalet.MainBackground}}>

                 <UpDownValue IconType = {"font-awesome"} IconColor = {'#AEAEAE'} IconSize = {wp('10%')}
                              UpIconName = {'caret-up'} DownIconName = {'caret-down'} 
                              Value = {Middy?'AM':'PM'}
                              UpKeyFunction = {()=>{ChangeMidday()}}
                              DownKeyFunction = {()=>{ChangeMidday()}}/>
              </View>

            </View>

            <View style = {{width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}>

              <TouchableOpacity style = {{width: '50%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{setTimePickerVisible(false)}}>

                <Text style = {[styles._Text,{paddingLeft: 0, textAlign: 'center', textAlignVertical: 'center'}]}>Cancel</Text>

              </TouchableOpacity>

              <TouchableOpacity style = {{width: '50%', height: '100%', borderLeftColor: '#EEEEEE', borderLeftWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: ColorPalet.MainBackground}}
                                onPress = {()=>{GetSelectedTime()}}>

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
 
 export default CreateMove_DateTime;