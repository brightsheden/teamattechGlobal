import React from "react"
import LinkContainer from "react-router-bootstrap/lib/LinkContainer"
export const Services = (props) => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>OUR BUSINESS ACTIVITIES AND SERVICEES</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className='row'>

          <div className='col-md-4' >
          <i className="fa fa-solar-tractor"></i>
          <div className='service-desc'>
            <LinkContainer to="/agricproducts">
            <h3>Agro and Food Technology</h3>
            </LinkContainer>
                    
            <p>Agro and Food Technology Promotion of food supplies 
                      and food security via supply and distribution of 
                      variesties of agricultural and food produced.</p>
                  </div>
          </div>

          <div className='col-md-4' >
          <i className="fa fa-solar-panel"></i>
          <div className='service-desc'>
            <LinkContainer to="/naturalproducts">
            <h3>Energy and Mining Technology</h3>
            </LinkContainer>
                    
                    <p>Energy and Minning Technology Promotion of renewable and 
                      non-renewable energy sources via marketing , supply and distributtion of solar products, 
                      and accessories and domestic and industrial gas cylinder products and accessories. 
                      Products maintenance services and repairs, promotion of mining operation,investment 
                      via trade, sale and export of refined solid mineral and metals.</p>
                  </div>
          </div>

          <div className='col-md-4' >
          <i className="fa fa-server"></i>
          <div className='service-desc'>
            <LinkContainer to="/informationproducts">
            <h3>Information Technology</h3>
            </LinkContainer>
                    
                    <p>Supply and distribution of technology products,
                      accessoriesand IT advisory services and
                       support,cyber security services and consulting.</p>
                  </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
