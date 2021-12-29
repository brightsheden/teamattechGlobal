// @flow strict

import * as React from 'react';
//import * as React from 'react';
import { Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { savePaymentMethod } from '../Actions/agricCartActions';
import FormContainer from '../Components/FormContainer';

import CheckoutSteps from '../Components/CheckoutSteps';

function PaymentScreen({history}) {
   

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [paymentMethod, setPaymentMthod] = React.useState("")

    const dispatch = useDispatch()
    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
        console.log('order')
    }
    return (

        
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
            
                                <Form.Group controlId="rating">
                                <Form.Label>payment method</Form.Label>
                                <Form.Control
                                as="select"
                                value={paymentMethod}
                                onChange={(e)=>setPaymentMthod(e.target.value)}
                                >
                                    <option value="" >Select...</option>
                                    <option value="PayStack" >1 - Online Payment</option>
                                    <option value="Cash Payment" >2 - Cash payment</option>
                               
                                </Form.Control>
                                </Form.Group>

                
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;