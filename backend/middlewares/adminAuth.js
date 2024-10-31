import jwt from "jsonwebtoken"

const adminAuth=(req,res,next)=>{
       
    try {
        const {token}=req.headers

        if (!token) {
            return res.json({
                success:false,
                message:"Not Authorized (Token not found)"
            })
        }

        const decode=jwt.verify(token,process.env.JWT_SECRET)
        if (decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success:false,
                message:"Not Authorized Try Again"
            })
        }
        next();
        
    } catch (error) {
        console.log(error);
        re.json({
            success:false,
            message:error.message
        })
                
    }

    }

export default adminAuth