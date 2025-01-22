import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin-slice/product-slice";
import shoppingProductSlice from "./shop-slice/products-slice";
import cartShoppingSlice from "./shop-slice/cart-slice";
import cartAddressSlice from "./shop-slice/address-slice";
import shopOrderSlice from "./shop-slice/order-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shoppingProductSlice,
    shopCart: cartShoppingSlice,
    shopAddress: cartAddressSlice,
    shopOrder: shopOrderSlice
  },
});

export default store;
