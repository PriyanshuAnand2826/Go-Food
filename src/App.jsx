import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle'

import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp'
import { CartProvider } from './components/Contextreducer';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <CartProvider>
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/myorder" element={<MyOrders/>}/>
        
      </Routes>
    </div>
    </Router>
    </CartProvider>
  )
}

export default App
