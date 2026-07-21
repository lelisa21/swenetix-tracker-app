import express from "express"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
const router = express.Router();

// @route   POST /api/login
router.post("/login", async (req, res, next) => {
    try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "all fields are required"})
    }

    const user  = await User.findOne({email});
    if(!user) {
        return res.status(401).json({message:"user not Authenticated"})
    }

    const token  = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

   const isMatch = await bcrypt.compare(password,user.password)
   if(!isMatch){
    return res.status(401).json({message:"password not matched"})
   }

   return res.json({
    message:"User Logged in successfully",
    token
   })
    } catch (error) {
         return res.status(500).json({error: error.message})
    }
    
});

export default router;
