import axios from 'axios';
import React, {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getUserCartData } from '../Redux/authredux/AuthAction';
import {useDispatch,} from 'react-redux';
import {
  View,
  Text,
  FlatList,

  StyleSheet
} from 'react-native';
import {Avatar,Appbar,  Button, Card

} from 'react-native-paper';
import {useSelector} from 'react-redux';
import{CartCardComponent} from '../components/CartCard';
import {wp, hp} from '../components/Dimension';
export const Cartscreen = ({navigation}) => {
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const cartDispatch =  useDispatch();
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  console.log('cartSelector=>',cartSelector)

  const isFocused = useIsFocused();
  var cartLength = cartSelector.length;
  React.useEffect(() => {
    getCartData();
  }, [isFocused]);
  const getCartData = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getCart', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log(' CART SCREEN RESPONSE=>', response);
        let cartResponse = response.data.cart;
        let length = response.data.cart.productDetails.length;
        var data = {
          ...cartResponse,
          length,
        };
        cartDispatch(getUserCartData(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const postCartData = () => {
    axios
      .post('https://nameless-savannah-21991.herokuapp.com/updateCart', 
        {
          id: id,
          
        },
        config,
      )
      .then(function (response) {
        console.log(response);
       })
      .catch(function (e) {
        console.log(e);
      });
  };



  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
       
        <Appbar.Content title="Cart" />
      </Appbar.Header>
     {cartLength !=0 ?(
      <FlatList
        style={{flex: 1}}
        data={cartSelector.productDetails}
        renderItem={({item}) => (
          <CartCardComponent
          productName={item.productName}
          total={item.total}
          orderQuantity={item.orderQuantity}
          productImage={item.productImage}
          />
        )}
      />
     ) :(
       <Card>
         <Card.Cover style={{height:300}}
         source={{
           uri: 'https://iticsystem.com/img/empty-cart.png'
        }}></Card.Cover> 
       </Card>
     )}
     
      {cartLength != 0 ? (
        <View style={CartScreenStyl.buttonView}>
          <Button
            mode="outlined"
            color="black"
            style={CartScreenStyl.button}
            onPress={() => console.log('Pressed')}>
            $ {cartSelector.totalPrice}
          </Button>
          <Button
            mode="contained"
            color="#ff9999"
            style={CartScreenStyl.button}
            onPress={() => {
              navigation.navigate('ShippingAddress');
            }}>
            CONFIRM ORDER
          </Button>
        </View>
      ) : (
        []
      )}
    </View>
  );
};
const CartScreenStyl = StyleSheet.create({
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
  orderButton: {},
});