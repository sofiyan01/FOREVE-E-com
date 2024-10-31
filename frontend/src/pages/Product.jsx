import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const { productId } = useParams();
  const { products,currency,cartItems,addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size ,setSize]=useState("")

  useEffect(() => {
    const fetchData = () => {
      products.map(item => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image[0]); // Set the first image as default
        }
      });
    };

    fetchData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full  ">
              {productData.image?.map((item, index) => (
            <img onClick={()=>setImage(item)}
              key={index}
              src={item}
              alt={`Product ${index}`}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer " // Adjusted width for columns
            />
          ))}
              </div>
              <div className="w-full sm:w-[80%]">
          <img src={image} alt="Selected Product" className="w-full h-auto " />
        </div>
        </div>
        {/* product info */}
            <div   className="flex-1">

            <h1 className=" font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2" >
                <img  src={assets.star_icon}   className="w-3 5" alt='' />
                <img  src={assets.star_icon}   className="w-3 5" alt='' />
                <img  src={assets.star_icon}   className="w-3 5" alt='' />
                <img  src={assets.star_icon}   className="w-3 5" alt='' />
                <img  src={assets.star_dull_icon}   className="w-3 5" alt='' />
<p className="pl-2">(122)</p>
                          
            </div>

             <p  className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>   

              <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
            
              <div className="flex flex-col gap-4 my-8">
              <p> Select size</p>
                <div className="flex gap-2">
                { 
        productData.sizes.map((item, index) => (
          <button 
            onClick={() => setSize(item)}  
            className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`} 
            key={index}
          >
            {item}
          </button>
        ))
      }
                </div>
              
              </div>

              <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 " >ADD TO CART</button>

            <hr className="mt-8 sm:w-4/5"/>
           
           
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on Delivery Available on this Products</p>
            <p>Easy Return and Exchange policy within 7 days</p>

            </div> 
            </div>
      </div>

            {/* description and review */}

            <div  className="mt-20 mb-20">
              <div  className="flex">
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className="border px-5 py-3 text-sm" >Reviews (122)</p>
              </div>
      <div  className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Discover the perfect blend of style and functionality with our latest product. Designed for modern living, it combines cutting-edge technology with sleek aesthetics, making it a must-have for any home. Whether you’re looking to enhance your daily routine or elevate your lifestyle, this product delivers unparalleled performance and reliability.Our product is designed with you in mind. With a focus on quality and customer satisfaction, we’ve ensured that every detail meets the highest standards. Join the countless satisfied customers </p>
        <p>Don’t miss out on the opportunity to elevate your lifestyle with our premium product. Join the ranks of happy customers who have discovered its advantages and see for yourself why this product stands out from the competition. </p>
      </div> 
      </div>

          {/* display related products */}

          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />


    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
