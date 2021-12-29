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
    
    
    
    } from  '../Constants/informationConstants'


    import axios from "axios"


export const listIctProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ICT_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/informationTech/informationproducts/`)

        dispatch({
            type: ICT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ICT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listIctDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ICT_DETAILS_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/informationTech/${id}/informationproduct/`)

        dispatch({
            type:ICT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ICT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createIctProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ICT_REQUEST
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
            `http://127.0.0.1:8000/api/informationTech/create/`,
            {},
            config
        )
        dispatch({
            type: CREATE_ICT_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_ICT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const ictProductUpdate = (ictProduct)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: UPDATE_ICT_REQUEST, })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://127.0.0.1:8000/api/informationTech/${ictProduct._id}/update/`,
        ictProduct,
        config)

        dispatch({
           type: UPDATE_ICT_SUCCESS,
            payload: data
        })

        dispatch({
            type: ICT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ICT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const   ictProductDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_ICT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`http://127.0.0.1:8000/api/informationTech/${id}/delete/`,
        config)

        dispatch({
            type: DELETE_ICT_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_ICT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createInformationReview = (productId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ICT_CREATE_REVIEW_REQUEST
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
            `/api/informationTech/${productId}/createreview/`,
            review,
            config
        )
        dispatch({
            type: ICT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ICT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



