import userModel from "../models/user.model.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


        const generateToken=(id)=>{
            return jwt.sign({id},process.env.JWT_SECRET)
        }

export const Register=async(req,res)=>{

        const {name,email,password}=req.body

try {

        if (!name || !email || !password) {
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

    const userExist=await userModel.findOne({email})

        //checking if user already exist

        if (userExist) {
            return res.json({success:false,message:"User Already Exist"})
        }

        // validating email and strong password

            if (!validator.isEmail(email)) {
                return res.json({
                    success:false,
                    message:"Please provide a valid email"
                })
            }
            
            if (password.length<8) {
                return res.json({
                    success:false,
                    message:"Please Enter a Strong password"
                })
            }

            //hashing password

            const hashedPassword=await bcrypt.hash(password,10)

            const newUser=new userModel({
                name,
                email,
                password:hashedPassword
            })

            const user=newUser.save();

            // const token=generateToken(user._id)

            res.json({
                success:true,
                message:"Sign up success"
            })
    
} catch (error) {
        console.log(error);
            res.json({
                success:false,
                message:error.message
            })
}


        


}





export const Login=async(req,res)=>{


    const {email,password}=req.body

    try {
        
        //checking user exist

        const user=await userModel.findOne({email})

        if (!user) {
            return res.json({
                success:false,
                message:"User Not found"
            })
        }

            //compairing password

            const isMatch=await bcrypt.compare(password,user.password)

            if (!isMatch) {
                return res.json({
                    success:false,
                    message:"Invalid Credentials"
                })
            }

            const token=generateToken(user._id)

            res.json({
                success:true,
                token
            })

    } catch (error) {
        console.log(error);
        res.json({
            error:error.message
        })
        
    }

}





export const adminLogin=async(req,res)=>{

                try {
                    const {email,password}=req.body

                    if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
                          const token= jwt.sign(email+password,process.env.JWT_SECRET)
                          res.json({
                            success:true,
                            token
                          })
                    }else{
                        res.json({
                            success:false,
                            message:"Invalid Credentials"
                        })
                    }

                } catch (error) {
                    console.log(error);
                    res.json({
                        success:false,
                        message:error.message
                    })
                    
                }

}

