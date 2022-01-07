import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Title, Button} from 'react-native-paper';
import {wp, hp} from '../components/Dimension';
import {RatingComponent} from './RatingComponent';
import { productImage } from '../../utils/Constant';

export const AllProductCard = ({...props}) => {
  return (
    <View style={{flex: 1}}>
      <Card style={CardStyl.card}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View >
          <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={CardStyl.imageView}
            />
          </View>
          <View>
            <Card.Content>
              <Title style={CardStyl.title}>{props.name}</Title>
              <Text>{props.description}</Text>
              <Title>{props.price}</Title>
            </Card.Content>
          </View>
        </View>
      </Card>
    </View>
  );
};

const CardStyl = StyleSheet.create({
  card: {
    height: hp('28%'),
    borderRadius: wp('8%'),
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
  },
  /*  image: {
    justifyContent: 'flex-start',
    padding: wp('0.5%'),
    backgroundColor: 'lightgreen',
  }, */
  imageView: {
    backgroundColor: 'pink',
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
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },

  infoView: {
    display: 'flex',
    flexDirection: 'row',
  },
});
