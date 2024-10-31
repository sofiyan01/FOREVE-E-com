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
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) { // Allow requests with no origin like mobile apps
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Enable credentials if needed
}));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// API Endpoints
app.get("/", (req, res) => {
    res.json("Working api");
});

// Listening port
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
