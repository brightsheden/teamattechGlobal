
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Modal,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {  FaEdit,  FaTrash,FaPlus} from 'react-icons/fa'
//import Paginate from '../components/Paginate'

import { CREATE_NATURAL_RESET } from '../Constants/naturalConstants'

import { createNaturalProduct, listNaturalProducts, naturalProductDelete } from '../Actions/naturalActions'
// @flow strict


function NaturalScreeen({match,history}) {

    const dispatch = useDispatch()

    const naturalList = useSelector(state => state.naturalProductList)
    const {error,loading,naturalProducts} = naturalList
    

    const deleteNatural = useSelector(state => state.deleteNaturalProduct)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteNatural

    
    const createNatural = useSelector(state => state.createNaturalProduct)
    const {loading:loadingcreateNatural, error: errorcreateNatural,
        naturalProduct: createdNatural,
        success:successCreateNatural} = createNatural

        const updateNatural = useSelector(state => state.updateNaturalProduct)
        const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateNatural

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: CREATE_NATURAL_RESET })

        if (!userInfo.isAdmin) {
            history.push('/')
        }
        if(successCreateNatural){
            
            history.push(`/admin/natural/${createdNatural._id}/edit/`)
            
            
        }
        else{
            dispatch(listNaturalProducts())
        }                   

      
            
        

    }, [dispatch, history, userInfo, successCreateNatural,createdNatural, successDelete, successUpdate])


    const deleteHandler = (id) => {

      
        dispatch(naturalProductDelete(id))
        setShow(false)
        
    }

    const createNaturalHandler = (e)=>{
        dispatch(createNaturalProduct())
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
                    <h1>ALL NATURAL AND ENERGY RESOURCES PRODUCTS</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createNaturalHandler}>
                        <FaPlus/> Create Natural Product
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
                                    {naturalProducts.map(natural => (
                                        <tr key={natural._id}>
                                            <td>{natural._id}</td>
                                            <td>{natural.author}</td>
                                            <td>{natural.title}</td>
                                            <td><Image style={{
                                                  width: '50px',
                                                  height: '50px'
                                            }} src={natural.thumbnail}/> </td>
                                            <td>{natural.price}</td>
                                            <td>{natural.stocks}</td>
                                          

                                            <td>
                                                <LinkContainer to={`/admin/natural/${natural._id}/edit`}>
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
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(natural._id)} >Delete</Button>
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

export default NaturalScreeen;