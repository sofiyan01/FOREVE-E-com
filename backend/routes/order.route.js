import express from "express"
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/order.controller.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";


const orderRouter=express.Router();

//admin features

orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

// payment features

orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

// user features

orderRouter.post("/userorders",authUser,userOrders)

// verify payment

orderRouter.post("/verifyStripe",authUser,verifyStripe)


export default orderRouter