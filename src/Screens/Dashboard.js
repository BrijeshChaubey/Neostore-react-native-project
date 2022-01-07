import {View, Text,StyleSheet,FlatList} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Searchbar, Appbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
 import {DashboardCard } from './components/DashboardCard';
import {wp, hp} from './components/Dimension';
import {withBadge, Icon} from 'react-native-elements'
import { getUserProfile } from './Redux/authredux/AuthAction';
import { getUserCartData } from './Redux/authredux/AuthAction';

export const DashboardScreen= ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([])
  var authSelector = useSelector(state => state.authReducer.authData);
  const cartSelector=useSelector(state => state.authReducer.getCartData);
  var cartLength = cartSelector.length;
  const  cartDispatch=useDispatch();
  const userDataSelector=useSelector(state => state.authReducer.getUserData);
  const userDataDispatch =  useDispatch();
  var token = authSelector.token;
  var dashBoardData = [];
  const  BadgedIcon = withBadge(cartLength)(Icon);
  React.useEffect(() => {
    dashboardAxios();
  }, []);
  const lowToHighRate = () => {
    const asec = allProduct.sort((a, b) => {
      return a.rating - b.rating;
    });
    setallProduct(asec);
  };
  const highToLowRate = () => {
    console.log('arrived in hoghtolow function');
    const dsec = allProduct.sort((a, b) => {
      return b.rating - a.rating;
    });
    setallProduct(dsec);
  };
  const onChangeSearch = searchQuery => {
    setSearchQuery(searchQuery);
    const newData = products.filter(item => {
      return item.name.search(searchQuery) > -1;
    });
    setProducts(newData);
  };
  const dashboardAxios=()=>{
    axios
    .get('https://nameless-savannah-21991.herokuapp.com/getDashboard', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(function (response) {
      console.log('dashboard response', response);
      dashBoardData = response.data.productOfEachCategory;
      setProducts(dashBoardData);
    })
    .catch(function (error) {
      console.log(error);
    });
    axios
    .get('https://nameless-savannah-21991.herokuapp.com/profile', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(function (response) {
      var result = response.data.userData;
      console.log('profile response=>', result);
      userDataDispatch(getUserProfile(result));
    })
    .catch(function (error) {
      console.log('Profile error=>', error);
    });
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
  return (
    <View style={{backgroundColor: 'lightgray', height: hp('100%'),flex:1}}>
      <View>
        <Appbar.Header style={DashboardStyl.header}>
          <Appbar.Action
            icon="menu"
            size={35}
            color="#1e90ff"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content title="NEOSTORE" style={{alignSelf: 'center'}} />
         
          <View style={DashboardStyl.cartIcon}>
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
      <View>
        <Searchbar
          placeholder="Search For Products"
          value={searchQuery}
          onChangeText={(searchQuery)=>{onChangeSearch(searchQuery)}}
          
         
          style={DashboardStyl.searchBar}
        />
      </View>
      <View style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={products}
        renderItem={({item}) => (
          <DashboardCard
            name={item.name}
            price={item.price}
            image={item.image}
            rating={item.rating}
            id={item.id}
          />
        )}
      />
      
     
    </View>
    </View>
  );
};

const DashboardStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  menuicon: {
    justifyContent: 'space-around',
    marginLeft: wp('3%'),
  },
  neostoreTxt: {
    fontSize: wp('7%'),
    fontWeight: '700',
    color: 'black',
    width: wp('72%'),
    alignSelf: 'center',
    textAlign: 'center',
  },
  cartIcon: {
    justifyContent: 'flex-end',
    marginRight: wp('3%'),
  },
  searchBar: {
    borderRadius: wp('4%'),
    margin: hp('1%'),
  },
});
