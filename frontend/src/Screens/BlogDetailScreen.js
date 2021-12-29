// @flow strict

import  React,{useState,useEffect} from 'react';
import {Link,} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Button,Card,Form,Carousel} from 'react-bootstrap'
import Rating from '../Components/Rating';
//import products from '../products';
import { useDispatch,useSelector } from "react-redux";

import { listBlogsDetails} from '../Actions/blogActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { createBlogReview } from '../Actions/blogActions';
import { BLOG_CREATE_REVIEW_RESET } from '../Constants/blogConstants';





function BlogDetailsScreen({match,history}) {


    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()
    const  blogDetail = useSelector(state=> state.blogDetails)
    const {error,loading,blog} =  blogDetail

    const createReview = useSelector(state=> state.blogCreateReview)
    const {error:errorReview,loading:loadingReview,success:successReview} = createReview

    
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

   

   useEffect(()=>{

    if(successReview){
        setRating(0)
        setComment("")
        dispatch({type:BLOG_CREATE_REVIEW_RESET})
    }
   
   
    dispatch(listBlogsDetails(match.params.id))
      
   },[dispatch,match, successReview])



  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createBlogReview(
        match.params.id, {
        
            rating,
            comment
        }
    ))

}

   

    

    
    return (
        <div>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/> 
                : error ? <Message variant="danger">{error}</Message> : (
                    <div>
                    <Row>
                <Col md={6}>
                 <Image src={blog.thumbnail} alt={blog.title} fluid/>
                 <br/>
                </Col>
             
              <br/>
           

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{blog.title}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={blog.rating} text={`${blog.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        

                    

                        <ListGroup.Item>
                            description: {blog.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                
            
                

                <Col md={3}>
                  
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <h4>Reviews</h4>
                {blog.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
                <ListGroup variant="flush">
                    {blog.reviews.map((review)=>(
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

export default BlogDetailsScreen

;