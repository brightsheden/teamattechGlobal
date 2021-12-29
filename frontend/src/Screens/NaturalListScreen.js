// @flow strict

import React,{useEffect} from 'react';
import {Col,Pagination,Row,} from 'react-bootstrap'

import NaturalProduct from '../Components/NaturalProducts'
import { useDispatch,useSelector } from "react-redux";

import Loader from '../Components/Loader';
import Message from '../Components/Message';
//import Parginate from '../components/Parginate';
//import ProductCarosel from '../components/ProductCarosel';
import { listNaturalProducts } from '../Actions/naturalActions';


function NaturalListScreen({history}) {
    const dispatch = useDispatch()
    const naturalList = useSelector(state => state.naturalProductList)
    const {error,loading,naturalProducts} = naturalList
    
    let keyword = history.location.search
    useEffect(()=>{
        dispatch(listNaturalProducts())
        
       
 

    },[dispatch])
  


    return (
        <div>
           
            
            <h1>LATEST NATURALPRODUCTS</h1>
            {loading ? <Loader/> :
            error ? <Message variant='danger'>{error}</Message>:
        <div>
            <Row>
                {naturalProducts.map(natural => (
                <Col key={natural._id} sm={12} md={6} lg={4} xl={3}>
                    <NaturalProduct natural={natural}/>
                </Col>
                ))}
        
            </Row>
            
        </div>
             }
            
        </div>
    );
};

export default NaturalListScreen;