import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Appbar,
  FAB,
  Card,
  Paragraph,
  Title,
  Button,
  Chip,
  Divider,
} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {withBadge, Icon} from 'react-native-elements'
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {hp, wp} from './components/Dimension';
import { productImage } from '../utils/Constant';
import {carouselImage} from '../utils/Constant';
import { TouchableOpacity } from 'react-native';


export const ProductDetailsScreen = ({route, navigation}) => {
  const {id} = route.params;

  var authSelector = useSelector(state => state.authReducer.authData);
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  var cartLength = cartSelector.length;
  var token = authSelector.token;
  const  BadgedIcon = withBadge(cartLength)(Icon);
  const [productDetails, setproductDetails] = useState([]);
  const [qty, setQty] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activepag, setactivepag] = useState(0);
  const isFocused = useIsFocused();
 
  React.useEffect(() => {
    productDetailsAxios();
  }, [isFocused]);
  const addQty = () => {
    setQty(qty + 1);
  };
  const removeQty = () => {
    setQty(qty - 1);
  };

  const productDetailsAxios = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(
        `https://nameless-savannah-21991.herokuapp.com/getProductDetails/${id}&${'red'}`,
        config,
      )
      .then(function (response) {
        console.log('PRODUCT DETAILS SCREEN RESPONSE =>', response);
        let data = response.data;
        setproductDetails(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addToCart = () => {
    var color = productDetails.colors[0];
    console.log(color);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/addToCart/${id}&${color}`,
        {
          id: id,
          color: color,
        },
        config,
      )
      .then(function (response) {
        console.log(response);
        navigation.navigate('Cart');
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const ratingCompleted = rating => {
    console.log('rating is', rating);
    console.log('id is',id);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/addRating/${id}&${rating}`,
        {
          id: id,
          rating: rating,
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
    <View>
    <ScrollView>
      <View>
        <Appbar.Header style={ProductDetailStyl.header}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
          />
          <Appbar.Content
            title={productDetails.name}
            style={{alignSelf: 'center'}}
          />
          <View style={ProductDetailStyl.cartIcon}>
            <BadgedIcon
            type="ionicon"
            name="cart"
          color="#1e90ff"
            size={35}
            onPress={() => {
              navigation.navigate('Cart');
            }}/>
          </View>
        </Appbar.Header>
      </View>
      <View style={ProductDetailStyl.imageView}>
      <Card>
            <ScrollView
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              style={ProductDetailStyl.imageScroll}>
              {productDetails &&
                productDetails.images &&
                productDetails.images.length &&
                productDetails.images.map((images, index) => (
                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DasboardProfileView', {
                      images:images,
                      index:index,
                    })
                  }      
                           
                           >
                   <Card.Cover
                  key={index}
                  source={{
                    uri: `${carouselImage}${images}`,
                  }}
                  resizeMode="contain"
                  style={ProductDetailStyl.image}
                /></TouchableOpacity>
                  
                ))}
            </ScrollView>
            <View style={ProductDetailStyl.pagination}>
              {[carouselImage].map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == activepag
                      ? ProductDetailStyl.paginationActiveText
                      : ProductDetailStyl.paginationText
                  }>
                  ⬤
                </Text>
              ))}
            </View>

           
          </Card>
          </View>
      <Card>
        <Card.Content>
          <Title> {productDetails.name}</Title>

          <View style={{flexDirection: 'row', height: 26}}>
            {productDetails &&
              productDetails.colors &&
              productDetails.colors.length &&
              productDetails.colors.map((item, index) => {
                return (
                  <Chip textStyle={{color: item}} style={{color: 'black'}}>
                    {item.toString()}
                  </Chip>
                );
              })}
          </View>

          <Paragraph style={ProductDetailStyl.paragraph}>
            {productDetails.description}
          </Paragraph>
          <Paragraph style={ProductDetailStyl.paragraph}>
            {productDetails.features}
          </Paragraph>
          <Title>{productDetails.price}</Title>
          <Paragraph>inclusive of all taxes</Paragraph>
          <View style={ProductDetailStyl.qtyView}>
            <AntDesign
              name="pluscircle"
              size={20}
              color="black"
              onPress={() => {
                addQty();
              }}
            />
            <Title style={ProductDetailStyl.qty}>{qty}</Title>
            <AntDesign
              name="minuscircle"
              size={20}
              color="black"
              onPress={() => {
                removeQty();
              }}
            />
          </View>
          <Title>Easy 30 days return and exchange</Title>
          <Paragraph>
            Choose to return or exchange for a different if available) within 30
            days
          </Paragraph>
          <Card.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              icon="star"
              mode="outlined"
              color="#fada5e"
              style={ProductDetailStyl.button}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}>
              RATE
            </Button>
            <Modal

              transparent={true}
              visible={isModalVisible}
              style={{width: wp('60%'), height: hp('40%')}}>
              <View style={{flex: 1}}>
              
                <Card style={ProductDetailStyl.modalCard}>
                <View style={ProductDetailStyl. RatingModalIconTextView}>
              <Entypo
                name="circle-with-cross"
                size={30}
                color="black"
                onPress={() => {
                  setModalVisible(!isModalVisible);
                }}
              /> 
              
            </View>
                  <Card.Content>
                    <Title
                      style={{alignSelf: 'center', paddingBottom: hp('2%')}}>
                      {productDetails.name}
                    </Title>
                    <Divider />
              
                    <ScrollView 
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              style={ProductDetailStyl.imageScroll1}>
                
              {productDetails &&
                productDetails.images &&
                productDetails.images.length &&
                productDetails.images.map((images, index) => (
                  <Card.Cover 
                    key={index}
                    source={{
                      uri: `${carouselImage}${images}`,
                    }}
                    resizeMode="contain"
                    style={ProductDetailStyl.image1}
                  />
                ))}
            </ScrollView>
            
                    <Rating type="star"
                     ratingCount={5}
                      imageSize={30} 
                      onFinishRating={ratingCompleted}/>

                    <Button
                      mode="outlined"
                      style={ProductDetailStyl.modalButton}
                      onPress={() => {
                        setModalVisible(!isModalVisible);
                      }}>
                      RATE NOW
                    </Button>
                  </Card.Content>
                </Card>
              </View>
            </Modal>
            <Button
              icon="cart"
              mode="contained"
              color="#ff9999"
              style={ProductDetailStyl.button}
              onPress={() => console.log('Pressed')}>
              BUY NOW
            </Button>
          </Card.Content>
        
        </Card.Content>
      </Card>
      <FAB
        style={ProductDetailStyl.fab}
        large
        icon="cart"
        onPress={() => {
          addToCart();
        }}
      /> 
    </ScrollView>
   
      
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  RatingModalIconTextView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingTop: wp('3%'),
    paddingLeft:wp('3%'),
    
  },
  paragraph: {
    fontSize: wp('4%'),
    padding: wp('1%'),
  },
  RatingModalInnnerView: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('5%'),
  },  
  button: {
    width: wp('40%'),
  },
  fab: {
    position: 'absolute',
    backgroundColor: "#ff9999",
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: hp('85%'),
    marginRight: hp('5%'),
  },
  qtyView: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: hp('2%'),
  },
  qty: {
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
  },
  ratingOnImage: {
    color: 'black',
    paddingTop: hp('35%'),
    paddingRight: wp('5%'),
    alignSelf: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    marginTop: hp('12%'),
    marginBottom: hp('15%'),
    marginLeft: hp('5%'),
    marginRight: hp('5%'),
    flex: 1,
    borderRadius: wp('8%'),
    height: hp('50%'),
  },
  
  modalButton: {
    width: wp('70%'),
    marginTop: hp('2%'),
  },
  cartIcon: {
    justifyContent: 'flex-end',
    marginRight: wp('3%'),
  },
  chipView: {
    flexDirection: 'row',
    height: 32,
  },
  image: {
    width: wp('100%'),
    height: hp('40%'),
  },
  image1: {
    width: wp('75%'),
    height: hp('40%'),
  },
  imageView: {
    height: hp('45%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },
  imageScroll: {
    width: wp('100%'),
    height: hp('40%'),
    
  },
  imageScroll1: {
    width: wp('75%'),
    height: hp('40%'),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  paginationText: {
    color: 'lightgray',
    margin: hp('0.5%'),
  },
  paginationActiveText: {
    color: 'black',
    margin: hp('0.5%'),
  },
  cartIcon: {
    marginRight: wp('6%'),
  },
});

