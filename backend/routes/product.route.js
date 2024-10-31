import express from "express"
import { addProduct, listProduct, removeProduct, singleProduct } from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";


const productRouter=express.Router();

productRouter.post("/add",adminAuth,upload,addProduct)
productRouter.post("/remove",adminAuth,removeProduct)
productRouter.post("/single",singleProduct)
productRouter.get("/list",listProduct)





export default productRouter