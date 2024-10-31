import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();

// App config
const app = express();
const port = 4001;

connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(morgan("common"));

// CORS configuration
const allowedOrigins = [
    'https://foreve-e-frontend.vercel.app',
    'https://foreve-e-admin.vercel.app',
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// API Endpoints
app.get("/", (req, res) => {
    res.json("API is Working");
});

// Listening port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
