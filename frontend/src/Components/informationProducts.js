// @flow strict

import * as React from 'react';
import {Card} from 'react-bootstrap'
import Rating from './Rating';
import { Link } from "react-router-dom";

function InformationProducts({ict}) {
    return (
        <Card className="my-3 p-3 rounded">
        <Link to={`/informationproduct/${ict._id}`}>
            <Card.Img src={ict.thumbnail}/>
        </Link>
        <Card.Body>
        <Link to={`/informationproduct/${ict._id}`}>
            <Card.Title as='div'>
                <strong>{ict.title}</strong>
            </Card.Title>

        </Link>

        <Card.Text as='p'>
                {ict.category}
            </Card.Text>


        <Card.Text as="div">
                <div className="my-3">
                    
                    <Rating value={ict.rating} text={`${ict.numReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>

          

            <Card.Text as='h3'>
                ${ict.price}
            </Card.Text>

        </Card.Body>
        </Card>
    );
};

export default InformationProducts ;