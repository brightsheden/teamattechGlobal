// @flow strict

import * as React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating';
import { Link } from "react-router-dom";

function NaturalProducts({natural}) {
    return (
        <Card className="my-3 p-3 rounded">
        <Link to={`/naturalproduct/${natural._id}`}>
            <Card.Img src={natural.thumbnail}/>
        </Link>
        <Card.Body>
        <Link to={`/naturalproduct/${natural._id}`}>
            <Card.Title as='div'>
                <strong>{natural.title}</strong>
            </Card.Title>

        </Link>

        <Card.Text as="div">
                <div className="my-3">
                    
                    <Rating value={natural.rating} text={`${natural.numReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>


            <Card.Text as='h3'>
                ${natural.price}
            </Card.Text>

        </Card.Body>
        </Card>
    );
};

export default NaturalProducts ;