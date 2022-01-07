import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {wp, hp} from '../components/Dimension';
import {TextInputComponent} from '../components/TextInputComponent';

export const UpdateAddressScreen = () => {
  const [adres, setAdres] = useState({
    address: '',
    city: '',
    pinCode: '',
    state: '',
    country: '',
  });
  const authSelector = useSelector(state => state.authReducer);
  const token = authSelector.authData.token;
  
  const onAddressChange = address => {
    setAdres({...adres, address});
  };
  const onCityChange = city => {
    setAdres({...adres, city});
  };
  const onPinCodeChange = pinCode => {
    setAdres({...adres, pinCode});
  };
  const onStateChange = state => {
    setAdres({...adres, state});
  };
  const onCountryChange = country => {
    setAdres({...adres, country});
  };
  var pin = parseInt(adres.pinCode);
  const onAdddressSubmit = () => {
    if (
      adres.address.length != '' &&
      adres.city != '' &&
      adres.pinCode != '' &&
      adres.state != '' &&
      adres.country != ''
    ) {
      const address = new FormData();
      address.append('address', adres.address);
      address.append('pincode', pin);
      address.append('city', adres.city);
      address.append('state', adres.state);
      address.append('country', adres.country);
      console.log('=>', address);
      console.log('token=>', token);
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      axios
        .post(
          'https://nameless-savannah-21991.herokuapp.com/post_updateAddress',
          {
            address: {
              address: adres.address,
              pincode: pin,
              city: adres.city,
              state: adres.country,
              country: adres.country,
            },
          },
          config,
        )
        .then(function (response) {
          console.log('ADD CUSTOMER ADDRESS RESPONSE=>', response);
         
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          console.log(error.toJSON());
        });
    } else {
      console.warn('no');
    }
  };
  return (
    <View>
      <Text style={{color: 'black', fontSize: 30, alignSelf: 'center'}}>
        ADD ADDRESS
      </Text>
      <TextInputComponent
        label="Address"
        value={adres.address}
        onChangeText={value => {
          onAddressChange(value);
        }}
      />
      <TextInputComponent
        label="City"
        value={adres.city}
        onChangeText={value => {
          onCityChange(value);
        }}
      />
      <TextInputComponent
        label="Pincode"
        value={adres.pinCode}
        onChangeText={value => {
          onPinCodeChange(value);
        }}
      />
      <TextInputComponent
        label="State"
        value={adres.state}
        onChangeText={value => {
          onStateChange(value);
        }}
      />
      <TextInputComponent
        label="Country"
        value={adres.country}
        onChangeText={value => {
          onCountryChange(value);
        }}
      />

      <TouchableOpacity
        style={AddressStyl.submitpBtn}
        onPress={() => {
          onAdddressSubmit();
        }}>
        <Text style={AddressStyl.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const AddressStyl = StyleSheet.create({
  submitpBtn: {
    width: wp('85%'),
    height: hp('7%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
    backgroundColor: '#1e90ff',
    marginVertical: hp('2%'),
    alignSelf: 'center',
    borderRadius: wp('9%'),
  },
  submitBtnTxt: {
    fontSize: wp('6%'),
    padding: wp('0.8%'),
    color: 'white',
    borderRadius: hp('10%'),
    textAlign: 'center',
  },
});
