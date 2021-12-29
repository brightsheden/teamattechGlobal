// @flow strict

import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table,Card,Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import {  FaPlus} from 'react-icons/fa'

import classes from './ProfileCard.module.css'

function Profilescreen({history}) {
    const dispatch = useDispatch()

   




    
    

    

  

   
    return (
        
        <div>
          
            <Row>
            
             <Col>
             <h2>MY PROFILE</h2>
              <Card className="my-3 p-3 rounded"  variants="dark">
                  
                  <Card.Body>
                     <Card.Img src="images/2nd.jpg" className="rounded-circle" justify="true"/>
                      <Card.Title>
                          USERNAME:
                      </Card.Title>
                      <Card.Text>Austine Samuel</Card.Text>

                      <Card.Title>
                          Nickname:
                      </Card.Title>
                      <Card.Text>Austine B</Card.Text>

                      <Card.Title>
                          Email:
                      </Card.Title>
                      <Card.Text>user@gmail.com</Card.Text>
                  </Card.Body>

              </Card>
             </Col>
             <Col>
             <Row className='align-items-center'>
                <Col>
                    <h1>My Quiz</h1>
                </Col>

              
            </Row>
           
                <div>
                 
                </div>
            
             
             </Col>
                
            </Row>
        </div>
    );
};

export default Profilescreen;