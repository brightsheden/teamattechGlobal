// @flow strict

import React,{useEffect} from 'react';
import {Col,Pagination,Row,} from 'react-bootstrap'

import Blog from '../Components/blogs'
import { useDispatch,useSelector } from "react-redux";

import Loader from '../Components/Loader';
import Message from '../Components/Message';
//import Parginate from '../components/Parginate';
//import ProductCarosel from '../components/ProductCarosel';
import { listBlogs, blogUpdate,blogDelete } from '../Actions/blogActions';


function BlogListScreen({history}) {
    const dispatch = useDispatch()
    const blogLists = useSelector(state => state.bloglist)
    const {error,loading,blogs} = blogLists
    
    let keyword = history.location.search
    useEffect(()=>{
        dispatch(listBlogs())
        
       
 

    },[dispatch])
  


    return (
        <div>
           
            
            <h1>latest Blogs</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
        <div>
            <Row>
                {blogs?.map(blog => (
                <Col key={blog._id} sm={12} md={6} lg={4} xl={3}>
                    <Blog blog={blog}/>
                </Col>
                ))}
        
            </Row>
            
        </div>
             }
            
        </div>
    );
};

export default BlogListScreen;