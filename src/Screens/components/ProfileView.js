import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Avatar, Appbar,Card} from 'react-native-paper';
import {wp, hp} from '../components/Dimension';
import { profileImage } from '../../utils/Constant';
export const ProfileViewScreen = ({route, navigation}) => {
const {propic} = route.params; 
return (
    <View style={{backgroundColor: 'black', flex: 1}}> 
    <Appbar.Header style={{backgroundColor: 'black'}}>
    
    <Appbar.BackAction
    onPress={() => {
    navigation.goBack();
    }}
    />
    <Appbar.Content
    style={{alignItems: "center"}}
    title="Profile Picture"
    />
    </Appbar.Header>
    
    <Card.Cover
    
    source={{uri: `${profileImage}${propic}`}}
    resizeMode="contain" 
    style={ProductDetailstyl.image}
    size={150}
    /> 
    </View>
);
};
const ProductDetailstyl = StyleSheet.create({
    
    image: {
    
    alignSelf: "center",
    
    marginVertical: hp('5%'),
    
    marginTop: hp('28%'),
    
    width: wp('100%'),
    
    height: hp('45%'),
    },  
});