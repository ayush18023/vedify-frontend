import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom'
import { Navbar } from './Navbar/Navbar';
import Slider from './Slider/Slider';
import Home from './Home/Home';
import Medicines from './Medicines/Medicines';
import IndivisualMedicines from './Medicines/IndivisualMedicines';
import ScrollToTop from './Components/ScrollToTop'
import Checkout from './Checkout/Checkout';
import Payment from './Checkout/Payment';
import Myaccount from './Myaccount/Myaccount';
import About from './About/About';
import ProtectedRoutes from './ProtectedRoutes';
import Admin from './Admin/Admin';
import { ChakraProvider } from '@chakra-ui/react'
import BookAppointment from './BookAppointment/BookAppointment';
import { useSelector } from 'react-redux';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

function App() {

  const islogged=useSelector(state=>state.login.islogged)
  return ( 
  
          <Router>
            <ScrollToTop>
              <Switch>
                <Route path='/' element={<><Home/></>}></Route>
                <Route path='/Medicines' element={<><Medicines/></>}></Route>
                <Route exact path='/Medicines/:_id' element={<><IndivisualMedicines/></>} ></Route>
                <Route exact path='/Book' element={<><BookAppointment/></>} ></Route>
                <Route exact path='/checkout' element={<><Checkout/></>} ></Route>
                <Route exact path='/success' element={<><Payment/></>} ></Route>
                <Route exact path='/About' element={<><About/></>} ></Route>
                <Route exact path='/myaccount' element={
                  <ProtectedRoutes auth={islogged}>
                    <Myaccount/>
                  </ProtectedRoutes>} >
                </Route>
                <Route exact path='/Admin' element={
                  <ProtectedRoutes auth={1}>
                    <Admin/>
                  </ProtectedRoutes>} >  
                </Route>
                {/* <ProtectedRoutes auth={1} Component={<Admin/>}/> */}
                
              </Switch>
            </ScrollToTop>
          </Router> 

  );
}

export default App;
