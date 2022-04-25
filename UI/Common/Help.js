import React, { useRef } from 'react';
import {View,
        StyleSheet, 
        Linking
} from 'react-native';
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ContactInfo from '../../Components/ContactInfo';
import HelpItem from '../../Components/HelpItem';
import Headers from '../../Components/Headers'
import { Drawer } from 'native-base';
import Sidebar from '../Common/Sidebar';
import { ColorPalet } from '../../Header/Header';

const Help = (props) => {

  let drawer=useRef(null)
  let openDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.open()
  }

  let closeDrawer=()=>{
    if(drawer != null && drawer.current !=null && drawer.current._root != null )
    drawer.current._root.close()
  }

  return (

    <Drawer ref={ drawer }  type='displace' side='left' 
    content={<Sidebar navigator={props.navigation}   closeItem = {()=> closeDrawer()}/>}
      onClose={() => closeDrawer()} > 


      <View style={styles.Container}>

        <Headers HeaderHeight = {hp('6.5%')} HeaderTitle = {'Help'} 
                  LeftIconVisible = {true} RightIconVisible = {false}
                  LeftIconName = {'menu'} LeftIconColor = {'#FFF'}
                  LeftIconType = {'material-community'} LeftIconSize = {wp('6%')}
                  LeftIconFunction = {()=>{openDrawer()}} />

          <ContactInfo SupportEmail = {'support@pikpakapp.com'}/>

          <HelpItem Title = {'FAQ'}
                    Function = {()=>{Linking.openURL('http://pikpakapp.com/faqs/').catch(err => console.error('Error', err));}}/>

          <HelpItem Title = {'End User License Agreement'}
                    Function = {()=>{Linking.openURL('http://pikpakapp.com/end-user-license-agreement/').catch(err => console.error('Error', err));}}/>

          <HelpItem Title = {'Refund Policy'}
                    Function = {()=>{Linking.openURL('https://pikpakapp.com/refund-policy/').catch(err => console.error('Error', err));}}/>

          <HelpItem Title = {'Terms of Service'}
                    Function = {()=>{Linking.openURL('https://pikpakapp.com/terms-of-service/').catch(err => console.error('Error', err));}}/>

          <HelpItem Title = {'Rating Policy'}
                    Function = {()=>{Linking.openURL('https://pikpakapp.com/rating-policy/').catch(err => console.error('Error', err));}}/>

      </View>  
    </Drawer>
   );
 };

const styles = StyleSheet.create({
  
  Container : {
    flex : 1,
    backgroundColor: ColorPalet.DarkBackground
  },
  backgroundImage: {
    height: hp('100%'),
    backgroundColor: '#ABABAB',
    opacity : 100
  }

});
 
export default Help;