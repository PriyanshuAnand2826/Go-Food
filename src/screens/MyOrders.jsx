import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyOrders() {
  const [orderData,setorderData]=useState("")

  //func to fetch the order 
  const fetchmyorder = async ()=>{
    
    let useremail=localStorage.getItem("userEmail")
    
    console.log(useremail);
     let response = await fetch('http://localhost:3000/myorderdata',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email:useremail,

      })
     }).then(async (res) => {
      let response = await res.json()
      console.log(response);
      await setorderData(response)
  })
     
  }
  
  useEffect(()=>{
    fetchmyorder()
  },[])
  return (
    <>
    <div><Navbar/></div> 
    
    <div className='container'>
                <div className='row'>

                    { orderData.length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card shadow p-3 mb-5 bg-white rounded"  style={{ width: "17rem", maxHeight: "10rem" ,'border':'yellow' }}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0 ' style={{ maxheight: "30px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>
    <div><Footer/></div>
    </>
  )
}

export default MyOrders