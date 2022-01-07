import React, {useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {FAB, Appbar} from 'react-native-paper';
import {AddressCardComponent} from '../components/AddressCard';
import {useIsFocused} from '@react-navigation/native';
import {wp, hp} from '../components/Dimension';
import { getUserAddresses } from '../Redux/authredux/AuthAction';
import {useSelector,useDispatch} from 'react-redux';

export const ShippingAddressScreen = ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer);
  var token = authSelector.authData.token;
 const [addresses, setaddresses] = useState([]);
 const isFocused=useIsFocused();
 const addressDispatch = useDispatch();
 const addressSelector = useSelector(
  state => state.authReducer.userAddressesData,
);
console.log('addressSelector in shipping Address=>', addressSelector);
  React.useEffect(() => {
    getAddress();
  },[isFocused]);
  

  const getAddress = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getCustAddress', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('getCustAddress=>', response);
        console.log(response.data.Addresses);
        let data = response.data.Addresses;
        addressDispatch(getUserAddresses(data));
        // setaddresses(data);
        // console.log('ADDRESSDATA=>', data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={addressSelector}
        keyExtractor={item => item.id}
       
        renderItem={({item,index }) => (
          <AddressCardComponent
            address={item.address}
            pincode={item.pincode}
            city={item.city}
            state={item.state}
            country={item.country}
            addressId={item._id}
          />
        )}
      />
        <FAB
        style={ShippingAddressStyl.fab}
        large
        icon="plus"
        onPress={() => navigation.navigate('AddEditAddress')}
      /> 
      
    </View>
  );
};
const ShippingAddressStyl = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: hp('85%'),
    marginRight: hp('5%'),
  },
});
