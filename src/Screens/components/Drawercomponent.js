import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Alert, StyleSheet, ScrollView,View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {userLogOutAction} from '../Redux/authredux/AuthAction';
import {wp, hp} from '../components/Dimension';

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/MaterialIcons';
import { productImage } from '../utils/Constant';
import {withBadge, Icon} from 'react-native-elements'
import { profileImage } from '../../utils/Constant';

export function DrawerConent({navigation , props}) {
  const authSelector = useSelector(state => state.authReducer);
  const authDispatch = useDispatch();
  const authSignUpSelector = useSelector(state => state);
  const userDataSelector = useSelector(state => state.authReducer.getUserData);
  var profile= userDataSelector.profilePic
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  var cartLength = cartSelector.length;
  const  BadgedIcon = withBadge(cartLength)(Icon);
  /* console.log('this is required');
  console.log(authSignUpSelector.authReducer.signUpData); */
  var forSignOut = {...authSelector, isLogIn: false};
  
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {authSelector.authData &&
        authSelector.authData &&
        authSelector.authData.isLogIn ? (
          <View>
            <Avatar.Image
              size={80}
              style={{marginLeft: wp('7%'), marginVertical: hp('3%')}}
              source={{uri:`${profileImage}${profile}`}}
            />
            
          </View>
        ) : (
          <Text style={{fontSize: 50, fontWeight: 'bold', color: 'maroon'}}>
            NeoStore
          </Text>
        )}
        <View>
          <Drawer.Section>
            <Drawer.Item
              icon={() => <FontAwesome name="home" size={25} color="#00bfff" />}
              label="Home"
              active={false}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <MaterialCommunityIcons
                    name="account"
                    size={25}
                    color="#00bfff"
                  />
                )}
                label="My Account"
                active={false}
                onPress={() => {
                  navigation.navigate('MyAccount');
                }}
              />
            ) : (
              []
            )}

            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  name="table-furniture"
                  size={25}
                  color="#00bfff"
                />
              )}
              label="All Products"
              active={true}
              onPress={() => {
                navigation.navigate('allProduct');
              }}
            />

            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              <Drawer.Item
                icon={() => (
                  <BadgedIcon
            type="ionicon"
            name="cart"
          color="#00bfff"
            size={35} />
                )}
                label="Cart"
                active={false}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            ) : (
              []
            )}

            <Drawer.Item
              icon={() => (
                <Octicons name="list-unordered" size={25} color="#00bfff" />
              )}
              label="My Orders"
              active={false}
              onPress={() => {
                navigation.navigate('OrderHistory');
              }}
            />

            <Drawer.Item
              icon={() => (
                <Ionicons name="location-sharp" size={25} color="#00bfff" />
              )}
              label="Store Locator"
              active={false}
              onPress={() => {
                navigation.navigate('Locator');
              }}
            />
            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => <MaterialCommunityIcons
                  name="account"
                  size={25}
                  color="#00bfff" />}
                label="signup"
                active={false}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              />
            )}

            {authSelector.authData &&
            authSelector.authData &&
            authSelector.authData.isLogIn ? (
              []
            ) : (
              <Drawer.Item
                icon={() => (
                  <MaterialIcons name="login" size={25} color="#00bfff" />
                )}
                label="Login"
                active={false}
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      {authSelector.authData &&
      authSelector.authData &&
      authSelector.authData.isLogIn ? (
        <Drawer.Section>
          <Drawer.Item
            icon={() => (
              <Ionicons name="log-in-outline" size={25} color="#00bfff" />
            )}
            label="Sign Out"
            active={false}
            onPress={() => {
              authDispatch(userLogOutAction(forSignOut));
            }}
          />
        </Drawer.Section>
      ) : (
        []
      )}
    </View>
  );
}
