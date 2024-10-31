import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/product.model.js"


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestSeller, sizes } = req.body;

        // Get images from req.files
        const images = [
            req.files.image1 && req.files.image1[0],
            req.files.image2 && req.files.image2[0],
            req.files.image3 && req.files.image3[0],
            req.files.image4 && req.files.image4[0]
        ].filter(item => item !== undefined);

        // Upload images to Cloudinary
        let imageUrls = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, { // Use 'path' instead of 'buffer'
                        resource_type: "image"
                    });
                    console.log(result); // Log the full Cloudinary response
                    return result.secure_url; // Ensure result.secure_url exists
                } catch (error) {
                    console.log("Cloudinary upload error:", error); // Log any Cloudinary errors
                    return null; // Return null for failed uploads
                }
            })
        );

        // Filter out null URLs
        imageUrls = imageUrls.filter(url => url !== null);

        // Creating products
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true", // Convert string to boolean
            images: imageUrls, // Store the image URLs
            sizes: JSON.parse(sizes), // Parse sizes from JSON string
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        console.log(product);
        res.json({
            success: true,
            message: "Product Added",
            product // Optionally return the added product
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message // Send error message
        });
    }
};


const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        
        res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};


const removeProduct=async(req,res)=>{

    try {
        await productModel.findByIdAndDelete(req.body.id)

        res.json({
            success:true,
            message:"Product Removed"
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message.error
        })
        
    }
}

const singleProduct=async(req,res)=>{

        const {productId}=req.body
    try {
            const product=await productModel.findById(productId)
            res.json({
                success:true,
                product
            })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
}


export {addProduct,removeProduct,listProduct,singleProduct}