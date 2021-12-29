import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
    
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,

    
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    CREATE_BLOG_RESET,

    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    UPDATE_BLOG_RESET,

    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    DELETE_BLOG_RESET,

    
    BLOG_CREATE_REVIEW_REQUEST,
    BLOG_CREATE_REVIEW_SUCCESS,
    BLOG_CREATE_REVIEW_FAIL,
    BLOG_CREATE_REVIEW_RESET,

    
    } from  '../Constants/blogConstants'
    

import axios from "axios"


export const listBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: BLOG_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/blog/getallblogs/`)

        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listBlogsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAILS_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/blog/${id}/blogdetails/`)

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createBlogs = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_BLOG_REQUEST
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
            `http://127.0.0.1:8000/api/blog/createblog/`,
            {},
            config
        )
        dispatch({
            type: CREATE_BLOG_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_BLOG_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const blogUpdate = (blog)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: UPDATE_BLOG_REQUEST, })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://127.0.0.1:8000/api/blog/${blog._id}/updateBlog/`,
        blog,
        config)

        dispatch({
           type: UPDATE_BLOG_SUCCESS,
            payload: data
        })

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_BLOG_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const blogDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_BLOG_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`http://127.0.0.1:8000/api/blog/${id}/deleteblog/`,
        config)

        dispatch({
            type: DELETE_BLOG_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_BLOG_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createBlogReview = (blogId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_REVIEW_REQUEST
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
            `/api/blog/${blogId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: BLOG_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: BLOG_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}











