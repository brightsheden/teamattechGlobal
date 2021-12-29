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
    
    NATURAL_CREATE_REVIEW_REQUEST,
    NATURAL_CREATE_REVIEW_SUCCESS,
    NATURAL_CREATE_REVIEW_FAIL,
    NATURAL_CREATE_REVIEW_RESET,
    
    
    } from  '../Constants/naturalConstants'


    import axios from "axios"


export const listNaturalProducts = () => async (dispatch) => {
    try {
        dispatch({ type: NATURAL_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/natural/naturalproducts/`)

        dispatch({
            type: NATURAL_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NATURAL_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listNatutalDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: NATURAL_DETAILS_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/natural/${id}/naturalproduct/`)

        dispatch({
            type:NATURAL_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NATURAL_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createNaturalProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_NATURAL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/natural/create/`,
            {},
            config
        )
        dispatch({
            type: CREATE_NATURAL_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_NATURAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const naturalProductUpdate = (naturalProduct)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: UPDATE_NATURAL_REQUEST, })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://127.0.0.1:8000/api/natural/${naturalProduct._id}/update/`,
        naturalProduct,
        config)

        dispatch({
           type: UPDATE_NATURAL_SUCCESS,
            payload: data
        })

        dispatch({
            type: NATURAL_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_NATURAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const naturalProductDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_NATURAL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`http://127.0.0.1:8000/api/natural/${id}/delete/`,
        config)

        dispatch({
            type: DELETE_NATURAL_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_NATURAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createNaturalReview = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NATURAL_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/natural/${productId}/createreview/`,
            review,
            config
        )
        dispatch({
            type: NATURAL_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: NATURAL_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





