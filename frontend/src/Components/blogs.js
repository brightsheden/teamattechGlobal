// @flow strict

import * as React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating';
import { Link } from "react-router-dom";

function Blogs({blog}) {
    return (
        <Card className="my-3 p-3 rounded">
        <Link to={`/blog/${blog._id}`}>
            <Card.Img src={blog.thumbnail}/>
        </Link>
        <Card.Body>
        <Link to={`/blog/${blog._id}`}>
            <Card.Title as='div'>
                <strong>{blog.title}</strong>
            </Card.Title>

        </Link>

        <Card.Text as="div">
                <div className="my-3">
                    
                    <Rating value={blog.rating} text={`${blog.numReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>


        </Card.Body>
        </Card>
    );
};

export default Blogs;