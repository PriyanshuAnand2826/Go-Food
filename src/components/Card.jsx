import React, { useEffect, useRef, useState } from 'react'
import { useCart,usecartDispatch } from './Contextreducer';

function Card({filteritems}) {
  let dispatch=usecartDispatch();
  
  let data=useCart();
  let priceRef=useRef();
  let options=filteritems.options[0];
  let priceoption=Object.keys(options);
  const [qty,setqty]=useState(1);
  const [size,setsize]=useState("");
  const handleAddtocart= async ()=>{
    let food=[]
    for(const item of data){
      if(item.id===filteritems._id){
        food=item;

        break;
      }
      
    }
    if(food.length !==0){
      if(food.size===size){
        await dispatch({type:'UPDATE',id:filteritems._id,price:finalprice,qty:qty,})
        return 
      }
      else if(food.size!==size){
        console.log('handle add to cart clicked');
        await dispatch({type:"ADD",id:filteritems._id,name:filteritems.name,qty:qty,size:size,price:finalprice})
        return
      }
      return 
    }
    await dispatch({type:"ADD",id:filteritems._id,name:filteritems.name,qty:qty,size:size,price:finalprice})
   
    
  }
  let finalprice=qty* parseInt(options[size]);
  useEffect(()=>{
    setsize(priceRef.current.value)
  },[])
  
  return (
    <div>
       <div className="card mx-3 my-3" style={{ "width": "20rem" , "maxHeight":"24em" }}>
          <img
          src={filteritems.img}
            className="card-img-top"
            alt="Card image cap" 
            style={{maxHeight:'10rem',objectFit:'fill'}}
          />
          <div className="card-body">
            <h5 className="card-title">{filteritems.name}</h5>
           
            <div className="container w-100"> 
              <select className=" h-100  bg-secondary text-white rounded px-2 py-1" onChange={(e)=>setqty(e.target.value)}>
                {Array.from(Array(6),(e,index)=>{
                  return (
                    <option  key={index+1} value={index+1}> {index+1}</option>
                  )                   
                })}


              </select>
              <select name="" id="" className="mx-4 h-100  bg-secondary text-white rounded px-2 py-1 border-0"  ref={priceRef} onChange={(e)=>setsize(e.target.value)} >
                {priceoption.map((data)=>{
                  return(
                    <option value={data} key={data} >{data}</option>)
                })}
              </select>
              <div className="d-inline h-100 ">
                Rs {finalprice}/-
              </div>
              <hr />
              <button className='btn btn-success justify-center ' onClick={handleAddtocart}>ADD TO CART</button>
                
            </div>
          </div>
        </div>
    </div>
  )
}

export default Card