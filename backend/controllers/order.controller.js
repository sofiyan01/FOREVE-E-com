
import orderModel from "../models/orderModel.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe"

// global variable
const currency="inr"
const deliveryCharge=10

// initialize gateway
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)






//  placing order for COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,  // userId will be received from the frontend now
      items,
      amount,
      address,  // Address should be an object
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the cart after order placement
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};




// placing order using Stripe

const placeOrderStripe=async(req,res)=>{

try {
      const { userId, items, amount, address } = req.body;
      const {origin}=req.headers

    const orderData = {
      userId,  // userId will be received from the frontend now
      items,
      amount,
      address,  // Address should be an object
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };


    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items=items.map((item)=>({
      price_data:{
        currency:currency,

        product_data:{
            name:item.name
        },
        unit_amount:item.price * 100
      },
      quantity:item.quantity
    }))

      line_items.push({
        price_data:{
          currency:currency,
  
          product_data:{
              name:"Delivery Charges"
          },
          unit_amount:deliveryCharge * 100
        },
        quantity:1
          
      })

        const session=await stripe.checkout.sessions.create({
          success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
          line_items,
          mode:"payment"
        })

        res.json({
          success:true,
          session_url:session.url
        })


} catch(error) {
  console.log(error);
  res.json({
    success: false,
    message: error.message,
  });
}

}

// verify stripe

const verifyStripe=async(req,res)=>{
  const {orderId,success,userId}=req.body

      try {
          if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
        
            res.json({
                success:true
            })
  
          }else{
            await orderModel.findByIdAndDelete(orderId)
            
            res.json({
              success:false
          })
          }
        


      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });   
      }

}






// placing order using razorpay

const placeOrderRazorpay=async(req,res)=>{

}

//all orders data for admin panel

const allOrders=async(req,res)=>{


  try {
    
    const orders=await orderModel.find({})
    res.json({
      success:true,
      orders
    })

  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }

}

// all orders for user frontend

const userOrders=async(req,res)=>{

    try {
      
      const {userId}=req.body

      const orders=await orderModel.find({userId})
      res.json({
        success:true,
        orders
      })

    } catch (error) {
      console.log(error);
      res.json({
        success:false,
        message:error.message
      })
    }

}

// update order status from admin

const updateStatus=async(req,res)=>{

      try {

        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({
          success:true,
          message:"Status Updated"
        })

      } catch (error) {
        console.log(error);
        res.json({
          success:false,
          message:error.message
        })

      }

}


export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}


