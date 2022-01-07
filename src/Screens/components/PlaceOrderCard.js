import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';
import { productImage } from '../../utils/Constant';


import {wp, hp} from './Dimension';
export const PlaceOrderCard = ({...props}) => {
  return (
    <View style={{flex: 1}}>
      <Card style={PlaceOrderStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
        <Card.Cover
              source={{uri: `${productImage}${props.productImage}`}}
              resizeMode="contain"
              style={PlaceOrderStyl.imageView}
            />
          <View>
            <Card.Content>
              <Title style={PlaceOrderStyl.title}>{props.productName}</Title>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: hp('1%'),
                }}>
                <Title >$ {props.total} </Title>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: hp('1%'),
                }}>
                <Title >Qty: {props.orderQuantity} </Title>
              </View>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};
const PlaceOrderStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('10%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
  },
  imageView: {
  
    display: 'flex',
    flexDirection: 'row',
    height: hp('20%'),
    width: wp('25%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('3%'),
  },
});
