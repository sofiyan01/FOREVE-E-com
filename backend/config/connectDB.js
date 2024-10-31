import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URL ).then(()=>{
        console.log("DB connected")
    }).catch((err)=>{
        console.log("error in DB connection",err)
    })

//     try {
    
//     mongoose.connection.on("connected", () => {
//       console.log("Database Connected Successfully");
//     });

//     mongoose.connection.on("error", (err) => {
//       console.error("Database connection error:", err);
//     });
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     process.exit(1); // Exit process with failure
//   }
};

export default connectDB;
