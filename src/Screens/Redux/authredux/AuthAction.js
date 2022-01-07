import {AUTH_LOG_IN, AUTH_LOG_OUT, GET_USER_DATA,GET_CART_DATA,ORDER_HISTORY_DATA,
  ALL_PRODUCT_DATA,GET_USER_ADDRESSES, DEFAULT_ADDRESS} from './AuthActionTypes';

export const userLogInAction = authDataResponse => ({
  type: AUTH_LOG_IN,
  authDataResponse,
});
export const userLogOutAction = authDataSignOutRes => ({
  type: AUTH_LOG_OUT,
  authDataSignOutRes,
});
export const getUserProfile = userDataResponse => ({
  type: GET_USER_DATA,
  userDataResponse ,
});
export const getUserCartData =CartDataResponse => ({
  type: GET_CART_DATA,
  CartDataResponse ,
});
export const getUserOrderHistory =userOrderHistoryResponse => ({
  type: ORDER_HISTORY_DATA,
  userOrderHistoryResponse ,
});
export const getAllProduct =getAllProductResponse => ({
  type: ALL_PRODUCT_DATA,
  getAllProductResponse ,
});
export const getUserAddresses = userAddressResponse => ({
  type: GET_USER_ADDRESSES,
  userAddressResponse,
});
export const  defaultUserAddress = defaultAddressResponse => ({
  type:  DEFAULT_ADDRESS,
  defaultAddressResponse ,
});



