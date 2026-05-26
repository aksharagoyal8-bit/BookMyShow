const jwt=require("jsonwebtoken");
const usermodel=require("../models/usermodels");

const createuser=async function (req,res) {
    try{
      const userExists=await usermodel.findOne({email:req.body.email});
      if(userExists){
        return res.send({
          success:false,
          message:"User already registered"

        });
      }
      const newuser=await usermodel(req.body);
      await newuser.save();
      res.send({success:true,message:"Registration successfull, please Login "});
    }
    catch(err){
        console.log(err);
          res.send({
           success:false,
        message:"An error occured, please try again later"});
    }
}
const readuser= async function (req,res) {
    try{
     const user=await usermodel.findOne({email:req.body.email});
     if(!user){
        return res.send({
            success:false,
            message:"User does not exist, Please register",

        })
     }



     if(user.password !==req.body.password){
        return res.send({
         success:false,
        message:"Invalid Password",
        })
      
     }

      const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
    console.log(token);
     res.send({
        success:true,
        message:"Login successfull",
        data:token,
     })



    }
    catch(err){
        console.log(err);
        res.send({
           success:false,
        message:"An error occured, please try again later"});
    }
    
}

const getCurrentUser=async(req,res)=>{
    try{
         const userId = req.user.userId;
        const user=await usermodel.findById(userId).select("-password");
        res.send({
            success:true,
            message:"You are Authenticated",
            data:user,
        });
    }catch(err){
        res.send({
            success:false,
            message:err.message,
        });
    }
 
}

module.exports={createuser,readuser,getCurrentUser};