import React from 'react';

import {ProductDetailsScreen} from './ProductDetails'
import {SignUp} from './RegisterPage';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
import { ForgotPassword } from './ForgotPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from './Dashboard';
import { NavigationContainer } from '@react-navigation/native';
import{MyAccountScreen} from './MyAccountScreen'
import{EditProfileScreen} from './My accountscreen/EditProfile'
import{ ShippingAddressScreen} from './My accountscreen/ShippingAddress'
import {AddEditAddressScreen} from './My accountscreen/AddAddress';
import{DrawerConent} from './components/Drawercomponent'
import {ChangePassword} from './My accountscreen/ChangePassword'
import { Cartscreen } from './My accountscreen/Cart';
import { LocationScreen } from './My accountscreen/StoreLocator';
import { allProductScreen } from './My accountscreen/allProducts';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import { PlaceOrderScreen } from './PlaceOrder';
import {OrderConfirmedScreen} from './OrderConfirmed';
import { OrderHistoryScreen } from './My accountscreen/OrderHistory';
import { OrderDetailsScreen } from './My accountscreen/OrderDetails';
import {ProfileViewScreen} from './components/ProfileView'
import {EditAddressScreen} from './components/EditAddress';
import {AddressCardComponent} from './components/AddressCard'
import {DashboardProfileViewScreen} from './components/DasboardProfileView'
import { Onboardingscreen } from './onBoarding';
import { SplashScreen } from './SplashScreen';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackScreen = createStackNavigator();

const HomeStack = () => {
  return (
    
           
      <Drawer.Navigator drawerContent={props => <DrawerConent {...props} />}>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="Login" component={Login} />
        
        <Drawer.Screen name="Drawercomponent" component={DrawerConent} />
         {/*  NAVIGATION INSIDE MY ACCOUNT */}
      <Drawer.Screen name="MyAccount" component={MyAccountScreen} />
      {/* <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} /> */}
      <Drawer.Screen name="ShippingAddress" component={ShippingAddressScreen} />
      <Drawer.Screen name="allProduct" component={allProductScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
      <Drawer.Screen name="ChangePassword" component={ ChangePassword} />
      <Drawer.Screen name="AddEditAddress" component={AddEditAddressScreen} />
      <Drawer.Screen name="EditAddress" component={EditAddressScreen} />
      <Drawer.Screen name="Cart" component={Cartscreen} />
      <Drawer.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Drawer.Screen name="Locator" component={LocationScreen } />
      <Drawer.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <Drawer.Screen name="OrderConfirmed" component={OrderConfirmedScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Drawer.Screen name="ProfileView" component={ProfileViewScreen} />
      <Drawer.Screen name="AddressCard" component={AddressCardComponent} />
      <Drawer.Screen name="DasboardProfileView" component={DashboardProfileViewScreen} />
      </Drawer.Navigator> 
    
  );
};
const AuthStack = () => {
  return (
   <StackScreen.Navigator screenOptions={{headerShown: false}}>
          <StackScreen.Screen name="SplashScreen" component={SplashScreen} />
          <StackScreen.Screen name="onBoarding" component={ Onboardingscreen } />
      <StackScreen.Screen
        name="Login"
        component={Login}
        // drawerContent={props => <DrawerContent {...props} />}
      />
      
      {/* <StackScreen.Screen name="Login" component={Login} /> */}
      <StackScreen.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <StackScreen.Screen name="Drawercomponent" component={DrawerConent} />
      <StackScreen.Screen name="ResetPassword" component={ResetPassword} />
      <StackScreen.Screen name="SignUp" component={SignUp} />
    </StackScreen.Navigator>
  );
};
export const MainNavigation = () => {
  const authReducer = useSelector(state => state.authReducer);
  console.log(authReducer.authData);
  return (
    <NavigationContainer>
      {authReducer.authData &&
      authReducer.authData &&
      authReducer.authData.isLogIn ? (
        <HomeStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
