import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { listAgricDetails, agricProductUpdate } from '../Actions/agricActions'
import { UPDATE_AGRIC_RESET } from '../Constants/agricConstants'
//import { getUserDetails, updateUser } from '../actions/userActions'



function AgricEditScreen({ match, history }) {

    const agricProductId = match.params.id

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [thumbnail, setThumbnail] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [stocks, setStocks] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)



    const dispatch = useDispatch()

    const agricDetails = useSelector(state=> state.agricProductDetails)
    const {error,loading,agricProduct} = agricDetails

    const agricUpdate = useSelector(state => state.updateAgricProduct)
    const { error:errorUpdate, loading:loaadingUpdate,success:successUpdate } = agricUpdate



    useEffect(() => {

        if(successUpdate){
            dispatch({type: UPDATE_AGRIC_RESET})
            history.push("/admin/agric")
        }else{
            if (!agricProduct.title || agricProduct._id !== Number(agricProductId)) {
                dispatch(listAgricDetails(agricProductId))
            } else {
                setTitle(agricProduct.title)
                setPrice(agricProduct.price)
                setThumbnail(agricProduct.thumbnail)
                setImage1(agricProduct.image1)
                setImage2(agricProduct.image2)
                setImage3(agricProduct.setImage2)
                setStocks(agricProduct.stocks)
                setDescription(agricProduct.description)
        }

        }
        
   
           
    }, [dispatch, agricProduct, agricProductId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(agricProductUpdate(
            {
                _id:  agricProduct._id,
                title,
                description,
                thumbnail,
                image1,
                image2,
                image3,
                price,
                stocks,
                
            }
        ))
        console.log("updated")
        history.push('/admin/agric/')
       //dispatch(updateUsers ({ _id: user._id, name, email, isAdmin }))
    }

    const uploadThumbnailHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('agricProduct_id', agricProductId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/agric/uploadthumbnail/", formData,config)
            setUploading(false)
            setThumbnail(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadImage1Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image1',file)
        formData.append('agricProduct_id', agricProductId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/agric/uploadimage1/", formData,config)
            setUploading(false)
            setImage1(data)
        } catch (error) {
            setUploading(false)
            
        }

    }


    const uploadImage2Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image2',file)
        formData.append('agricProduct_id', agricProductId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/agric/uploadimage2/", formData,config)
            setUploading(false)
            setImage2(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

    const uploadImage3Handler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image3',file)
        formData.append('agricProduct_id', agricProductId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/agric/uploadimage3/", formData,config)
            setUploading(false)
            setImage3(data)
        } catch (error) {
            setUploading(false)
            
        }

    }




    return (
        <div>
            <Link to='/admin/agric'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Agric Product</h1>
                        {loaadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{error}</Message>}

                        {loading? (<Loader/>): error? (<Message variant="danger">{error}</Message>)
                            :
                            (
                                <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            

                            <Form.Group controlId='price'>
                                <Form.Label>price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Thumbnail</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='select image'
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="image-file"
                                 label="choose file"
                                 custom
                                 onChange={uploadThumbnailHandler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>image1</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='select image'
                                    value={image1}
                                    onChange={(e) => setImage1(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="image-file"
                                 label="choose file"
                                 custom
                                 onChange={uploadImage1Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>image2</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='select image'
                                    value={image2}
                                    onChange={(e) => setImage2(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="image-file"
                                 label="choose file"
                                 custom
                                 onChange={uploadImage2Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>image3</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='select image'
                                    value={image3}
                                    onChange={(e) => setImage3(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="image-file"
                                 label="choose file"
                                 custom
                                 onChange={uploadImage3Handler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='countInstock'>
                                <Form.Label>countInstock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter countInstock'
                                    value={stocks}
                                    onChange={(e) => setStocks(e.target.value)}

                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>description</Form.Label>
                                <Form.Control 

                                    as='textarea'
                                    row={10}
                                    placeholder='Enter description here'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                           

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    
                            )}        
                    
                        

            </FormContainer >
        </div>

    )
}

export default AgricEditScreen