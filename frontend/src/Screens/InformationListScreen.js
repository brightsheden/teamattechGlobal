// @flow strict

import React,{useEffect} from 'react';
import {Col,Pagination,Row,} from 'react-bootstrap'

import InformationProducts from '../Components/informationProducts';
import { useDispatch,useSelector } from "react-redux";

import Loader from '../Components/Loader';
import Message from '../Components/Message';
//import Parginate from '../components/Parginate';
//import ProductCarosel from '../components/ProductCarosel';
import { listIctProducts } from '../Actions/informationActions';


function InformationListScreen({history}) {
    const dispatch = useDispatch()
    const informationList = useSelector(state => state.informationProductList)
    const {error,loading,ictProducts} = informationList
    
    let keyword = history.location.search
    console.log(keyword)
    console.log("keyword is",keyword)

    useEffect(()=>{
        dispatch(listIctProducts(keyword))
        
       
 

    },[dispatch, keyword])
  


    return (
        <div>
           

           
       
            
            <h1>LATEST ICT PRODUCTS</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
        <div>
            <Row>
                {ictProducts.map(ict => (
                <Col key={ict._id} sm={12} md={6} lg={4} xl={3}>
                    <InformationProducts  ict={ict}/>
                </Col>
                ))}
        
            </Row>
            
        </div>
             }
            
        </div>
    );
};

export default InformationListScreen;