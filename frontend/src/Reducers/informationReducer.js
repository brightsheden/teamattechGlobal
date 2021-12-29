import {
    ICT_LIST_REQUEST,
    ICT_LIST_SUCCESS,
    ICT_LIST_FAIL,
    
    ICT_DETAILS_REQUEST,
    ICT_DETAILS_SUCCESS,
    ICT_DETAILS_FAIL,
    
    CREATE_ICT_REQUEST,
    CREATE_ICT_SUCCESS,
    CREATE_ICT_FAIL,
    CREATE_ICT_RESET,
    
    UPDATE_ICT_REQUEST,
    UPDATE_ICT_SUCCESS,
    UPDATE_ICT_FAIL,
    UPDATE_ICT_RESET,
    
    DELETE_ICT_REQUEST,
    DELETE_ICT_SUCCESS,
    DELETE_ICT_FAIL,
    DELETE_ICT_RESET,

    ICT_CREATE_REVIEW_REQUEST,
    ICT_CREATE_REVIEW_SUCCESS,
    ICT_CREATE_REVIEW_FAIL,
    ICT_CREATE_REVIEW_RESET,
    
    
    } from  '../Constants/informationConstants'
    
    
    export const informationListReducer = (state= {ictProducts : []}, action)=>{
        switch (action.type) {
            case ICT_LIST_REQUEST:
                return {loading: true, ictProducts :[]}
                
            case ICT_LIST_SUCCESS:
                return {loading: false,
                    ictProducts:action.payload
                }
    
            case ICT_LIST_FAIL:
                return {loading: false, error:action.payload}    
    
            default:
                return state;
        }
    }
    
    
    export const informationDetailsReducer = (state= {ictProduct  : {reviews: []}} , action)=>{
        switch (action.type) {
            case ICT_DETAILS_REQUEST:
                return {loading: true, ...state}
    
    
            case ICT_DETAILS_SUCCESS :
                return {loading:false, ictProduct :action.payload}
            
            case ICT_DETAILS_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }
    
    
    export const informationCreateReducer = (state= {}, action)=>{
        switch (action.type) {
            case CREATE_ICT_REQUEST:
                return {loading: true, }
                
            case CREATE_ICT_SUCCESS:
                return {loading: false, success: true,
                     ictProduct:action.payload
                }
    
            case CREATE_ICT_FAIL:
                return {loading: false, error:action.payload}  
    
            case CREATE_ICT_RESET:
                return {}
            default:
                return state;
        }
    }
     
    
    
    export const informationUpdateReducer = (state= {ictProduct  : {}}, action)=>{
        switch (action.type) {
            case UPDATE_ICT_REQUEST:
                return {loading: true, }
                
            case UPDATE_ICT_SUCCESS:
                return {loading: false, success: true,
                    ictProduct :action.payload
                }
    
            case UPDATE_ICT_FAIL:
                return {loading: false, error:action.payload}  
    
            case UPDATE_ICT_RESET:
                return {}
            default:
                return state;
        }
    }
    
    
    export const informationDeleteReducer = (state= {} , action)=>{
        switch (action.type) {
            case DELETE_ICT_REQUEST:
                return {loading: true}
    
    
            case DELETE_ICT_SUCCESS :
                return {loading:false, success:true}
            
            case DELETE_ICT_FAIL :
                return {loading: false, error:action.payload}
    
            default:
                return state
        }
    
    }


    export const InformationCreateReviewReducer = (state= { } , action)=>{
        switch (action.type) {
            case ICT_CREATE_REVIEW_REQUEST:
                return {loading: true}
    
    
            case ICT_CREATE_REVIEW_SUCCESS :
                return {loading:false, success:true, }
    
    
            case ICT_CREATE_REVIEW_FAIL :
                return {loading:false, error:action.payload}
    
            case ICT_CREATE_REVIEW_RESET :
                return {}
    
            default:
                return state
        }
    
    }
    