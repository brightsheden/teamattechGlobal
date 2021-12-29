// @flow strict

import  React,{useState,useEffect} from 'react';
import {Link,} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap'
import Rating from '../Components/Rating';
//import products from '../products';
import { useDispatch,useSelector } from "react-redux";

import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { listIctDetails } from '../Actions/informationActions';
import { createInformationReview } from '../Actions/informationActions';
//import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { ICT_CREATE_REVIEW_RESET } from '../Constants/informationConstants';

function InformationDetailScreen({match,history}) {
    //const product = products.find((p)=> p._id === match.params.id)
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    const informationDetails = useSelector(state=> state.informationProductDetails)
    const {error,loading,ictProduct} = informationDetails

    const createReview = useSelector(state=> state.ictCreateReview)
    const {error:errorReview,loading:loadingReview ,success:successReview} = createReview


   

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin





    useEffect(()=>{
        if(successReview){
            setRating(0)
            setComment("")
            dispatch({type:ICT_CREATE_REVIEW_RESET})
        }
       
        dispatch(listIctDetails(match.params.id))


    },[dispatch,match, successReview])

    const addToCartHandler = ()=>{
        history.push(`/shippinginformation/${match.params.id}?qty=${qty}`)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createInformationReview(
            match.params.id, {
            
                rating,
                comment
            }
        ))

    }

    

    

    
    return (
        <div>
            <Link to='/informationproducts/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/> 
                : error ? <Message variant="danger">{error}</Message> : (
                    <div>
                    <Row>
                <Col md={6}>
                 <Image src={ictProduct.thumbnail} alt={ictProduct.title} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{ictProduct.title}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={ictProduct.rating} text={`${ictProduct.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Category: {ictProduct.category}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: N{ictProduct.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            description: {ictProduct.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col> Price:</Col>
                            <Col>N {ictProduct.price}</Col>
                        </Row>

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col> Status:</Col>
                            <Col>{ictProduct.stocks ? "In Stock": 'Out of Stock'}</Col>
                        </Row>

                </ListGroup.Item>

                    {ictProduct.stocks > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                               <Col xs='auto' className='my-1'>
                                 <Form.Control
                                 as="select"
                                 value={qty}
                                 onChange={(e)=> setQty(e.target.value)}
                                 >
                                     {
                                         [...Array(ictProduct.stocks).keys()].map((x)=>(
                                             <option key={x+1} value={x + 1}>
                                             {x + 1}    
                                             </option>
                                         ))
                                    }

                                 </Form.Control>
                               </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                <ListGroup.Item>
                    <Col>
                            <Button className="btn-block" type="button" disabled={ictProduct.stocks === 0}
                            onClick={addToCartHandler}>Add to Cart</Button>
                            </Col>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <h4>Reviews</h4>
                {ictProduct.reviews?.length === 0 && <Message variant="info">No Reviews</Message>}
                <ListGroup variant="flush">
                    {ictProduct.reviews?.map((review)=>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color="#f8e825"/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>

                        </ListGroup.Item>
                    ))}
                
                  
                    <ListGroup.Item>
                        <h4>Write a reviews</h4>

                        
                        {loadingReview && <Loader/>}
                        {successReview && <Message variant="success" >Review created</Message>}
                        {errorReview && <Message variant="danger" >{errorReview}</Message>}

                        
                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e)=>setRating(e.target.value)}
                                >
                                    <option value="" >Select...</option>
                                    <option value="1" >1 - Poor</option>
                                    <option value="2" >2 - Fair</option>
                                    <option value="3" >3 - Good</option>
                                    <option value="4" >4 - Very Good</option>
                                    <option value="5" >5 - Excellent</option>
                                </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId="comment">
                                    <Form.Label>Reviews</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        row="5"
                                        value={comment}
                                        onChange={(e)=>setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                    <Button
                                    disabled={loadingReview}
                                    type="submit"
                                    variant="primary">
                                    
                                    submit
                                </Button>
                            </Form>
                        ):(
                            <Message variant="info">Please <Link to="/login">Login</Link> to write  reviews</Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            
            </Col>
        </Row>
        </div>
                )}
            
        </div>
    );
};

export default InformationDetailScreen;