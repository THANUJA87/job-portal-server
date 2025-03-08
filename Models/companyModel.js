const  {default:moongose, default: mongoose} = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
       
    },
    website:{
        type:String,
   
    },
    location:{
        type:String,
       
    },
    logo:{
        type:String,
     
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true})

const companies = mongoose.model("Company",companySchema)
module.exports = companies