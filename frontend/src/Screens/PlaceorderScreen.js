// @flow strict

import * as React from 'react';
import { Button,Col,Row,Card,Image,ListGroup } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import CheckoutSteps from '../Components/CheckoutSteps';
import { Link } from 'react-router-dom';
import Message from '../Components/Message'
import { createOrder } from '../Actions/orderActions';
import { ORDER_CREATE_RESET } from '../Constants/orderConstant';

function PlaceorderScreen({history}) {

    const orderCreate = useSelector(state=> state.orderCreate)
    const {success,error,order} = orderCreate
    
    const cart = useSelector(state => state.cart)
    const dispatch= useDispatch()

    cart.itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemPrice > 100 ? 0 : 10 ).toFixed(2)
    cart.taxPrice = (Number(0.082)*cart.itemPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    if(!cart.paymentMethod){
        history.push("/payment")
    }

    React.useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    },[history,success,dispatch,order])

    const placeOrder= ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:  cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice : cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice: cart.totalPrice, 
        }))
        console.log('purchase')
    
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
             <Row>
                 <Col md={8}>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <h2>shipping</h2>
                             <p>
                                 <strong>Shipping: </strong>
                                 {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                 {' '}
                                 {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                             </p>
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <h2>Payment Method</h2>
                             <p>
                                 <strong>Method: </strong>
                                 {cart.paymentMethod} 
                             </p>
                         </ListGroup.Item>

                         <ListGroup.Item>
                             <h2>Order Items</h2>
                             {cart.cartItems.length === 0 ? <Message variant="info">Your Cart Is Empty</Message>:
                             (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.thumbnail} alt={item.title}  fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.title}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup> 
                             )}
                                 
                                
                             
                         </ListGroup.Item>

                     </ListGroup>

                 </Col>
                 <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                           <ListGroup.Item>
                               <h2>order summary</h2>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Item: </Col>
                                   <Col>${cart.itemPrice}</Col>
                               </Row>
                           </ListGroup.Item>


                           <ListGroup.Item>
                               <Row>
                                   <Col>shipping: </Col>
                                   <Col>${cart.shippingPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax: </Col>
                                   <Col>${cart.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Total: </Col>
                                   <Col>${cart.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               {error && <Message variant="danger">{error}</Message>}
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Button
                                type="button"
                                className="btn-block"
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                               >Place Order</Button>
                           </ListGroup.Item>
                        </ListGroup>
                    </Card>
                 </Col>
             </Row>
        </div>
    );
};

export default PlaceorderScreen;