import React from "react";
import { Navbar,Nav,Container,NavDropdown} from "react-bootstrap";
import {LinkContainer,} from 'react-router-bootstrap'
import { FaNewspaper, FaUser} from 'react-icons/fa'
// @flow strict

import {useDispatch,useSelector} from 'react-redux'
import { logout } from "../Actions/userActions";
import SearchBox from "./SearchBox";

function Header() {

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const Logout = ()=>{
        dispatch(logout())
       

    }
    
    return (
        <div>
            <header>
                <Navbar  bg="info" variant="dark" expand="lg" collapseOnSelect>
                    <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand>TEAMATTECH GLOBAL</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox/>
                        <Nav className="ml-auto pull-right">
                            <NavDropdown id='username' title="user">
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={()=> Logout()}>Logout</NavDropdown.Item>
                            
                            </NavDropdown>
                            {!userInfo && (
                                <LinkContainer to='/login'>
                                <Nav.Link><FaUser style={{margin: "5"}}/>Login</Nav.Link>
                            </LinkContainer>
                            )}
                          

                          {!userInfo && (
                                <LinkContainer to='/register'>
                                <Nav.Link><FaUser style={{margin: "5"}}/>sign up</Nav.Link>
                            </LinkContainer>
                            )}
                          

                            {userInfo?.isAdmin && (
                                 <LinkContainer to='/adminpage'>
                                 <Nav.Link><FaUser style={{margin: "5"}}/>Admin</Nav.Link>
                             </LinkContainer>
                            )}

                            <LinkContainer to='/blogs'>
                                <Nav.Link><FaNewspaper style={{margin: "5"}}/>Blog</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    </Navbar.Collapse>

                    
                    </Container>


                </Navbar>
            </header>
            
        </div>
    );
};

export default Header;