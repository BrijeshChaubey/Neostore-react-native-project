import {AUTH_LOG_IN, AUTH_LOG_OUT, GET_USER_DATA,GET_CART_DATA,
  ORDER_HISTORY_DATA,ALL_PRODUCT_DATA,GET_USER_ADDRESSES, DEFAULT_ADDRESS} from './AuthActionTypes';

const initialState = {
  isLoading: true,
  authData: null,
  getUserData:[],
  getCartData:[],
  userOrderHistory:[],
  allProductData:[],
  defaultAddress:[],
  userAddressesData:[],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN:
      return {
        ...state,
        authData: action.authDataResponse,
      };
    case AUTH_LOG_OUT:
      return {
        ...state,
        authData: action.authDataSignOutRes,
      };
    case GET_USER_DATA:
      return {
        ...state,
        getUserData: action.userDataResponse,
      };
      case GET_CART_DATA:
        return {
          ...state,
          getCartData :action.CartDataResponse
        };
        case ORDER_HISTORY_DATA:
          return {
            ...state,
            userOrderHistory :action.userOrderHistoryResponse
          };
          case GET_USER_ADDRESSES:
      return {
        ...state,
        userAddressesData: action.userAddressResponse,
      };
          case ALL_PRODUCT_DATA :
            return {
              ...state,
              allProductData :action.getAllProductResponse
            }
            case DEFAULT_ADDRESS :
              return {
                ...state,
                defaultAddress :action.defaultAddressResponse
              }
              
    default:
      return state;
  }
};
