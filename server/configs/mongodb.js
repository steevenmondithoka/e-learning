import mongoose from "mongoose";

//connect to mongodb database

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>console.log('Database Connection Succesful'))

    await mongoose.connect(`${process.env.MONGODB_URL}/e-learning`)
}

export default connectDB
