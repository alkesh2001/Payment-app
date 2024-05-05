import { Account } from "../model/account.model.js";
import { User } from "../model/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const generateToken = async (userId)=>{
    try {
        
        if (!userId) {
            throw new Error("User ID is required");
        }

        const user  = await User.findById(userId)
        console.log(user , 'this data from user')

        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = user.generateAccessToken()
        
        await user.save({validateBeforeSave : false})
        console.log(accessToken)
        return { accessToken}

    } catch (error) {
    
    }
}

const registerUser = asyncHandler(async (req, res) =>{
    const {username , fullname , email , password} = req.body
    
    if([username , fullname , password , email].some((field)=> field?.trim() === "")){{
       return res.status(400).json("all field are required")
    }}

    const existedUser = await User.findOne({
        $or : [{email} ,{username}]
    })

    if(existedUser){
        return res.status(409).json("user with email or username already exists")
    }

    const user = await User.create({
        fullname ,
        username ,
        email ,
        password
    })
    

    const userId = user._id

    await Account.create({
        userId ,
        balance : 10000
    })

    const {accessToken} = await generateToken(user._id)
 
    return res.status(200).json({user , accessToken , message : "user Registered successfully"})
    

})


const loginUser = asyncHandler(async(req, res)=>{
    const { email , password} = req.body

    if(!email){
        return res
              .status(400)
              .json({
                message : "email is required"
              })
    }

    const user = await User.findOne({email})

    if(!user){
        return res 
              .status(404)
              .json({
                message : "user does not exist"
              })
    }
    
    if(user.password !== password){
        return res
              .status(401)
              .json({
                message : "Invalid user password"
              })
    }

         
    const {accessToken} = await generateToken(user._id)

    const loggedInUser = await User.findById(user._id)

    const optiones ={
        httpOnly : true ,
        secure : true
    }
     
    return res
          .status(200)
          .cookie("accessToken" , accessToken , optiones)
          .json({
            user : loggedInUser , accessToken ,
            message : "User logged In successfully"
          })

})

const logoutUser = asyncHandler(async(req,res)=>{
    User.findByIdAndUpdate(
        req.user._id ,
        {
            $set :{
                accessToken :1
            }
        },
        {
            new : true
        }
    )
    const optiones ={
        httpOnly : true ,
        secure : true
    }

    return res
          .status(200)
          .clearCookie("accessToken" , optiones)
          .json({
            message : "User logged Out Successfully"
          })

})

const getCurrentUser = asyncHandler(async (req, res)=>{
    try {
        
        const user = req.user ;
        console.log(user)
    
         return   res
              .status(200)
            .json( {user, massage : "current user fetched successfully"})
    } catch (error) {
        res.status(500).json({message :  "internal server error"})
    }
        
})

const getAllUser = asyncHandler(async (req, res) =>{
    
    const user = await User.find({ _id : { $ne : req.user._id}})

    if(!user){
        return res
              .status(404)
              .json({message : "get all user list not found"})
    }

    return res.status(200).json({user , message: "get all user list successfully"})
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getAllUser
}