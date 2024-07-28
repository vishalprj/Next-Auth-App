import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected",()=>{
            console.log("MongoDB connected")
        })
        connection.on('error', (error)=>{
            console.log("MongoDB connection error," + error)
        })
    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}
