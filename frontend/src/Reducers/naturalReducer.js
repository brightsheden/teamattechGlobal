import {
    NATURAL_LIST_REQUEST,
    NATURAL_LIST_SUCCESS,
    NATURAL_LIST_FAIL,
    
    NATURAL_DETAILS_REQUEST,
    NATURAL_DETAILS_SUCCESS,
    NATURAL_DETAILS_FAIL,
    
    CREATE_NATURAL_REQUEST,
    CREATE_NATURAL_SUCCESS,
    CREATE_NATURAL_FAIL,
    CREATE_NATURAL_RESET,
    
    UPDATE_NATURAL_REQUEST,
    UPDATE_NATURAL_SUCCESS,
    UPDATE_NATURAL_FAIL,
    UPDATE_NATURAL_RESET,
    
    DELETE_NATURAL_REQUEST,
    DELETE_NATURAL_SUCCESS,
    DELETE_NATURAL_FAIL,
    DELETE_NATURAL_RESET,

    NATURAL_CREATE_REVIEW_REQUEST,
    NATURAL_CREATE_REVIEW_SUCCESS,
    NATURAL_CREATE_REVIEW_FAIL,
    NATURAL_CREATE_REVIEW_RESET,
    
    
    } from  '../Constants/naturalConstants'
    
    
    export const naturalListReducer = (state= {naturalProducts : []}, action)=>{
        switch (action.type) {
            case NATURAL_LIST_REQUEST:
                return {loading: true, naturalProducts :[]}
                
            case NATURAL_LIST_SUCCESS:
                return {loading: false,
                    naturalProducts:action.payload
                }
    
            case NATURAL_LIST_FAIL:
                return {loading: false, error:action.payload}    
    
            default:
                return state;
        }
    }
    
    
    export const naturalDetailsReducer = (state= {naturalProduct  : {reviews: []}} , action)=>{
        switch (action.type) {
            case NATURAL_DETAILS_REQUEST:
                return {loading: true, ...state}
    
    
            case NATURAL_DETAILS_SUCCESS :
                return {loading:false, naturalProduct :action.payload}
            
            case NATURAL_DETAILS_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }
    
    
    export const naturalCreateReducer = (state= {}, action)=>{
        switch (action.type) {
            case CREATE_NATURAL_REQUEST:
                return {loading: true, }
                
            case CREATE_NATURAL_SUCCESS:
                return {loading: false, success: true,
                     naturalProduct:action.payload
                }
    
            case CREATE_NATURAL_FAIL:
                return {loading: false, error:action.payload}  
    
            case CREATE_NATURAL_RESET:
                return {}
            default:
                return state;
        }
    }
     
    
    
    export const naturalUpdateReducer = (state= {naturalProduct  : {}}, action)=>{
        switch (action.type) {
            case UPDATE_NATURAL_REQUEST:
                return {loading: true, }
                
            case UPDATE_NATURAL_SUCCESS:
                return {loading: false, success: true,
                    naturalProduct :action.payload
                }
    
            case UPDATE_NATURAL_FAIL:
                return {loading: false, error:action.payload}  
    
            case UPDATE_NATURAL_RESET:
                return {}
            default:
                return state;
        }
    }
    
    
    export const naturalDeleteReducer = (state= {} , action)=>{
        switch (action.type) {
            case DELETE_NATURAL_REQUEST:
                return {loading: true}
    
    
            case DELETE_NATURAL_SUCCESS :
                return {loading:false, success:true}
            
            case DELETE_NATURAL_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }


export const NaturalCreateReviewReducer = (state= { } , action)=>{
    switch (action.type) {
        case NATURAL_CREATE_REVIEW_REQUEST:
            return {loading: true}


        case NATURAL_CREATE_REVIEW_SUCCESS :
            return {loading:false, success:true, }


        case NATURAL_CREATE_REVIEW_FAIL :
            return {loading:false, error:action.payload}

        case NATURAL_CREATE_REVIEW_RESET :
            return {}

        default:
            return state
    }

}
