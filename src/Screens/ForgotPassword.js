import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import axios from 'axios';
import {TextInputComponent} from './components/TextInputComponent';
import {wp, hp} from './components/Dimension';

export const ForgotPassword = ({navigation}) => {
  const [forgotPass, setforgotPass] = useState('');
  var code=[];
    
 
  
  const onSubmit = () => {
    console.log('forgotPass');
  
  axios

 .post('https://nameless-savannah-21991.herokuapp.com/forgotPassword',{

 

 email: forgotPass,


  

 }) 
 .then(function (response) {
    console.log('response', response);
    navigation.navigate("ResetPassword")
    code=response.data.code;
   console.log('code=>', code);


 })

.catch(function (error) { 
 console.log('error', error);

 });
  
}; 
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={styles.text}>forgot Password ?</Text>
      <TextInputComponent
        label="email"
        value={forgotPass}
        onChangeText={value => {
            setforgotPass(value,);
        }}
      />
       <TouchableOpacity
       style={SignUpStyl.signupBtn}
        onPress={() => {
          onSubmit();
        }}>
        <Text style={SignUpStyl.signupBtnTxt}>
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


