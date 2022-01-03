// @flow strict

import  React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import { Button,Form } from "react-bootstrap";


function SearchBox() {
    const [keyword, setKeyword] = useState(" ")
    const [keyword1, setKeyword1] = useState(" ")

    let history = useHistory()

    const submitHandler= (e)=>{
        e.preventDefault()
        
        if(keyword1){
            history.push(`/agricproducts?keyword1=${keyword1}`)
           
        }
       
        else if(keyword){

                history.push(`/imformationproducts?keyword=${keyword}`)
        }
        else{
            history.push(history.push(history.location.pathname))
        }
       
        
      


    

    }
  
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={e=> {setKeyword1(e.target.value) ; setKeyword(e.target.value)}} 
              
                className="mr-sm- ml-sm-5">

            </Form.Control>
            <Button
                type="submit"
                variant="outline-success"
                className="p-2">
                    submit</Button>
            
        </Form>
    );
};

export default SearchBox;