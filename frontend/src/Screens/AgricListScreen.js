// @flow strict

import React,{useEffect} from 'react';
import {Col,Pagination,Row,} from 'react-bootstrap'

import AgricProduct from '../Components/AgricProducts'
import { useDispatch,useSelector } from "react-redux";

import Loader from '../Components/Loader';
import Message from '../Components/Message';
//import Parginate from '../components/Parginate';
//import ProductCarosel from '../components/ProductCarosel';
import { listAgricProducts} from '../Actions/agricActions';


function AgricListScreen({history}) {
    const dispatch = useDispatch()
    const agricList = useSelector(state => state.agricProductList)
    const {error,loading,agricProducts} = agricList
    
    let keyword1 = history.location.search
    useEffect(()=>{
        dispatch(listAgricProducts(keyword1))
        
       
 

    },[dispatch,keyword1])
  


    return (
        <div>
           
            
            <h1>LATEST AGRICPRODUCTS</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
        <div>
            <Row>
                {agricProducts?.map(agric => (
                <Col key={agric._id} sm={12} md={6} lg={4} xl={3}>
                    <AgricProduct agric={agric}/>
                </Col>
                ))}
        
            </Row>
            
        </div>
             }
            
        </div>
    );
};

export default AgricListScreen;