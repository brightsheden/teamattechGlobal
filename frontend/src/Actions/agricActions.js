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


    import axios from "axios"


export const listAgricProducts = () => async (dispatch) => {
    try {
        dispatch({ type: AGRIC_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/agric/agricProducts/`)

        dispatch({
            type: AGRIC_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: AGRIC_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listAgricDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: AGRIC_DETAILS_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/agric/${id}/agricproduct/`)

        dispatch({
            type:AGRIC_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: AGRIC_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createAgricProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_AGRIC_REQUEST
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
            `http://127.0.0.1:8000/api/agric/create/`,
            {},
            config
        )
        dispatch({
            type: CREATE_AGRIC_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_AGRIC_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const agricProductUpdate = (agricProduct)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: UPDATE_AGRIC_REQUEST, })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://127.0.0.1:8000/api/agric/${agricProduct._id}/update/`,
        agricProduct,
        config)

        dispatch({
           type: UPDATE_AGRIC_SUCCESS,
            payload: data
        })

        dispatch({
            type: AGRIC_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_AGRIC_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const agricProductDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_AGRIC_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`http://127.0.0.1:8000/api/agric/${id}/delete/`,
        config)

        dispatch({
            type: DELETE_AGRIC_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_AGRIC_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createAgricReview = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AGRIC_CREATE_REVIEW_REQUEST
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
            `/api/agric/${productId}/createreview/`,
            review,
            config
        )
        dispatch({
            type: AGRIC_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: AGRIC_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





