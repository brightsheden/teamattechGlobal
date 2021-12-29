// @flow strict
// @flow strict

import * as React from 'react';
import { Link } from "react-router-dom";
import { Row,Col,Form,Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { login } from '../Actions/userActions';

import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import Message from '../Components/Message';


function LoginScreen({history,location}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const redirect = location.search ? location.search.split('m')[1] : '/'
    const userLogin = useSelector(state=> state.userLogin)
    const {loading,error,userInfo} = userLogin


    const dispatch = useDispatch()
    React.useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
      
    }, [history,userInfo,redirect])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    
    }
  
    return (
        <>
            
            
                <FormContainer>

                    
                <h1>Sign In</h1>

                
            {error && <Message variant="danger">Incorrect Password or username</Message>}
            {loading && <Loader/>}
                
    
    
    
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Enter your username here"
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
    
    
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Enter your Password here"
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Sign In</Button>
    
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link  to={'/register'}>Register</Link>
                    </Col>
                </Row>
                </FormContainer>
       
            
        </>
       
    )
};

export default LoginScreen;