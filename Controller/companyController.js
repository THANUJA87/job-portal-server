const companies = require('../Models/companyModel');

exports.registerCompany = async(req,res)=>{
    console.log("inside registerCompany Controller");
    const {companyName} = req.body
    try {
        if(!companyName){
            res.status(400).json("company name is requird")
        }
        const company = await companies.findOne({companyName})
        if(company){
            res.status(406).json("Already registered !!")
        }else{
            const newCompany = new companies({
                companyName,
                userId:req.userId
            })
            await newCompany.save()
            res.status(200).json({message:"Company registered Successfully !!",newCompany})
        }
        
    } catch (err) {
        res.status(401).json(err)
        
    }

}

exports.getCompany = async (req,res)=>{
    console.log("inside getCompany Controller");
    const userId =req.userId //logged in userid
    try {
        const company = await companies.find({userId})
        if(!company){
            res.status(404).json("Companies not found")
        }
        res.status(200).json({
            company
        })
    } catch (error) {
        console.log(err);
        
    }
}
// getCompanyById
exports.getCompanyById = async(req,res)=>{
    console.log("inside getCompanyById");
    try {
        const companyId =  req.params.id
        const company = await companies.findById(companyId)
        if(!company){
            res.status(404).json("Company not found")
        }
        res.status(200).json({message:"successfull",
            company
        })
    } catch (error) {
        console.log(error);
        
    }
}

exports.updateCompany = async (req,res)=>{
    console.log("inside updateCompany controller");
    const {companyName,description,website,location} = req.body;
    const upload = req.file ? req.file.filename : ""
    try {
        const updateData = {companyName,description,website,location,logo:upload}
        const company = await companies.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!company){
           return res.status(404).json({message:"Company not found"})
        }
        // await company.save()
            res.status(200).json({message:"Company information updated",
            company
        })
    } catch (error) {
        console.log(error);
        
    }
    
}
exports.deleteCompanyController = async (req,res)=>{
    console.log("inside deletecompanycontroller");
    const {id} = req.params

    try {
        const deleteCompany = await companies.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCompany)
    } catch (err) {
        res.status(401).json(err)
    
    }

    

}