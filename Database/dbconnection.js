const mongoose =require('mongoose')

const connectionString  = process.env.DBCONNECTIONSTRING
mongoose.connect(connectionString).then(res =>{
    console.log('mongodb atlas connected successfully');
    
   }).catch(err=>{
    console.log("mongodb connection failed");
    console.log(err);
    
})
