import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import { useCart,usecartDispatch } from '../components/Contextreducer';

function Cart() {
  let data = useCart();
  let dispatch = usecartDispatch();
  const handleCheckout= async ()=>{
  console.log('checkout button clicked');
     let useremail=localStorage.getItem('userEmail')
     console.log(useremail);
     const response=await fetch('http://localhost:3000/orderData',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data:data,
        email:useremail,
        order_date:new Date().toDateString()
      }),
     })
     if(response.status ===200){
      dispatch({type:'DROP'})
     }
  }
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' >No.</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-success'>
            {data.map((food, index) => (
              <tr key={index+1}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={()=>{dispatch({type:'REMOVE',index:index})}}><DeleteIcon /></button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-warning mt-5 ' onClick={handleCheckout} > Check Out </button>
        </div>
      </div>



    </div>
  )
}

export default Cart