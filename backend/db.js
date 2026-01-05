import mongoose from "mongoose"
import { configDotenv } from "dotenv"

configDotenv()
const connectDb=async()=>{
    try {
        let check = await mongoose.connect(process.env.MONGO_DB)
        console.log("db connect")
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDb