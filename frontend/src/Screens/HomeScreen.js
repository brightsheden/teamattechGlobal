// @flow strict

import  React,{useEffect,useState} from 'react';
//import {useDispatch,useSelector} from 'react-redux'

import {Row,Col,Pagination, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Header} from '../Components/header.jsx'
import JsonData from '../data/data.json'
import { Features } from '../Components/features.jsx'
import {About} from '../Components/about.jsx'
import {Services} from '../Components/services.jsx'
//import Header from '../Components/header.jsx';

import SmoothScroll from 'smooth-scroll'

//import { Link } from "react-router-dom";

//import Loader from '../Components/Loader';
//import Message  from '../Components/Message';


export const scroll = new SmoothScroll('a[href="/"]', {
    speed: 1000,
    speedAsDuration: true,
  })
  


function HomeScreen({history}) {

    const [landingPageData, setLandingPageData] = useState({})
    useEffect(() => {
      setLandingPageData(JsonData)
    }, [])
  

    
    return (            
  <>
    <Header data={landingPageData.Header} />
    
    <About data={landingPageData.About} />
    <Services data={landingPageData.Services} />
  
    
       

    </>

                
        
            
     
          


            
        
    );
};

export default HomeScreen;