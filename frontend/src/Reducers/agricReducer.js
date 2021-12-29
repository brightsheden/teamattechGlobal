import {
    AGRIC_LIST_REQUEST,
    AGRIC_LIST_SUCCESS,
    AGRIC_LIST_FAIL,
    
    AGRIC_DETAILS_REQUEST,
    AGRIC_DETAILS_SUCCESS,
    AGRIC_DETAILS_FAIL,
    
    CREATE_AGRIC_REQUEST,
    CREATE_AGRIC_SUCCESS,
    CREATE_AGRIC_FAIL,
    CREATE_AGRIC_RESET,
    
    UPDATE_AGRIC_REQUEST,
    UPDATE_AGRIC_SUCCESS,
    UPDATE_AGRIC_FAIL,
    UPDATE_AGRIC_RESET,
    
    DELETE_AGRIC_REQUEST,
    DELETE_AGRIC_SUCCESS,
    DELETE_AGRIC_FAIL,
    DELETE_AGRIC_RESET,

    AGRIC_CREATE_REVIEW_REQUEST,
    AGRIC_CREATE_REVIEW_SUCCESS,
    AGRIC_CREATE_REVIEW_FAIL,
    AGRIC_CREATE_REVIEW_RESET,
    
    
    } from  '../Constants/agricConstants'
    
    
    export const agricListReducer = (state= {agricProducts : []}, action)=>{
        switch (action.type) {
            case AGRIC_LIST_REQUEST:
                return {loading: true, agricProducts :[]}
                
            case AGRIC_LIST_SUCCESS:
                return {loading: false,
                    agricProducts:action.payload
                }
    
            case AGRIC_LIST_FAIL:
                return {loading: false, error:action.payload}    
    
            default:
                return state;
        }
    }
    
    
    export const agricDetailsReducer = (state= {agricProduct  : {reviews: []}} , action)=>{
        switch (action.type) {
            case AGRIC_DETAILS_REQUEST:
                return {loading: true, ...state}
    
    
            case AGRIC_DETAILS_SUCCESS :
                return {loading:false, agricProduct :action.payload}
            
            case AGRIC_DETAILS_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }
    
    
    export const agricCreateReducer = (state= {}, action)=>{
        switch (action.type) {
            case CREATE_AGRIC_REQUEST:
                return {loading: true, }
                
            case CREATE_AGRIC_SUCCESS:
                return {loading: false, success: true,
                     agricProduct:action.payload
                }
    
            case CREATE_AGRIC_FAIL:
                return {loading: false, error:action.payload}  
    
            case CREATE_AGRIC_RESET:
                return {}
            default:
                return state;
        }
    }
     
    
    
    export const agricUpdateReducer = (state= {agricProduct  : {}}, action)=>{
        switch (action.type) {
            case UPDATE_AGRIC_REQUEST:
                return {loading: true, }
                
            case UPDATE_AGRIC_SUCCESS:
                return {loading: false, success: true,
                    agricProduct :action.payload
                }
    
            case UPDATE_AGRIC_FAIL:
                return {loading: false, error:action.payload}  
    
            case UPDATE_AGRIC_RESET:
                return {}
            default:
                return state;
        }
    }
    
    
    export const agricDeleteReducer = (state= {} , action)=>{
        switch (action.type) {
            case DELETE_AGRIC_REQUEST:
                return {loading: true}
    
    
            case DELETE_AGRIC_SUCCESS :
                return {loading:false, success:true}
            
            case DELETE_AGRIC_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }
    

export const AgricCreateReviewReducer = (state= { } , action)=>{
    switch (action.type) {
        case AGRIC_CREATE_REVIEW_REQUEST:
            return {loading: true}


        case AGRIC_CREATE_REVIEW_SUCCESS :
            return {loading:false, success:true, }


        case AGRIC_CREATE_REVIEW_FAIL :
            return {loading:false, error:action.payload}

        case AGRIC_CREATE_REVIEW_RESET :
            return {}

        default:
            return state
    }

}