import {View, Text,StyleSheet,FlatList,TouchableOpacity,Modal} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Searchbar,
   Appbar,
   Button,Divider

} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
//  import {DashboardCard } from '../components/DashboardCard';
import {wp, hp} from '../components/Dimension';
import { AllProductCard } from '../components/AllProductsCard';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';


export const allProductScreen= ({navigation}) => {
  const authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const getAllProductDispatch = useDispatch();
  const getAllProductSelector = useSelector(
    state => state.authReducer.allProductData,
  );
  console.log('getAllProductSelector=>', getAllProductSelector);
  var colors = [];
  colors = getAllProductSelector.allColors;
  const isFocused = useIsFocused();
  const [allProductData, setallProductData] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isColorModalVisible, setisColorModalVisible] = useState(false);
  const [isCategoryModalVisible, setisCategoryModalVisible] = useState(false);

  const [allColor, setallColor] = useState([]);
  const [allCategory, setallCategory] = useState([]);
  let c = '';
  React.useEffect(() => {
    allProductAxios();
  }, [isFocused]);
   //filter for rating
   const lowToHighRate = () => {
    const asec = allProductData.sort((a, b) => {
      return a.rating - b.rating;
    });
    setallProductData(asec);
  };
  const highToLowRate = () => {
    console.log('arrived in hoghtolow function');
    const dsec = allProductData.sort((a, b) => {
      return b.rating - a.rating;
    });
    setallProductData(dsec);
  };
   //filter for rating
   const lowToHighPrice = () => {
    const asec = allProductData.sort((a, b) => {
      return a.price - b.price;
    });
    setallProductData(asec);
  };
  const highToLowPrice = () => {
    console.log('arrived in hoghtolow function');
    const dsec = allProductData.sort((a, b) => {
      return b.price - a.price;
    });
    setallProductData(dsec);
  };


  
  
  const allProductAxios = () => {
    console.log(token)
    axios
    .get('https://nameless-savannah-21991.herokuapp.com/commonProducts', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(function (response) {
      console.log('all product response=>', response);
      let data = response.data.commonProducts;
      console.log("data===>",data);
      setallProductData(data);
      let result = response.data;
      getAllProductDispatch(getAllProduct(result));
      let color = response.data.allColors;
      setallColor(color);
      console.log('colors=>', color);
      let category = response.data.allCategories;
      setallCategory(category);
    })
    .catch(function (error) {
      errorHandling(error);
    });
};
  return (
    <View style={{backgroundColor: 'lightgray', height: hp('100%')}}>
      <View>
        <Appbar.Header style={DashboardStyl.header}>
          <Appbar.Action
            icon="menu"
            size={35}
            color="#1e90ff"
            onPress={() => {
              navigation.navigate('Drawercomponent');
            }}
          />
          <Appbar.Content title="Products" style={{alignSelf: 'center'}} />
          <Appbar.Action
            icon="cart"
            color="#1e90ff"
            size={35}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </Appbar.Header>
      </View>
     
      <View style={{flex: 1}}>
       <FlatList
        style={{flex: 1}}
        data={allProductData}
        
        renderItem={({item}) => (
          <AllProductCard
           name={item.name}
            price={item.price}
            image={item.image}
           
          />
        )}
      /> 
      <View style={allProductStyl.BottomButtonView}>
      <TouchableOpacity
          onPress={() => {
            setisCategoryModalVisible(!isCategoryModalVisible);
          }}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Category</Text>
        </TouchableOpacity>
        {/* CATEGORY MODAL */}
        <Modal transparent={true} visible={isCategoryModalVisible}>
          <View style={allProductStyl.categoryModalView}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color="black"
              onPress={() => {
                setisCategoryModalVisible(!isCategoryModalVisible);
              }}
            />
            {allCategory.map(item => (
              <View style={allProductStyl.catModalTxtView}>
                <TouchableOpacity
                  onPress={() => {
                    console.warn('clicked on', item);
                  }}>
                  <Text style={allProductStyl.RatingModalIconTextView}>{item}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
      <TouchableOpacity
          onPress={() => {
            setisColorModalVisible(!isColorModalVisible);
          }}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Color</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={isColorModalVisible}>
          <View style={allProductStyl.colorModalView}>
            <View style={allProductStyl.colorModalIconText}>
              <Entypo
                name="circle-with-cross"
                size={30}
                color="black"
                onPress={() => {
                  setisColorModalVisible(!isColorModalVisible);
                }}
                style={{
                  marginLeft: wp('10%'),
                }}
              />
              <Text
                style={{
                  marginLeft: wp('5%'),
                  fontSize: wp('5%'),
                  marginTop: hp('1%'),
                }}>
                Available colors
              </Text>
            </View>
            {allColor.map(item => (
              <View style={allProductStyl.colorModalItemView}>
                <TouchableOpacity
                  onPress={() => {
                    console.warn('clicked on', item);
                  }}>
                  <Text style={[allProductStyl.colorModalItem, {color: item}]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>

      <TouchableOpacity
          onPress={() => setisModalVisible(!isModalVisible)}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Price</Text>
        </TouchableOpacity>
       
        <Modal transparent={true} visible={isModalVisible}>
        <View style={allProductStyl.RatingModalView}>
          <View style={allProductStyl.RatingModalInnnerView}>
            <View style={allProductStyl.RatingModalIconTextView}>
              <Entypo
                name="circle-with-cross"
                size={30}
                color="black"
                onPress={() => {
                  setisModalVisible(!isModalVisible);
                }}
              /> 
              <Text style={{fontSize: wp('4%')}}>Sort by Price</Text>
            </View>
            <Divider style={allProductStyl.RatingModalDivider} />

            <Button
              mode="outlined"
              color="black"
              onPress={() => {
                highToLowPrice();
              }}
              style={{marginBottom: hp('2%')}}>
              High to Low
            </Button>
            <Button
              mode="outlined"
              color="black"
              onPress={() => {
                lowToHighPrice();
              }}>
              Low to High
            </Button>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
          onPress={() => setisModalVisible(!isModalVisible)}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Rating</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={isModalVisible}>
          <View style={allProductStyl.RatingModalView}>
            <View style={allProductStyl.RatingModalInnnerView}>
              <View style={allProductStyl.RatingModalIconTextView}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color="black"
                  onPress={() => {
                    setisModalVisible(!isModalVisible);
                  }}
                /> 
                <Text style={{fontSize: wp('4%')}}>Sort by Rating</Text>
              </View>
              <Divider style={allProductStyl.RatingModalDivider} />

              <Button
                mode="outlined"
                color="black"
                onPress={() => {
                  highToLowRate();
                }}
                style={{marginBottom: hp('2%')}}>
                High to Low
              </Button>
              <Button
                mode="outlined"
                color="black"
                onPress={() => {
                  lowToHighRate();
                }}>
                Low to High
              </Button>
            </View>
          </View>
        </Modal>
      </View>
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
const allProductStyl = StyleSheet.create({
  button: {
    width: wp('20%'),
    height: hp('6%'),

    paddingHorizontal: hp('0.8%'),
    backgroundColor: 'white',
    marginVertical: hp('1%'),
    alignSelf: 'center',
    borderRadius: wp('3%'),

    marginHorizontal: hp('1%'),
  },
  btnTxt: {
    fontSize: wp('4%'),
    color: 'black',
    borderRadius: hp('1%'),
    textAlign: 'center',
    borderColor: 'black',
    paddingVertical: hp('0.7%'),
  },
  BottomButtonView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  RatingModalView: {
    width: wp('70'),
    height: hp('30%'),
    backgroundColor: 'white',
    borderRadius: wp('8%'),
    alignSelf: 'center',
    marginTop: hp('30%'),
  },
  RatingModalInnnerView: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('5%'),
  },
  RatingModalIconTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: wp('3%'),
  },
  RatingModalDivider: {
    color: 'black',
    height: hp('0.1%'),
    marginBottom: hp('3%'),
  },
  categoryModalView: {
    height: hp('70%'),
    width: wp('50%'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('20%'),
  },
  categoryModalTxt: {
    padding: wp('3%'),
    color:'purple'
  },
  catModalTxtView: {
    display: 'flex',
    flexDirection: 'column',
  },
  colorModalView: {
    height: hp('100%'),
    width: wp('70%'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('3%'),
    borderRadius: hp('7%'),
  },
  colorModalIconText: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
  },
  colorModalItem: {
    margin: wp('2%'),
    padding: wp('3%'),
    backgroundColor: 'lightgray',
    borderRadius: wp('4%'),
    // color: item,
    width: wp('30%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  colorModalItemView: {
    display: 'flex',
    flexDirection: 'column',
  },
});
