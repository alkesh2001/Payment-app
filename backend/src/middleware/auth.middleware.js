import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../model/user.model.js"

export const verifyJWT = asyncHandler( async(req , res ,next) =>{
    
   try {
     const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
      
     console.log("Received token:", token);
 
     if(!token){
         return res
               .status(401)
               .json({message : "Unathorized request"})
     }
     
     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id)
 
     if(!user){
         return res 
               .status(401)
               .json({message : "Invalid Access Token"})
     }
      
     req.user = user;
     next()
   } catch (error) {
      return res
             .status(401)
             .json({message : "Invalid Access Token" , error})
   }
})