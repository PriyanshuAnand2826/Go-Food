import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link ,useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let usenavigate=useNavigate();
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handle sumbit triggered');
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: credentials.password,
        email: credentials.email,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert(`enter valid credentials`);
    }
    if(json.success){
      localStorage.setItem('userEmail',credentials.email)
      localStorage.setItem("authToken",json.authToken)
       usenavigate('/');
      //  console.log(localStorage.getItem("authToken"));
       
    }
  };

  return (
    <>
      <Navbar />
      <div className="conatiner">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group mt-3 ms-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={handleOnchange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group ms-3 mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleOnchange}
            />
          </div>
          <button type="submit" className="btn btn-primary ms-3 mt-3">
           Login
          </button>
          <Link  to='/signup'  className='ms-3 mt-3 btn btn-danger'>I am a new user</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
