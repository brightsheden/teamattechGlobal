import React from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch,} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Container} from 'react-bootstrap'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Profilescreen from './Screens/ProfileScreen';
import BlogDetailsScreen from './Screens/BlogDetailScreen';
import BlogListScreen from './Screens/BlogListScreen';
import AdminScreen  from './Screens/AdminScreen'
import BlogScreeen from './Screens/BlogScreeen';
import HomeScreen from './Screens/HomeScreen';
import BlogEditScreen from './Screens/BlogEditScreen';
import AgricListScreen from './Screens/AgricListScreen';
import AgricDetailScreen from './Screens/AgricDetailScreen';
import AgricScreeen from './Screens/AgricScreen';
import AgricEditScreen from './Screens/AgricEditScreen'
import NaturalListScreen from './Screens/NaturalListScreen';
import NaturalDetailScreen from './Screens/NaturalDetailScreen';
import NaturalScreeen from './Screens/NaturalScreen';
import NaturalEditScreen from './Screens/NaturalEditScreen';
import InformationListScreen from './Screens/InformationListScreen';
import InformationDetailScreen from './Screens/InformationDetailScreen';
import InformationScreeen from './Screens/InformationScreen';
import InformationEditScreen from './Screens/InformationEditScreen';
import CartScreen from './Screens/CartScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceorderScreen from './Screens/PlaceorderScreen';
import OrderScreen from "./Screens/OrderScreeen";
import ShippingNatural from "./Screens/ShippingNaturalScreen"
import shippingIct from './Screens/ShippingIctScreen'
import AdminOrderScreen from './Screens/AdminOrderScreen';
import MyorderScree from './Screens/MyorderScreen'
//import { Footer } from './Components/footer.jsx'
//import { Navigation } from './Components/navigation'

function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3">
      <Container>
        <Route path="/" component={HomeScreen} exact/>
       
        <Route path="/login" component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/profile' component={MyorderScree}/>
        <Route path='/blogs' component={BlogListScreen} exact/>
        <Route path='/blog/:id/' component={BlogDetailsScreen}/>
        <Route path='/adminpage' component={AdminScreen}/>
        <Route path='/admin/blogs' component={BlogScreeen} />
        <Route path='/admin/agric' component={AgricScreeen} exact />
        <Route path='/admin/natural/' component={NaturalScreeen} exact/>
        <Route path='/admin/blog/:id/edit/' component={BlogEditScreen} />
        <Route path='/admin/agric/:id/edit/' component={AgricEditScreen} />
        <Route path='/admin/natural/:id/edit/' component={NaturalEditScreen} />
        <Route path='/admin/information/:id/edit/' component={InformationEditScreen} />
        <Route path='/agricproducts' component={AgricListScreen} exact/>
        <Route path='/agricproduct/:id/' component={AgricDetailScreen}/>
        <Route path='/naturalproducts' component={NaturalListScreen}/>
        <Route path='/naturalproduct/:id/' component={NaturalDetailScreen} />
        <Route path='/informationproducts' component={InformationListScreen}/>
        <Route path='/informationproduct/:id/' component={InformationDetailScreen} />
        <Route path='/admin/information/' component={InformationScreeen} exact/>
        <Route path='/cart/:id?' component={CartScreen} exact/>
        <Route path='/shipping/:id?' component={ShippingScreen} exact/>
        <Route path='/payment/' component={PaymentScreen} exact/>
        <Route path='/placeorder/' component={PlaceorderScreen} exact/>
        <Route path='/order/:id/' component={OrderScreen}/>
        <Route path='/shippingnatural/:id?' component={ShippingNatural}/>
        <Route path='/shippinginformation/:id?' component={shippingIct }/>
        <Route path='/admin/orders/' component={AdminOrderScreen }/>



      </Container>

    </main>
    <Footer />
  </Router>
  );
}

export default App;
