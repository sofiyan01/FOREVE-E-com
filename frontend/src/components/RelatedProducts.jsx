import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function RelatedProducts({category,subCategory}) {
 
    const {products}=useContext(ShopContext)

    const [related,setRelated]=useState([])

    useEffect(()=>{

        if (products.length > 0) {

            let productsCopy=products.slice();

            productsCopy=productsCopy.filter((item)=>category===item.category)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)

            console.log(productsCopy.slice(0,5))
            setRelated(productsCopy.slice(0,5))
        }

    },[products])


    return (
    <div className="my-24 mt-20">
        <div className="text-center text-3xl py-2 mb-4" >
            <Title text1={"RELATED" } text2={"PRODUCT"}/>
   
        </div>
       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
    {related && related.length > 0 ? (
      related.map((item, index) => (
        <ProductItem
          key={index}
          name={item.name}
          id={item._id}
          image={item.image}

          price={item.price}
        />
      ))
    ) : (
      <p className="col-span-full text-center">No Related Product available</p>
    )}
  </div>
    </div>
  )
}

export default RelatedProducts