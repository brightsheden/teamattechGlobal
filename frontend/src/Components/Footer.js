// @flow strict

import * as React from 'react';
import { Container,Col,Row } from "react-bootstrap";



function Footer() {
    return (
        <div>
            <Container>
                
                <Row>
           
                <Col className="text-center py-3">Copyright &copy;</Col>
                </Row>
            </Container>
            
        </div>
    );
};

export default Footer;