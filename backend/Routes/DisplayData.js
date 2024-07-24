const express=require('express');
const router=express.Router();

router.post('/foodData',(req,resp)=>{
  try {
    resp.send([global.food_items,global.food_catData]);
  } catch (error) {
     console.error(` ${error.message} : This is a error`);
     resp.send('server errro')
  }
  
})

module.exports=router;  