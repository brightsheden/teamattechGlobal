// @flow strict

import React, { useEffect,useState } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Table,Button,Modal } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {deleteOrder, listOrders} from '../Actions/orderActions'
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { FaCheck,FaTrash } from 'react-icons/fa';

function AdminOrderScreen({history}) {

    const dispatch= useDispatch()

    const orderList = useSelector(state=> state.orderList)
    const {loading,error,orders} = orderList

    const orderDelete = useSelector(state=> state.orderDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = orderDelete

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else{
            history.push('/login')
        }

      
        
    },[dispatch,history,userInfo,successDelete])

    const deleteHandler = (id)=>{
        dispatch(deleteOrder(id))
        setShow(false)
    }

    const [show, setShow] = useState(false)
    const handleClose= ()=>{
        setShow(false)
    }
   
    const handleShow= ()=>{
       setShow(true)
   }
   

  

    return (
        <div>
            <h1>All Orders Made by Customers</h1>
            {loading ? (<Loader/>) :
            error ? (<Message variant="danger">{error}</Message>):
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>

                        </tr>
                     
                        
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? 
                                (order.paidAt?.substring(0,10)) :
                                  
                                (<FaCheck style={{color : "red"}}/>)}</td>

                                <td>{order.isDelivered ? 
                                (order.deliveredAt.substring(0,10)) :
                                  
                                (<FaCheck style={{color : "red"}}/>)}</td>
                                
                                <td>
                                    
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="light">
                                            Details
                                        </Button>
                                    </LinkContainer>

                                    
                                       
                                    <Button variant='danger' className='btn-sm' onClick={() => handleShow()}>
                                                    <FaTrash/>
                                                </Button>
                                                <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop='static'
                                                keyboard={false}

                                                
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirm Delete</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are You Sure ,You want to Delete this product</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(order._id)} >Delete</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                    
                                  
                                  
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
        </div>
    );
};

export default AdminOrderScreen;