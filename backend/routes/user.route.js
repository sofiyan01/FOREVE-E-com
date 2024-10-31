import express from "express";
import { adminLogin, Login, Register } from "../controllers/user.controller.js";

const router=express.Router();


router.post("/register",Register)
router.post("/login",Login)
router.post("/admin",adminLogin)





export default router