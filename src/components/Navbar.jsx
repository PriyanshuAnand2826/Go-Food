import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import  Modal  from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./Contextreducer";


function Navbar() {
  const navigate=useNavigate();
  const items=useCart()
  const [cartview,setcartview]=useState();
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-3 ms-2 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item ">
              <Link className="nav-link active fs-5" to="/">
                {" "}
                Home{" "}
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item ">
                <Link className="nav-link active fs-5" to="/myorder">
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex me-4">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div>
               <div className="btn bg-white text-success me-3" onClick={()=>{setcartview(true)}}>My Cart {"  "}
                <Badge pill bg="danger">{items.length}</Badge>
               </div>
               {cartview ? <Modal onClose={()=>setcartview(false)}><Cart/></Modal> :null}
              <div className="btn bg-white text-danger me-4" onClick={handlelogout}>Logout</div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
