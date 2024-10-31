import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import "../components/Collection.css"

function Collection() {

    const {products,search,showSearch}=useContext(ShopContext)

    const [showFilter,setShowFilter]=useState(false)
    const [filterProduct,setFilterProduct]=useState([])
    const [category,setCategory]=useState([])
    const [subCategory,setSubCategory]=useState([])
    const [sortType,setSortType]=useState("Relevant")

    const toggleCategory=(e)=>{

      if (category.includes(e.target.value)) {
        setCategory(prev=>prev.filter(item=>item!==e.target.value))
      }else{
        setCategory(prev=>[...prev ,e.target.value])
      }

    }



    const toggleSubCategory=(e)=>{

      if (subCategory.includes(e.target.value)) {
        setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
      }else{
        setSubCategory(prev=>[...prev,e.target.value])
      }
    }

    const applyFilter = () => {
      let productsCopy = products.slice();  // Make a shallow copy of the products array
    
      // Apply search filter
      if (showSearch && search) {
        productsCopy = productsCopy.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    
      // Apply category filter
      if (category.length > 0) {
        productsCopy = productsCopy.filter(item =>
          category.includes(item.category)
        );
      }
    
      // Apply sub-category filter
      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item =>
          subCategory.includes(item.subCategory)
        );
      }
    
      // Update the state with the filtered products
      setFilterProduct(productsCopy);
    };
    

    const sortProduct=()=>{
      let fpCopy=filterProduct.slice()

      switch(sortType){
          case "low-high":
            setFilterProduct(fpCopy.sort((a,b)=>a.price-b.price))
            break;

            case "high-low":
              setFilterProduct(fpCopy.sort((a,b)=>b.price-a.price))
              break;  

              default :
              applyFilter();
              break;
      }

    }


    useEffect(()=>{
      setFilterProduct(products)
    },[])


    useEffect(()=>{
        // console.log(subCategory)
        applyFilter();
    },[category,subCategory,search,showSearch,products])


    useEffect(()=>{
      sortProduct();
    },[sortType])

  return (
    <div  className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">


      {/* filter options */}

      <div className="min-w-60">
      <p onClick={()=>setShowFilter(!showFilter)}  className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?"rotate-90" :""}`} alt=""/>
      </p>


        {/* category filter */}

            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?"":"hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium" >CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

          {/* <p className="flex gap-2">
            
            <input type='checkbox'  onChange={toggleCategory} className="w-3" value={"Men"} />Men

          </p> */}
          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleCategory} className="w-3" value={"Women"} />Women

          </p> */}

          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleCategory} className="w-3" value="Men" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Men</p>
  </label>
</p>


<p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleCategory} className="w-3" value="Women" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Women</p>
  </label>
</p>

<p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleCategory} className="w-3" value="kids" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >kids</p>
  </label>
</p>


          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleCategory} className="w-3" value={"Kids"} />Kids

          </p> */}
          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleCategory} className="w-3" value={"Posterz"} />Posterz

          </p> */}
          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleCategory} className="w-3" value="Posterz" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Posterz</p>
  </label>
</p>

          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleCategory} className="w-3" value={"Shoes"} />Shoes

          </p> */}
          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleCategory} className="w-3" value="Shoes" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Shoes</p>
  </label>
</p>


          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleCategory} className="w-3" value={"Electronics"} />Electronics

          </p> */}
          </div>
            </div>

        {/* subcategories */}

        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter?"":"hidden"} sm:block `}>
          <p className="mb-3 text-sm font-medium" >TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

          {/* <p className="flex gap-2">
            
            <input type='checkbox'  onChange={toggleSubCategory} className="w-3" value={"Topwear"} />Topwear

          </p> */}

          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleSubCategory} className="w-3" value="Topwear" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Topwear</p>
  </label>
</p>
  

          {/* <p className="flex gap-2">
            
            <input type='checkbox'  onChange={toggleSubCategory} className="w-3" value={"Bottomwear"} />Bottomwear

          </p> */}
          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleSubCategory} className="w-3" value="Bottomwear" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Bottomwear</p>
  </label>
</p>

          
          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleSubCategory} className="w-3" value={"Winterwear"} />Winterwear

          </p> */}
          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleSubCategory} className="w-3" value="Winterwear" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Winterwear</p>
  </label>
</p>      
          
          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleSubCategory} className="w-3" value={"Hoodies"} />Hoodies

          </p> */}
          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleSubCategory} className="w-3" value="Hoodies" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Hoodies</p>
  </label>
</p>
          {/* <p className="flex gap-2">
            
            <input type='checkbox' onChange={toggleSubCategory} className="w-3" value={"Tshirt"} />Tshirt

          </p> */}

          <p className="flex gap-2">
  <label className="custom-checkbox">
    <input type="checkbox" onChange={toggleSubCategory} className="w-3" value="Tshirt" />
    <span className="checkmark"></span> {/* Ensure this is correctly styled in your CSS */}
    <p className="text-sm" >Tshirt</p>
  </label>
</p>
          {/* <p className="flex gap-2">

          </p> */}

          </div>
            </div>
      </div>

        {/* Right Side */}

            <div className="flex-1">
              <div className="flex justify-between text-base sm:test-2xl mb-4 ">
                <Title text1={"ALL"} text2={"COLLECTIONS"}/>

                  {/* product sort */}

              <select onChange={(e)=>setSortType(e.target.value)}  className="border-2 border-gray-300 text-sm px-2">

                <option  value="Relevant" >Sort by:Relevant </option>
                <option  value="low-high" >Sort by:low to high </option>
                <option  value="high-low" >Sort by:high to low </option>



              </select>

              </div>

              {/* map products */}


              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

              {
                filterProduct.map((item,index)=>
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}  />
                )
              }

              </div>


            </div>



    </div>
  )
}

export default Collection