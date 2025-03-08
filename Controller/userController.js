const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')

//register
exports.registercontroller = async (req,res) =>{
    console.log("inside registercontroller");
    console.log(req.body);
    const {fullname,email,phoneNumber,password,role} = req.body

    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(406).json("user already exist !!! please Login")
        }else{
            const newUser = new User({
                  fullname,
                  email,
                  phoneNumber,
                  password,
                  role,
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
        
    }
    
}
 //login

 exports.loginController = async (req, res) => {
    console.log("inside loginController");
    console.log(req.body);
    
    const { email, password,role } = req.body; 

    try {
        let existingUser = await User.findOne({ email, password });

        if (!existingUser) {
            return res.status(404).json("Invalid username/password !!");
        }
        if (existingUser.role !== role) {
            return res.status(403).json( "Account not found" );
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);

        // Create a user object without the password
        const userResponse = {
            _id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email,
            phoneNumber: existingUser.phoneNumber,
            role: existingUser.role,
            profile: existingUser.profile,
            bio:existingUser.bio
        };

        return res.status(200).json({
            user: userResponse,
            token
        });

    } catch (err) {
        console.error("Login error:", err);

        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal server error", error: err.message });
        }
    }
};
exports.updateUserController = async (req,res)=>{
    console.log("inside updateUser controller");
    const {fullname,email,phoneNumber,bio,skills} = req.body
    const upload = req.file ? req.file.filename : "https://github.com/shadcn.png"
 
    const userId = req.userId
    // const skillArray = skills.split(",")
    try {
        const updateData = {
            fullname,
            email,
            phoneNumber,
            bio,
            profile: {
                skills: skills ? skills.split(",") : undefined,
                profilePhoto: upload || undefined 
            }
        };        
        const user = await User.findByIdAndUpdate({_id:userId},updateData,{new:true}).populate('profile')
        if(!user){
           return res.status(404).json({message:"user not found"})
        }
        // await company.save()
            res.status(200).json({message:"profile updated",
            user
        })
    } catch (error) {
        console.log(error);
        
    }
    
}