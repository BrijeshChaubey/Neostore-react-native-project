import React, {useState} from 'react';
import {View, Text, TouchableOpacity,StyleSheet, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import {TextInputComponent} from './components/TextInputComponent';
import {wp, hp} from './components/Dimension';


export const ResetPassword = ({navigation}) => {
  
    const [code, setCode] = useState('');
  const [newpassword, setNewpassword] = useState('');

  const handleCode = code => {
    setCode(code);
  };
  const handlePassword = newpassword => {
    setNewpassword(newpassword);
  };

  const Reset = () => {
    console.log('reset');

    axios
      .post('https://nameless-savannah-21991.herokuapp.com/recoverPassword', {
        verificationCode: code,
        password: newpassword,
      })
      .then(function (response) {
        console.log('response', response);
        Alert.alert('password changed successfully');
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={styles.text}>Reset Password</Text>
      <TextInputComponent
        label="Enter code"
        value={code}
        onChangeText={code => {
          handleCode(code);
        }}
      />
      <TextInputComponent
        label="Enter New Password"
        value={newpassword}
        onChangeText={newpassword => {
          handlePassword(newpassword);
        }}
      />

      <TouchableOpacity
       style={SignUpStyl.signupBtn}
        onPress={() => {navigation.navigate("Login")
          Reset();
        }}>
        <Text
          style={SignUpStyl.signupBtnTxt}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 200,
    color: 'black',
    fontSize: 35,

    alignSelf: 'center',
    fontWeight: 'normal',
  },
});
const SignUpStyl = StyleSheet.create({
  genderText: {
    textAlign: 'center',
    fontSize: wp('5.5%'),
    color: 'black',
  },
  genderText2: {
    textAlign: 'center',
    marginTop:30,
    fontSize: wp('5.5%'),
    color: 'black',
  },
  signupBtn: {
    width: wp('85%'),
    height: hp('9%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  signupBtnTxt: {
    fontSize: wp('8%'),
    paddingVertical: hp('0.9%'),
    paddingHorizontal: wp('20%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
  neostoreTxt: {
    fontSize: wp('17%'),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'brown',
    marginVertical: hp('6%'),
  },
  });

