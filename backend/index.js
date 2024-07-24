const express = require('express')
const app = express()
const port = 3000;

//for connecting the api to frontend
const cors = require('cors');
const mongoDB=require('./db_connect.js');
mongoDB()


app.use(cors({
  origin: 'http://localhost:5173', // Update with your client's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

//to run apis in route 
app.use(express.json())
app.use('',require('./Routes/Createuser.js'))
app.use('',require('./Routes/DisplayData.js'))
app.use('',require('./Routes/OrderData.js'))
app.listen(port, () => {
  console.log(`Server running on port  ${port}`)
})