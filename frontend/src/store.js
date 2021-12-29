import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer,userRegisterReducer } from './Reducers/userReducer';
import { blogListReducer,  blogDetailsReducer, blogCreateReducer, blogDeleteReducer, blogUpdateReducer, blogCreateReviewReducer } from './Reducers/blogReducer';
import { agricCreateReducer, agricListReducer ,agricDetailsReducer, agricUpdateReducer, agricDeleteReducer, AgricCreateReviewReducer} from './Reducers/agricReducer';
import { naturalCreateReducer, naturalDeleteReducer, naturalDetailsReducer, naturalListReducer, naturalUpdateReducer ,
NaturalCreateReviewReducer} from './Reducers/naturalReducer';
import { informationCreateReducer, InformationCreateReviewReducer, informationDeleteReducer, informationDetailsReducer, informationListReducer, informationUpdateReducer } from './Reducers/informationReducer';
import { agricCartReducers } from './Reducers/agricCartReducer';
import { orderReducer,
    orderDetailsReducer, 
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeleteReducer
     } from './Reducers/orderReducer';


const reducer = combineReducers({
    cart : agricCartReducers,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer ,

    bloglist : blogListReducer,
    blogDetails : blogDetailsReducer,
    createBlog: blogCreateReducer,
    deleteBlog: blogDeleteReducer,
    updateBlog: blogUpdateReducer,
    blogCreateReview: blogCreateReviewReducer,

    agricProductList : agricListReducer,
    agricProductDetails : agricDetailsReducer,
    createAgricProduct: agricCreateReducer,
    updateAgricProduct: agricUpdateReducer,
    deleteAgricProduct: agricDeleteReducer,
    agricCreateReview : AgricCreateReviewReducer,

    naturalProductList : naturalListReducer,
    naturalProductDetails : naturalDetailsReducer,
    createNaturalProduct: naturalCreateReducer,
    updateNaturalProduct: naturalUpdateReducer,
    deleteNaturalProduct: naturalDeleteReducer,
    naturalCreateReview : NaturalCreateReviewReducer,

    informationProductList : informationListReducer,
    informationProductDetails : informationDetailsReducer,
    createInformationProduct: informationCreateReducer,
    updateInformationProduct: informationUpdateReducer,
    deleteInformationProduct: informationDeleteReducer,
    ictCreateReview: InformationCreateReviewReducer,

    orderCreate: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy : orderListMyReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
 

})

const cartItemsFromStorage = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems")) : []

const shippingAddressfoFromStorage = localStorage.getItem("shippingAddress") ?
    JSON.parse(localStorage.getItem("shippingAddress")) : []


const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    cart: {cartItems : cartItemsFromStorage,
    shippingAddress : shippingAddressfoFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

    export default store