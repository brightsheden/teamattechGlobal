import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'


//import { listMyOrders } from '../actions/orderActions
import {listMyOrders} from '../Actions/orderActions'

function ProfileScreen({ history }) {

 
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

  

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            
               
                dispatch(listMyOrders())
                
            
        }
    }, [dispatch,history,userInfo,])

    return (
        <Row>
          
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default ProfileScreen


