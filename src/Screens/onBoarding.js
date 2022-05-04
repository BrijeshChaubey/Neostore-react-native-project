import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,Image
  } from 'react-native';
import {Appbar, Card, Divider, Button, Title} from 'react-native-paper';
export const Onboardingscreen =({navigation})=>{
 const Done =({}) =>(
     <Button
     title="Lets get started"
     color="#000000"
   />  
 )   
return(    
<Onboarding
DoneButtonComponent={Done}
onSkip={() => navigation.replace("Login")}
onDone={() => navigation.navigate("Login")}
  pages={[
    {
      backgroundColor: '#ff00ff',
      image: <Image source={require('./assets/onboard2.1.jpg')}
       />,
      
      title: 'always available',
      subtitle: 'Better way of shopping',
    },
    {
        backgroundColor: '#DC143C',
        image: <Image source={require('./assets/onboard4.jpg')} />,
        
        title: 'wide range of electronics',
        subtitle: 'New and genuine goods and electronics',
      },
      {
        backgroundColor: '#EE82EE',
        image: <Image source={require('./assets/onboard1.png')} />,
        title: 'Easy to buy',
        subtitle : 'Experience whole new way of shopping',
      },  
  ]}
/>
)}