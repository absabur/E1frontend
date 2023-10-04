import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
  reviewReducer,
} from "./reducers/productReducer";
import { forgetePasswordReducer, profileReducer, signInUpReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { cancelReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, paymentReducer } from "./reducers/orderReducer";
import { adminProductReducer, categoryReducer, createProductReducer } from "./reducers/admin/productReducer";
import { adminOrderReducer, allOrderReducer } from "./reducers/admin/orderReducer";
import { adminUserReducer, allUserReducer, singleUserReducer } from "./reducers/admin/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: signInUpReducer,
  profile: profileReducer,
  forgotPassword: forgetePasswordReducer,
  cartAdd: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  payment: paymentReducer,
  review: reviewReducer,
  newProduct: createProductReducer,
  adminProduct: adminProductReducer,
  categories: categoryReducer,
  adminOrders: allOrderReducer,
  adminOrderUD: adminOrderReducer,
  adminUsers: allUserReducer,
  adminUserUD: adminUserReducer,
  userInfo: singleUserReducer,
  cancelOrder: cancelReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
