import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Appbar,Card,Divider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import { getUserOrderHistory } from '../Redux/authredux/AuthAction';
import {wp, hp} from '../components/Dimension';



export const OrderHistoryScreen = ({navigation}) => {
  var authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const userOrderHistoryDispatch = useDispatch();

  var orderHistorySelector = useSelector(
    state => state.authReducer.userOrderHistory,
  );
  console.log('response from redux=>', orderHistorySelector);
  var order = orderHistorySelector.productsInOrder;
  console.log('productsInOrder=>', order);
  var isFocused = useIsFocused();
  React.useEffect(() => {
    orderHistory();
  }, [isFocused]);

  const [getOrders, setgetOrders] = useState([]);
  const orderHistory = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/getOrders', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('order history response=>', response);
        let data = response.data.ordersDetails;
        userOrderHistoryDispatch(getUserOrderHistory(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, marginTop: hp('2%')}}>
    <ScrollView>
      {orderHistorySelector.map(item => (
        <View>
          <Card
            style={{
              flex: 1,
              borderRadius: wp('7%'),
              marginHorizontal: hp('1%'),
              marginVertical: hp('0.8%'),
            }}>
            <View
              style={{
                marginLeft: wp('6%'),
                marginTop: hp('2%'),
                marginRight: wp('10%'),
              }}>
              <Divider
                style={{
                  backgroudColor: 'black',
                  height: 3,
                  borderColor: 'black',
                  marginVertical: hp('1%'),
                }}
              />
              {item.productsInOrder.map(subItem => (
                <Text
                  style={{
                    color: 'black',
                    fontSize: wp('5%'),
                    paddingLeft: wp('5%'),
                    paddingRight: wp('5%'),
                  }}>
                  {subItem.product} qty-{subItem.quantity} {subItem.price}{' '}
                  {'\n'}
                </Text>
              ))}
              <Divider
                style={{
                  backgroudColor: 'black',
                  height: 3,
                  borderColor: 'black',
                  marginVertical: hp('1%'),
                }}
              />
              <Text style={{marginBottom: hp('2%'),color:'black'}}>
                {item.orderPlacedOn}
              </Text>
              <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('OrderDetails', {
                        productHistory: item,
                      });
                    }}>
                    <Text style={{color:'blue',marginLeft:'40%'}}>View Details</Text>
                  </TouchableOpacity>
            </View>
          </Card>
        </View>
      ))}
    </ScrollView>
  </View>

);
            }