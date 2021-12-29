
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Modal,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {  FaEdit,  FaTrash,FaPlus} from 'react-icons/fa'
//import Paginate from '../components/Paginate'

import { CREATE_AGRIC_RESET } from '../Constants/agricConstants'

import { createAgricProduct, listAgricProducts, agricProductDelete } from '../Actions/agricActions'
// @flow strict


function AgricScreeen({match,history}) {

    const dispatch = useDispatch()

    const agricList = useSelector(state => state.agricProductList)
    const {error,loading,agricProducts} = agricList
    

    const deleteAgric = useSelector(state => state.deleteAgricProduct)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteAgric

    
    const createAgric = useSelector(state => state.createAgricProduct)
    const {loading:loadingcreateAgric, error: errorcreateAgric,
        agricProduct: createdAgric,
        success:successCreateAgric} = createAgric

        const updateAgric = useSelector(state => state.updateAgricProduct)
        const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateAgric

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: CREATE_AGRIC_RESET })

        if (!userInfo.isAdmin) {
            history.push('/')
        }
        if(successCreateAgric){
            
            history.push(`/admin/agric/${createdAgric._id}/edit/`)
            
            
        }
        else{
            dispatch(listAgricProducts())
        }                   

      
            
        

    }, [dispatch, history, userInfo, successCreateAgric,createdAgric, successDelete, successUpdate])


    const deleteHandler = (id) => {

      
        dispatch(agricProductDelete(id))
        setShow(false)
        
    }

    const createAgricHandler = (e)=>{
        dispatch(createAgricProduct())
    }
    

    const [show, setShow] = useState(false)
    const handleClose= ()=>{
        setShow(false)
    }
   
    const handleShow= ()=>{
       setShow(true)
   }
   
    return (
        <div>
              <Row className='align-items-center'>
                <Col>
                    <h1>ALL AGRICPRODUCTS</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createAgricHandler}>
                        <FaPlus/> Create Agric Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


           
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>TITLE</th>
                                        <th>IMAGE</th>
                                        <th>PRICE</th>
                                        <th>STOCKS</th>
                                        
                                        <th>edit /delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {agricProducts.map(agric => (
                                        <tr key={agric._id}>
                                            <td>{agric._id}</td>
                                            <td>{agric.author}</td>
                                            <td>{agric.title}</td>
                                            <td><Image style={{
                                                  width: '50px',
                                                  height: '50px'
                                            }} src={agric.thumbnail}/> </td>
                                            <td>{agric.price}</td>
                                            <td>{agric.stocks}</td>
                                          

                                            <td>
                                                <LinkContainer to={`/admin/agric/${agric._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <FaEdit/>
                                                        
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => handleShow()}>
                                                    <FaTrash/>
                                                </Button>
                                                <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop='static'
                                                keyboard={false}

                                                
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirm Delete</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are You Sure ,You want to Delete this product</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(agric._id)} >Delete</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                        </div>
                    )}
        </div>
    );
};

export default AgricScreeen;