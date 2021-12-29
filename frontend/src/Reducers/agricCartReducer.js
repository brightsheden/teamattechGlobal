import { 
    AGRIC_CART_ADD_ITEM,
    NATURAL_CART_ADD_ITEM,
    ICT_CART_ADD_ITEM,
    AGRIC_CART_REMOVE_ITEM,
    AGRIC_CART_SAVE_SHIPPING_ADDRESS,
    AGRIC_CART_SAVE_PAYMENT_METHOD,
    AGRIC_CART_CLEAR_ITEMS,
 } from "../Constants/agricCartConstant";

export const agricCartReducers = (state={cartItems: [], shippingAddress: {}}, action)=>{
    switch (action.type ) {
        case AGRIC_CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                    x.product === existItem.product? item : x
                    )
                }

            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        /*case NATURAL_CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => 
                    x.product === existItem.product? item : x
                    )
                }

            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }   
            
            case NATURAL_CART_ADD_ITEM:
                const item = action.payload
                const existItem = state.cartItems.find(x => x.product === item.product)
    
                if(existItem){
                    return{
                        ...state,
                        cartItems: state.cartItems.map(x => 
                        x.product === existItem.product? item : x
                        )
                    }
    
                }else{
                    return{
                        ...state,
                        cartItems:[...state.cartItems,item]
                    }
                } */
        case AGRIC_CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case AGRIC_CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }
    
        case AGRIC_CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case AGRIC_CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
            
        default:
            return state;
    }

}