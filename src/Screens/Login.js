import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputComponent} from './components/TextInputComponent';
import {wp, hp} from './components/Dimension';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import{userLogInAction} from './Redux/authredux/AuthAction'


export const Login = ({navigation}) => {
  const authSelector = useSelector(state => state);
  /* console.log(authSelector); */
  console.log('arrived');
  const authDispatch = useDispatch();

  const [text, settext] = useState({
    email: '',
    password: '',
  });

  const {email, password} = text;

  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };

  const onLogin = () => {
    console.log('arrive on Login');

    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (emailpattern.test(text.email) === true) {
      axios
        .post('https://nameless-savannah-21991.herokuapp.com/login', {
          email: text.email,
          password: text.password,
        })
        .then(function (response) {
          console.log('LOGIN response=======>', response);
          var result = response.data;
          const {message, userId, token} = result;

          result = {...result, isLogIn: true, userName: text.email};
          console.log('result=>', result);

          authDispatch(userLogInAction(result));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log('not valid');
      console.warn('invalid input');
    }
  };

  return (
    <ScrollView>
      <View style={Loginstyles.container}>
        <Text style={Loginstyles.neostoreTxt}>NeoStore</Text>
        <TextInputComponent
          label="Username"
          value={email}
          helperText={'yes'}
          onChangeText={value => {
            handleOnChangeText(value, 'email');
          }}
        />

        <TextInputComponent
          label="Password"
          value={password}
          
          onChangeText={value => {
            handleOnChangeText(value, 'password');
          }}
        />

        <TouchableOpacity
          onPress={() => {
            console.log('onlogin press');
            onLogin();
          }}
          style={Loginstyles.loginBtn}>
          <Text style={Loginstyles.loginBtnTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={Loginstyles.signupTxt}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={Loginstyles.signupTxt}>
            Don't have an account ? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  neostoreTxt: {
    fontSize: wp('17%'),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'maroon',
    marginVertical: hp('5%'),
  },
  loginBtn: {
    width: wp('80%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  loginBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('1%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  signupTxt: {
    fontSize: wp('5%'),
    marginVertical: wp('2%'),
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
