import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {defaultUserAddress} from '../Redux/authredux/AuthAction';
import {useDispatch} from 'react-redux';
import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {wp, hp} from './Dimension';

export const AddressCardComponent = ({
  
  addressId,
  address,
  pincode,
  city,
  state,
  country,
}) => {
  const navigation = useNavigation();
  const defaultAddressDispatch = useDispatch();
  return (
    <View style={{flex:1 }} >
      <Card
        style={{
          borderRadius: wp('5%'),
          marginVertical: hp('1.5%'),
          marginHorizontal: hp('1%'),
        }}>
        <Card.Content>
          <Text style={{color:'black'}}>{address}</Text>
          <Text style={{color:'black'}}>{pincode}</Text>
          <Text style={{color:'black'}}>{city}</Text>
          <Text style={{color:'black'}}>{state}</Text>
          <Text style={{color:'black'}}>{country}</Text>

          <Divider
            style={{
              backgroudColor: 'black',
              height: 3,
              borderColor: 'black',
              marginVertical: hp('3%'),
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              icon="delete"
              mode="outlined"
              onPress={() => navigation.navigate('EditAddress',{
                addressId: addressId,
                  address: address,
                  pincode: pincode,
                  city: city,
                  state: state,
                  country: country,
              })}
              style={{
                backgroundColor: 'white',
                width: wp('30%'),
              }}>
              Edit
            </Button>
            <Button
              icon="delete"
              mode="outlined"
              onPress={() => console.log('Pressed')}
              style={{
                backgroundColor: 'white',
                width: wp('30%'),
              }}>
              Delete
            </Button>
            <View>
              <TouchableOpacity
              onPress={()=>{
               var result ={
                addressId: addressId,
                address: address,
                pincode: pincode,
                city: city,
                state: state,
                country: country,
               };
               defaultAddressDispatch(defaultUserAddress(result));
               navigation.navigate('PlaceOrder') 
              }}>
              <Text
              style={{
                alignSelf:'center',
                paddingTop:wp('2%'),
                color:'green',
                fontSize:wp('4%'),
              }}>Defaul address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
