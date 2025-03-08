require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./Database/dbconnection')

const jbserver = express()

jbserver.use(cors())
jbserver.use(express.json())
jbserver.use(router)
jbserver.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

jbserver.listen(PORT,()=>{
    console.log(`My jbserver running at port : ${PORT} and is waiting for client request`);
})

jbserver.get('/',(req,res)=>{
    res.status(200).send('<h1> My jbserver running at port </h1>')
})

jbserver.post('/',(req,res) =>{
    res.status(200).send("POST REQUEST")
})