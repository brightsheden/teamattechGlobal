
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { blogUpdate,listBlogsDetails} from '../Actions/blogActions'
import { UPDATE_BLOG_RESET} from '../Constants/blogConstants'


function BlogEditScreen({match, history}) {
    const blogId = match.params.id

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
   
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    
    const blogDetail = useSelector(state => state.blogDetails)
    const {loading,error,blog} = blogDetail

    const updateBlogs = useSelector(state => state.updateBlog)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, } = updateBlogs


    useEffect(() => {

        if(successUpdate){
            dispatch({type:UPDATE_BLOG_RESET})
            history.push('/adminpage')
            
        }else{
            if(!blog.title || blog._id !== Number(blogId)){
                dispatch(listBlogsDetails(blogId))
            } else {
                setTitle(blog.title)
                setThumbnail(blog.thumbnail)
                setCategory(blog.category)
                setDescription(blog.description)
        }

        }
        
   
           
    }, [dispatch,history,blog,blogId, successUpdate])






    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(blogUpdate(
            {
                _id:  blog._id,
                title,
                thumbnail,
                category,
                description
            }
        ))
        console.log("updated")
    
    }

    const uploadThumbnailHandler = async  (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('blog_id', blogId)
        console.log("file is uploading")
        setUploading(true)

        try {
            const config = {
                "content-type" : "multipart/form/data"
            }
            const {data} =await axios.post("/api/blog/uploadthumbnail/", formData,config)
            setUploading(false)
            setThumbnail(data)
        } catch (error) {
            setUploading(false)
            
        }

    }

   



    return loading ? (<Loader/>) :
     error? (<Message variant="danger">{error}</Message>):
      (
        <div>
            <Link to='/admin/blogs/'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Blog</h1>
                        {loadingUpdate && <Loader/>}
                        {errorUpdate && <Message variant="danger">{error}</Message>}

                        {loading? (<Loader/>): error? (<Message variant="danger">{error}</Message>)
                            :
                            (
                                <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='choose image'
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                >   
                                </Form.Control>
                                <Form.File
                                 id="thumbnail-file"
                                 label="choose thumbnail"
                                 custom
                                 onChange={uploadThumbnailHandler}
                                 ></Form.File>
                                 {uploading && <Loader/> }
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                           

                           
                            <Form.Group controlId='description'>
                                <Form.Label>description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
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

    );
};

export default BlogEditScreen;