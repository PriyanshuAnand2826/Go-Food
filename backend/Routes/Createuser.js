const express=require('express');
const router=express.Router();
//getting model  
const User=require('../models/User')

//getting web token 
const jwt=require('jsonwebtoken');
//jwt secret key either in env 
const jwtsecretKey='mynameispriyanshuanandfromdelhi';



//validators 
const { body, validationResult } = require('express-validator');

//bcrypt library for securing password as hash password !!
const bcrypt=require('bcryptjs');




//post api  
router.post('/createuser', [
body('email','please enter the correct mail id').isEmail(),
body('name','name should be of min length 5').isLength({min:5}),
body('password','incorrect password').isLength({min:4})
]
  ,async(req,resp)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
      return resp.status(400).json({error:error.array()});
    }

    //for generating hash value of password --> 2 lines 
    const salt= await bcrypt.genSalt(10);
    let hashPassword= await bcrypt.hash(req.body.password,salt);

   try {
     await User.create({
      name:req.body.name,
      password:hashPassword,
      email:req.body.email,
      location:req.body.location
     })
     resp.json({success:true});
   } catch (error) {
     console.log(error);
     resp.json({success:false});
   }
})

//get api 
router.post('/login',[
body('email','please enter the correct mail id').isEmail(),
 body('password','incorrect password').isLength({min:4})
 ] ,async(req,resp)=>{
  const error=validationResult(req)
    if(!error.isEmpty()){
      return resp.status(400).json({error:error.array()});
    }
  let email =req.body.email;
 try {
      let userData = await User.findOne({email})
      console.log(userData);
      if(!userData){
        return resp.status(400).json({error:"Try login with valid credentials"});
      }
      const pwdcompare= await bcrypt.compare(req.body.password,userData.password)
      if(!pwdcompare){
        return resp.status(400).json({error:"Try login with valid credentials"});
      }
      const data ={
        user :{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtsecretKey)
      return resp.json({success:true,authToken:authToken})
    } catch (error) {
      console.log(error);
      resp.json({success:false});
    }
 })
 


module.exports=router;