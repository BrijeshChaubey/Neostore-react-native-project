import React, {useState,useEffect} from 'react';
import {View, Text,Image, TouchableOpacity,  StyleSheet,ScrollView,} from 'react-native';
import {Checkbox,RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {TextInputComponent} from './components/TextInputComponent';
import {wp, hp} from './components/Dimension';
import {useDispatch, useSelector} from 'react-redux';


export const SignUp = ({navigation}) => {
  const [text, settext] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const authSignUpSelector = useSelector(state => state);
  const authSignUpDispatch = useDispatch();

  const [reload, setreload] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [gender, setgender] = React.useState('male');
  const [profileImage, setprofileImage] = React.useState({});

  const {firstName, lastName, email, phoneNumber, password, confirmPassword} =
    text;
  const handleOnChangeText = (value, fieldName) => {
    settext({...text, [fieldName]: value});
  };
  useEffect(() => {
    setreload(!reload);
  }, []);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofileImage(image);
    });
    /* this.setState({chhoseFile: 'chhoose'}); */
  };


  const onRegister = () => {
    console.log('arrive on register');
    console.log(text);

    var emailpattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var fNamePattern = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
    var lNamePattern = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/;
    if (
      emailpattern.test(text.email) === true &&
      fNamePattern.test(text.firstName) &&
      lNamePattern.test(text.lastName) &&
      text.phoneNumber != '' &&
      text.password != '' &&
      text.confirmPassword != '' &&
      text.password == text.confirmPassword
    ) {
      console.log('valid', text);
      console.log(gender);
      /*   console.log(profileImage); */
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;',
        }, 
      };

      const imageData = new FormData();
      imageData.append('firstName', text.firstName);
      imageData.append('secondName', text.lastName);
      imageData.append('contactNo', text.phoneNumber);
      imageData.append('email', text.email);
      imageData.append('password', text.password);
      imageData.append('gender', gender);
      imageData.append('profile-pic', {
        uri: profileImage.path,
        type: profileImage.mime,
        name: 'image.jpg',
        filename: '5quhhz.jpg',
      });

      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/register',
          
            imageData,
            config,
          )
          .then(function (response) {
            console.log('SIGNUP response=======>', response);
            console.log('success');
            var userData = {
              isLogIn: true,
              userFName: text.firstName,
              userLname: text.lastName,
            };
            navigation.navigate('Login');
          })
        
        .catch(function (error) {
          console.log('error', error);
        });
    } else {
      console.log('not valid');
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Text style={SignUpStyl.neostoreTxt}>NeoStore</Text>
      <TextInputComponent
        label="First Name"
        value={firstName}
        onChangeText={value => {
          handleOnChangeText(value, 'firstName');
        }}
      />

      <TextInputComponent
        label="Last Name"
        value={lastName}
        onChangeText={value => {
          handleOnChangeText(value, 'lastName');
        }}
      />

      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={value => {
          handleOnChangeText(value, 'email');
        }}
      />

      <TextInputComponent
        label="Phone number"
        value={phoneNumber}
        onChangeText={value => {
          handleOnChangeText(value, 'phoneNumber');
        }}
      />

      <TextInputComponent
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={value => {
          handleOnChangeText(value, 'password');
        }}
      />

      <TextInputComponent
        label=" Confirm Password"
        value={confirmPassword}
        onChangeText={value => {
          handleOnChangeText(value, 'confirmPassword');
        }}
      />
      <View style={SignUpStyl.selectGenger}>
      <Text style={SignUpStyl.genderText}>Select Gender</Text>
      <RadioButton
        value="male"
        status={gender === 'male' ? 'checked' : 'unchecked'}
        onPress={() => setgender('male')}
      />
      <Text style={SignUpStyl.genderText}>Male</Text>
      <RadioButton
        value="female"
        status={gender === 'female' ? 'checked' : 'unchecked'}
        onPress={() => setgender('female')}
      />
      <Text style={SignUpStyl.genderText}>Female</Text>
      </View>
      <TouchableOpacity
          onPress={() => {
            selectImage();
          }}>
          <Text style={{color: 'black', textAlign: 'center'}}>Upload Image</Text>
        </TouchableOpacity>
      <View style={SignUpStyl.agreeTerms}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <Text style={SignUpStyl.genderText}>agree terms and conditions</Text>
      </View>
    <TouchableOpacity
      style={SignUpStyl.signupBtn}
        onPress={() => {
          onRegister();
        }}>
        <Text
         style={SignUpStyl.signupBtnTxt} >
          Register
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    color: 'darkred',
    fontSize: 50,

    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
const SignUpStyl = StyleSheet.create({
  selectGenger: {
    paddingVertical: wp('2%'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  genderText: {
    fontSize: wp('5.5%'),
    color: 'black',
  },
  agreeTerms: {
    paddingVertical: wp('2%'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  neostoreTxt: {
    fontSize: wp('17%'),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'brown',
    marginVertical: hp('6%'),
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
});

