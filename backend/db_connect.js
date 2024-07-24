const mongoose = require('mongoose');
const mongoURI='mongodb+srv://priyanshuanand1425:priyanshu1425@cluster0.zhg1tbi.mongodb.net/Gofood?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB=async ()=>{
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    
  try {
    // Access the collection directly
    const collection = mongoose.connection.collection('food_items');

    // Fetch all documents from the collection
    const users = await collection.find().toArray();
    global.food_items=users
    //console.log('All food items:', global.food_items);

    const collection1 = mongoose.connection.collection('food-categories');
    //Fetch all documents from the collection
    const food_catdata = await collection1.find().toArray();
    global.food_catData=food_catdata;
    // console.log('All food category:', global.food_catData);

    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
}
module.exports=mongoDB;
 