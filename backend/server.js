import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"
import connectCloudinary from "./config/cloudinary.js";
dotenv.config();

// app config
const app=express();
const port= 4001
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json())
app.use(morgan("common"))
app.use(cors())
// app.use(bodyParser(urlencoded:{true}))
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// API Endpoints
app.get("/",(req,res)=>{
    res.json("Working api")
})


// listening port
app.listen(port,()=>{
        console.log(`server is running on ${port}`)
})
