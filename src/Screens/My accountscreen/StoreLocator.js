import React from 'react';
import {View, Text,Animated ,ScrollView ,Image,Dimensions,StyleSheet} from 'react-native';
import MapView ,{Marker, Polygon, PROVIDER_GOOGLE}from 'react-native-maps';
import {hp, wp} from './../components/Dimension';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Appbar,Title} from 'react-native-paper';
import  {state} from './../components/MapObject'
 const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = hp('30%');
const CARD_WIDTH = wp('60%');
export const LocationScreen= ({navigation}) => {
 
  
    return ( 
    <View >
      <Appbar.Header style={{backgroundColor: 'white'}}>
      <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
         <Appbar.Content title="Store Locator" />
      </Appbar.Header>
         
       <MapView
        
        provider={PROVIDER_GOOGLE}
        region={state.region}
        style={{height: hp('60%'), width: wp('100%')}}>
        {/* Marker on the map */}
        {state.markers.map((marker, index) => (
          <MapView.Marker coordinate={marker.coordinate} title={marker.name} />
        ))}
</MapView>
<Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
       
      >
        {state.markers.map((card, index) => (
          <View
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              marginHorizontal: 10,
            }}>
            <Image
              source={card.image}
              resizeMode="cover"
              style={{
                flex: 2,
                width: CARD_WIDTH - 10,
                height: CARD_HEIGHT - 10,
                alignSelf: 'center',
                marginTop: 5,
              }}
            />
            <Title style={{fontSize: 14, paddingLeft: 8}}>{card.title}</Title>
            <Text style={{fontSize: 12, paddingLeft: 8}}>
              {card.description}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>

    </View>
    );
};
const storeLocatorStyl = StyleSheet.create({
  appbarstyl: {
    backgroundColor: 'white',
  },
});
