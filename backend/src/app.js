import express from "express"
import cors from "cors"
import cookieParse from "cookie-parser"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials :true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(cookieParse())


import userRouter from './routes/user.routes.js'
import accountRouter from './routes/account.routes.js'

app.use("/api/v1/users" ,  userRouter)
app.use("/api/v1/Account" , accountRouter)

export {app}