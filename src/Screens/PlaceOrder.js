import axios from 'axios';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  
} from 'react-native';
import {Appbar,Button} from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import {useSelector,useDispatch} from 'react-redux';
import {wp, hp} from './components/Dimension';
import {defaultUserAddress} from './Redux/authredux/AuthAction';
import {PlaceOrderCard} from './components/PlaceOrderCard';

export const PlaceOrderScreen = ({route, navigation}) => {
  const defaultAddressDispatch = useDispatch();
  const defaultAddressSelector = useSelector(
    state => state.authReducer.defaultAddress,
  );
  const [defaultAddress, setdefaultAddress] = useState([]);
  const [checkOut, setcheckout] = useState([]);
  const [checkOutId, setcheckoutId] = useState('');
   const [totalPrice, settotalPrice] = useState('');
  const authSelector = useSelector(state => state.authReducer.authData);
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  const userDateSelector=useSelector(state => state.authReducer.getUserData);
  var fName =userDateSelector.firstName;
  var lName =userDateSelector.secondName
  console.log();
  var cartId =cartSelector._id;
  var token = authSelector.token;
  var isFocused = useIsFocused();
 
  React.useEffect(() => {
    getAddresses();
    proceedToChecKOut();
  }, [isFocused]);

  const getAddresses = () => {
    console.log(token);
    console.log('id=>', cartId);
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/proceedToBuy', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('place order screen  get addresses response', response);
        let data = response.data.Addresses[0];
        setdefaultAddress(data);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  const proceedToChecKOut = () => {
    console.log('Cartid=>', cartId);
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>>>>>',
      defaultAddressSelector.address,
      defaultAddressSelector.pincode,
      defaultAddressSelector.city,
      defaultAddressSelector.state,
      defaultAddressSelector.country,
    );
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
    .post(
      `https://nameless-savannah-21991.herokuapp.com/proceedToCheckout/${cartId}`,
      {
        address: {
          address: defaultAddressSelector.address,
          pincode:defaultAddressSelector.pincode,
          city:defaultAddressSelector.city,
          state: defaultAddressSelector.state,
          country: defaultAddressSelector.country,
        },
      },
      config,
    )
    .then(function (response) {
      console.log('proceed to checkout response=>', response);
      let checkoutData = response.data.data.productDetails;
      // console.log(checkoutData);
      setcheckout(checkoutData);
      let id = response.data.data._id;
      setcheckoutId(id);
      let finalPrice = response.data.data.totalPrice;
      // console.log('finalprice in place order=>', finalPrice);
      settotalPrice(finalPrice);
    })
    .catch(function (e) {
      console.log('proceed to checkout error=>', e);
    });
};
  const PlaceOrder = () => {
    console.log('id check=>', checkOutId);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/placeOrder/${checkOutId}`,
        {
          id: checkOutId,
        },
        config,
      )
      .then(function (response) {
        console.log('place order response =>', response);
        navigation.navigate('OrderConfirmed');
        return true;
      })
      .catch(function (e) {
        console.log(e);
        return false;
      });
  };
  return (
    
      <View style={{flex: 1}}>
        <Appbar.Header style={{backgroundColor: 'white'}}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
          <Appbar.Content title="Place Order" />
        </Appbar.Header>
        <View style={PlaceOrderStyl.addressView}>
          <Text style={PlaceOrderStyl.userEmail}>
            {fName} {lName}
          </Text>
          <Text style={PlaceOrderStyl.addressText}>{defaultAddressSelector.address}</Text>
          <Text style={PlaceOrderStyl.addressText}>
            {defaultAddressSelector.city}, {defaultAddressSelector.pincode}
          </Text>
          <Text style={PlaceOrderStyl.addressText}>
            {defaultAddressSelector.state}, {defaultAddressSelector.country}
          </Text>
        </View>
        <TouchableOpacity
          style={PlaceOrderStyl.AddressBtn}
          onPress={() => {
            navigation.navigate('ShippingAddress');
          }}>
          <Text style={PlaceOrderStyl.AddressBtnTxt}>Change or Add Address</Text>
        </TouchableOpacity>
  
        <FlatList
          style={{flex: 1}}
          data={checkOut}
          renderItem={({item}) => (
            <PlaceOrderCard
              productName={item.productName}
              total={item.total}
              orderQuantity={item.orderQuantity}
              productImage={item.productImage}
            />
          )}
        />
        {/*    <View>
          <Text>{checkOut.productName}</Text>
          {checkOut.map((item, index) => {
            return <Text>{item.toString()}</Text>;
          })}
        </View> */}
        <View style={PlaceOrderStyl.buttonView}>
          <Button
            mode="outlined"
            color="black"
            style={PlaceOrderStyl.button}
            onPress={() => console.log('Pressed')}>
            $ {totalPrice}
          </Button>
          <Button
            mode="outlined"
            color="#ff9999"
            style={PlaceOrderStyl.button}
            onPress={() => {
              PlaceOrder();
              /*     if (PlaceOrder() === true) {
                setisModalVisible(!isModalVisible);
                <Modal
                  transparent={true}
                  visible={isModalVisible}
                  style={{width: wp('60%'), height: hp('40%')}}>
                  <View style={{flex: 1}}>
                    <Card>
                      <Card.Content>
                        <Title>ORDER CONFIRMED</Title>
                        <Paragraph>
                          Thanks for placing order with NEOSTORE!{' '}
                        </Paragraph>
                        <Paragraph>Your order has been confirmed</Paragraph>
  
                        <Button
                          mode="outlined"
                          onPress={() => {
                            setModalVisible(!isModalVisible);
                          }}>
                          RATE NOW
                        </Button>
                      </Card.Content>
                    </Card>
                  </View>
                </Modal>;
              } else {
                console.warn('not conirmed');
              } */
            }}>
            CONFIRM ORDER
          </Button>
        </View>
      </View>
    );
  };
  const PlaceOrderStyl = StyleSheet.create({
    AddressBtn: {
      width: wp('85%'),
      height: hp('7%'),
      paddingVertical: hp('1%'),
      paddingHorizontal: hp('1%'),
      backgroundColor: '#1e90ff',
      marginVertical: hp('2%'),
      alignSelf: 'center',
      borderRadius: wp('9%'),
    },
    AddressBtnTxt: {
      fontSize: wp('6%'),
      padding: wp('0.8%'),
      color: 'white',
      borderRadius: hp('10%'),
      textAlign: 'center',
    },
    buttonView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      width: wp('45%'),
      marginLeft: hp('1%'),
      marginRight: hp('1%'),
    },
    addressView: {
      marginLeft: wp('5%'),
      marginTop: hp('4%'),
    },
    userEmail: {
      fontSize: wp('6%'),
      color: 'black',
    },
    addressText: {
      fontSize: wp('5%'),
      color: 'black',
    },
  });
  