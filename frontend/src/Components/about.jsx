import React from "react"
import './style.css'
export const About = (props) => {
  return (
    <div id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/pr1.jpg' className='img-responsive' alt='' />{' '}
          </div>
        
          <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>About Us</h2>
              <p>{props.data ? props.data.paragraph : 'loading...'}</p>
             
            </div>
            </div>

            
            <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/tm2.jpg' className='img-responsive' alt='' />{' '}
          </div>
            <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>OUR Mission</h2>
              <p>To create a sustainable ground for business growth in 
                Africa and global scale by building front runner 
                distribution and supply chain for business sectors and
                 industries and to develop multi enterprises that can yield very high returns on investment
                  and increase assets and scale profitably over time seamlessly.</p>
          
            </div>

            </div>
            
           
            <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/tm3.jpg' className='img-responsive' alt='' />{' '}
          </div>
            <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>OUR Vission</h2>
              <p>To be a worldwide leading business 
                enterprise in the supply value chain sector in Africa and globe, and to bring the much need technology, services and products to every households doorsteps 
                in Nigeria, Africa and world.</p>
          
            </div>
            </div>
            
           
            <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/qlt.jpg' className='img-responsive' alt='' />{' '}
          </div>
            <div className='col-xs-12 col-md-6'> 
            <div className='about-text'>
              <h2>History</h2>
              <p>We are born from the need 
                to provide value and solutions to the masses across Africa and world through our business services 
                and products with technology driven.</p>
          
            </div>
            </div>
            <br></br>
            

          </div>
      </div>
    </div>
  )
}
