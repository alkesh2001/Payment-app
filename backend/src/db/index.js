import mongoose from "mongoose";

const DB_NAME = 'fullstack';

const connectDB = async() =>{
    try {
        const connectioneInstance  = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB Host :${connectioneInstance.connection.host}`)
    } catch (error) {
        console.log('error when connect data basse' , error)
        process.exit(1)
    }
}
export default connectDB