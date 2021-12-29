// @flow strict

import * as React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating';
import { Link } from "react-router-dom";

function AgricProducts({agric}) {
    return (
        <Card className="my-3 p-3 rounded">
        <Link to={`/agricproduct/${agric._id}`}>
            <Card.Img src={agric.thumbnail}/>
        </Link>
        <Card.Body>
        <Link to={`/agricproduct/${agric._id}`}>
            <Card.Title as='div'>
                <strong>{agric.title}</strong>
            </Card.Title>

        </Link>

        <Card.Text as="div">
                <div className="my-3">
                    
                    <Rating value={agric.rating} text={`${agric.numReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>


            <Card.Text as='h3'>
                ${agric.price}
            </Card.Text>

        </Card.Body>
        </Card>
    );
};

export default AgricProducts ;