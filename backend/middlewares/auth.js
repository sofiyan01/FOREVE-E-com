import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const {token }= req.headers 
  

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please login again.",
    });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded_token.id; // Assign userId from token

    // Log to verify userId is set in the request body
    // console.log("Request body after setting userId:", req.body);

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Token verification failed.",
    });
  }
};

export default authUser;
