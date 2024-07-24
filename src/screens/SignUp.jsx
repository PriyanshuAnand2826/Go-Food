import React, { createElement, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

  const[credentials,setCredentials]=useState({name:"",email:"",password:"",location:""})
  const navigate=useNavigate();
  const handleOnchange=(event)=>{
     const {name,value}=event.target
      setCredentials({...credentials,[name]:value})
  }
  const handleSubmit=async (event)=>{
    event.preventDefault();
    // console.log('handle sumbit triggered');
    const response= await fetch("http://localhost:3000/createuser",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name,password:credentials.password,location:credentials.location,email:credentials.email})
    
    })
    const json=await response.json()
    if(!json.success){
        alert(`enter valid credentials`)
    }
    if(json.success){
      navigate('/')
    }
  }

  
  return (
    
    <>
    <div className='conatiner'>
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3 ms-3 mt-3">
    <label htmlFor="name">Enter Your Name</label>
    <input type="text" className="form-control" placeholder="Enter Name" name='name' value={credentials.name} onChange={handleOnchange}/>
  </div>
  <div className="form-group mb-3 ms-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email'value={credentials.email} onChange={handleOnchange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group ms-3 mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password'value={credentials.password} onChange={handleOnchange}/>
  </div>
  <div className="form-group ms-3 mb-3">
    <label htmlFor="exampleInputPassword1">Address</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter address" name='location'value={credentials.location} onChange={handleOnchange}/>
  </div>
  <button type="submit" className="btn btn-primary ms-3 ">Register</button>
 <Link  to='/login'  className='m-3 btn btn-danger'>Already a user</Link>
</form>
</div>
    
    
    </>
  )
}

export default SignUp