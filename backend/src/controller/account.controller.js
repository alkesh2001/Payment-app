import mongoose from "mongoose";
import { Account } from "../model/account.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const accountFetch = asyncHandler(async(req,res) =>{
    
    const userId = new mongoose.Types.ObjectId(req.user._id);

    if(!userId){
        return res.status(401).json({message : "userId is not defind ot unathorized"})
    }
    const account = await Account.findOne({
        userId
    })

    console.log(account  , "this data when account fetch")
    if(!account){
        return res  
              .status(404)
              .json({
                message : "user not found in account fetch"
              })
    }

    return res
          .status(201)
          .json({
            balance : account.balance ,
            message : "Account details fetched successfully"
          })
})


const transfar = asyncHandler(async (req,res)=>{
    
 const session = await mongoose.startSession();
  
 session.startTransaction();

  const { amount , to } = req.body;

  const account = await Account.findOne({userId : req._id}).session(session);
  console.log(account , "when transfer money my account log")


  if(!account || account.balance < amount){
     await session.abortTransaction() ;
     return res
           .status(404)
           .json({message : "user account not found or balance is low"})

  }

  const toAccount = Account.findOne({userId : to}).session(session);
  console.log(toAccount , "when transfer money other user account log")

  if(!toAccount){
    await session.abortTransaction();
    return res 
          .status(404)
          .json({
            message : "user To account not found "
          })
  }
  
  await Account.updateOne(
    {userId : req.userId},
    {$inc : {balance  : -amount}}
  ).session(session)
  await Account.updateOne(
    {userId : to},
    {$inc : {balance : amount}}
  ).session(session)

  await session.commitTransaction();

 return res
       .status(200)
       .json({
        message : "money transfer successfully"
       })
})


export {
    accountFetch,
    transfar
}
