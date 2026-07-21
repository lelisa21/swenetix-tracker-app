import jwt from "jsonwebtoken"
import "dotenv/config"

function authenticate(req, res, next) {
   const authHeader = req.headers.authorization;
   
if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({error: "Token is required"})
}
try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.sign(token, process.env.JWT_SECRET)
    req.user = decoded

} catch (error) {
    return res.error(401).json({error: error.message || "Invalid Credentials"})
}
}

export default authenticate 
