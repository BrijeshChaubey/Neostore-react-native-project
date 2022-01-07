import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from './Dimension';
import {Rating} from 'react-native-ratings';
import { productImage } from '../../utils/Constant';


export const DashboardCard = ({...props}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Card style={CardStyl.card}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {
                id: props.id,
              });
            }}>
             <Card.Cover
              source={{uri: `${productImage}${props.image}`}}
              resizeMode="contain"
              style={CardStyl.imageView}
            />
          </TouchableOpacity>
          <View style={{marginLeft: hp('2%')}}>
            <Card.Content>
              <Title style={CardStyl.title}>{props.name}</Title>
              <Title>{props.price}</Title>
            </Card.Content>
            <View style={CardStyl.rating}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                fractions={1}
                startingValue={2.5}
                onFinishRating={props.rating}
                readonly={true}
              />
            </View>
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

  imageView: {
    display: 'flex',
    backgroundColor:'white',
    flexDirection: 'row',
    height: hp('23%'),
    width: wp('32%'),
    padding: wp('2%'),
    borderRadius: wp('5%'),
    margin: hp('2%'),
    position: 'relative',
  },
  title: {
    marginTop: hp('4%'),
    marginBottom: hp('1%'),
  },

  rating: {
    marginTop: hp('2%'),
    alignSelf: 'flex-start',
    marginLeft: wp('3%'),
  },
});

// export const DashboardCard = ({...props}) => {
//   console.log('id=>', props.id);
//   const navigation = useNavigation();

//   return (
//     <View style={{flex: 1}}>
//       <Card style={CardStyl.card}>
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('ProductDetails', {
//                 id: props.id,
//               });
//             }}>
//             <Card.Cover
//               source={{uri: 'https://picsum.photos/700'}}
//               style={CardStyl.imageView}
//             />
//           </TouchableOpacity>
//           <View style={{marginLeft: hp('2%')}}>
//             <Card.Content>
//               <Title style={CardStyl.title}>{props.name}</Title>
//               <Title>{props.price}</Title>
//             </Card.Content>
//             <View style={CardStyl.rating}>
//               <Rating
//                 type="star"
//                 ratingCount={5}
//                 imageSize={20}
//                 onFinishRating={props.rating}
//               />
//             </View>
//           </View>
//         </View>
//       </Card>
//     </View>
//   );
// };

// const CardStyl = StyleSheet.create({
//   card: {
//     height: hp('28%'),
//     borderRadius: wp('8%'),
//     marginHorizontal: hp('1%'),
//     marginVertical: hp('1%'),
//   },
//   /*  image: {
//     justifyContent: 'flex-start',
//     padding: wp('0.5%'),
//     backgroundColor: 'lightgreen',
//   }, */
//   imageView: {
//     display: 'flex',
//     flexDirection: 'row',
//     height: hp('23%'),
//     width: wp('32%'),
//     padding: wp('2%'),
//     borderRadius: wp('5%'),
//     margin: hp('2%'),
//     position: 'relative',
//   },
//   title: {
//     marginTop: hp('4%'),
//     marginBottom: hp('1%'),
//   },

//   rating: {
//     marginTop: hp('2%'),
//     alignSelf: 'flex-start',
//     marginLeft: wp('3%'),
//   },
// });
