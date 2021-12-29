
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col,Modal,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import {  FaEdit,  FaTrash,FaPlus} from 'react-icons/fa'
//import Paginate from '../components/Paginate'

import { CREATE_ICT_RESET } from '../Constants/informationConstants'

import { createIctProduct, listIctProducts, ictProductDelete } from '../Actions/informationActions'
// @flow strict


function InformationScreeen({match,history}) {

    const dispatch = useDispatch()

    const informationList = useSelector(state => state.informationProductList)
    const {error,loading,ictProducts} = informationList
    

    const deleteInformation = useSelector(state => state.deleteInformationProduct)
    const {loading:loadingDelete, error:errorDelete, success:successDelete,} = deleteInformation

    
    const createInformation = useSelector(state => state.createInformationProduct)
    const {loading:loadingcreateNatural, error: errorcreateNatural,
        ictProduct: createdInformation,
        success:successCreateInformation} = createInformation

        const updateInformation = useSelector(state => state.updateInformationProduct)
        const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateInformation

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: CREATE_ICT_RESET })

        if (!userInfo.isAdmin) {
            history.push('/')
        }
        if(successCreateInformation){
            
            history.push(`/admin/information/${createdInformation._id}/edit/`)
            
            
        }
        else{
            dispatch(listIctProducts())
        }                   

      
            
        

    }, [dispatch, history, userInfo, successCreateInformation,createdInformation, successDelete, successUpdate])


    const deleteHandler = (id) => {

      
        dispatch(ictProductDelete(id))
        setShow(false)
        
    }

    const createIctHandler = (e)=>{
        dispatch(createIctProduct())
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
                    <h1>ALL INFORMATION, COMMUNICATIION AND TECHNOLOGY PRODUCTS</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createIctHandler}>
                        <FaPlus/> Create ICT Product
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
                                        <th>CATEGORY</th>
                                        <th>STOCKS</th>
                                        <th>PREMIUM</th>
                                        
                                        <th>edit /delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {ictProducts.map(ict => (
                                        <tr key={ict._id}>
                                            <td>{ict._id}</td>
                                            <td>{ict.author}</td>
                                            <td>{ict.title}</td>
                                            <td><Image style={{
                                                  width: '50px',
                                                  height: '50px'
                                            }} src={ict.thumbnail}/> </td>
                                            <td>{ict.price}</td>
                                            <td>{ict.category}</td>
                                            <td>{ict.stocks}</td>
                                            <td>{ict.is_premium ? <p>Yes</p>: (
                                               <p>NO</p>
                                            )}</td>
                                            
                                          

                                            <td>
                                                <LinkContainer to={`/admin/information/${ict._id}/edit`}>
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
                                                        <Button variant='danger' className='btn-sm'onClick={()=> deleteHandler(ict._id)} >Delete</Button>
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

export default InformationScreeen;