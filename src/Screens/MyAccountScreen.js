import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar, Appbar} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {hp, wp} from './components/Dimension';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {withBadge, Icon} from 'react-native-elements'

import axios from 'axios';

import { getUserProfile } from './Redux/authredux/AuthAction';
import {profileImage} from '../utils/Constant';

export const MyAccountScreen = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  var profile= userDataSelector.profilePic
  console.log('profile====>',profile);
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  var cartLength = cartSelector.length;
  const userDataDispatch = useDispatch();
  var token = authSelector.authData.token;
  const  BadgedIcon = withBadge(cartLength)(Icon);
  const isFocused = useIsFocused();
  React.useEffect(() => {
   
  }, [isFocused]);

  React.useEffect(() => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        var result = response.data.userData;
        console.log('profile response=>', result);
        userDataDispatch(getUserProfile(result));
      })
      .catch(function (error) {
        console.log('Profile error=>', error);
      });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: '#F5F5F5',
        height: hp('100%'),
      }}>
      <Appbar.Header style={{backgroundColor: 'white', fontSize: wp('2%')}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="Home" />
        <Appbar.Content title="Edit Profile" style={{}} />
      </Appbar.Header>
      <View style={MyAccountStyl.imageView}>
        <View style={MyAccountStyl.image}>
          <Avatar.Image size={110}
          source={{uri:`${profileImage}${profile}`}} />
        </View>

        <Text
          style={{
            alignSelf: 'center',
            fontSize: wp('5%'),
            color: 'black',
          }}>
          * {userDataSelector.firstName} 
          {'\n '} {userDataSelector.mobile} 
          {'\n'} {authSelector.authData.userEmail}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderHistory');
        }}>
        <View style={MyAccountStyl.card}>
          <FontAwesome
            name="first-order"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Order History</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <View style={MyAccountStyl.card}>
        <BadgedIcon
            type="ionicon"
            name="cart"
            size={35}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Cart</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ShippingAddress');
        }}>
        <View style={MyAccountStyl.card}>
          <Ionicons
            name="location-sharp"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Shipping Address</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}>
        <View style={MyAccountStyl.card}>
          <MaterialIcons
            name="edit"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Edit Profile</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <View style={MyAccountStyl.card}>
          <MaterialCommunityIcons
            name="lock-reset"
            color="black"
            size={30}
            style={MyAccountStyl.leftIcon}
          />
          <Text style={MyAccountStyl.text}>Change Password</Text>
          <AntDesign
            name="arrowright"
            color="black"
            size={30}
            style={MyAccountStyl.rightIcon}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const MyAccountStyl = StyleSheet.create({
  card: {
    marginHorizontal: wp('5%'),
    marginVertical: wp('4%'),
    width: wp('90%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  imageView: {
    display: 'flex',
    flexDirection: 'row',
  },
  leftIcon: {
    paddingTop: wp('6%'),
    paddingLeft: wp('6%'),
    alignSelf: 'flex-start',
  },
  text: {
    paddingLeft: wp('3%'),
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    width: wp('60%'),
  },
  rightIcon: {
    paddingTop: wp('6%'),
    alignItems: 'center',
  },
  image: {
    paddingHorizontal: wp('7%'),
    paddingVertical: wp('8%'),
  },
});
