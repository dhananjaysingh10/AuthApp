import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1) // 1 is failure, 0 is success
    }
}