import {AGRIC_CART_ADD_ITEM,AGRIC_CART_REMOVE_ITEM,
    AGRIC_CART_SAVE_SHIPPING_ADDRESS,
    AGRIC_CART_SAVE_PAYMENT_METHOD} from '../Constants/agricCartConstant'
import axios from 'axios'
//import { USER_LOGIN_LOGOUT } from '../constants/userConstants'


export const addToCart = (id,qty) => async (dispatch, getState)=>{
    
    const {data} = await axios.get(`/api/agric/${id}/agricproduct/`)
    
    
    
  

    dispatch({
        type : AGRIC_CART_ADD_ITEM,
        payload: {
            product: data._id, 
            title: data.title,
            price: data.price,
            stocks : data.stocks,
            thumbnail : data.thumbnail,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addToCartNatural = (id,qty) => async (dispatch, getState)=>{
    
    const {data} = await axios.get(`/api/natural/${id}/naturalproduct/`)
    
    
    
  

    dispatch({
        type : AGRIC_CART_ADD_ITEM,
        payload: {
            product: data._id, 
            title: data.title,
            price: data.price,
            stocks : data.stocks,
            thumbnail : data.thumbnail,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addToCartIct = (id,qty) => async (dispatch, getState)=>{
    
    const {data} = await axios.get(`/api/informationTech/${id}/informationproduct/`)
    
    
    
  

    dispatch({
        type : AGRIC_CART_ADD_ITEM,
        payload: {
            product: data._id, 
            title: data.title,
            price: data.price,
            stocks : data.stocks,
            thumbnail : data.thumbnail,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const removeFromCart = (id) => (dispatch,getState)=>{
    dispatch({
        type: AGRIC_CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch)=>{
    dispatch({
        type: AGRIC_CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch)=>{
    dispatch({
        type: AGRIC_CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}


