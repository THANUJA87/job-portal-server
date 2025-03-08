const jwt = require('jsonwebtoken')



const jwtMiddleware = (req,res,next) => {
    console.log("inside jwtmiddleware");
    
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token != ''){
       try {
        const jwtresponse = jwt.verify(token,process.env.JWTPASSWORD)
        console.log(jwtresponse);
        req.userId = jwtresponse.userId
        
       } catch (err) {
        res.status(401).json("Authentication failed ..please login")
       }
    }else{
        res.status(404).json("Token missing..")
    }
    next()

}

module.exports =jwtMiddleware