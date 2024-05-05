import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type: String,
        required : true,
        lowercase : true,
        unique : true ,
    },
    fullname :{
        type : String ,
        required : true ,
        lowercase : true,
        unique : true
    },
    email :{
        type : String ,
        required : true ,
        lowercase : true,
        unique : true
    },
    password :{
        type : String ,
        required : true ,
    }

},{timestamps:true})


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" , userSchema)