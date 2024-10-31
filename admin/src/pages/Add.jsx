import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

function Add({ token }) {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubcategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const handleImageChange = (setter) => (e) => {
        setter(e.target.files[0]);
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);

            formData.append("sizes", JSON.stringify(sizes));
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setPrice("");
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
                setSizes([]); // Reset sizes if needed
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error in Add integration", error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitChange}>
            <div className="flex flex-col w-full items-start gap-3">
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor='image1'>
                        <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={handleImageChange(setImage1)} type='file' id='image1' hidden />
                    </label>
                    <label htmlFor='image2'>
                        <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={handleImageChange(setImage2)} type='file' id='image2' hidden />
                    </label>
                    <label htmlFor='image3'>
                        <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={handleImageChange(setImage3)} type='file' id='image3' hidden />
                    </label>
                    <label htmlFor='image4'>
                        <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={handleImageChange(setImage4)} type='file' id='image4' hidden />
                    </label>
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2 mt-2">Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type='text' placeholder='Type here..' required />
            </div>
            <div className="w-full">
                <p className="mb-2 mt-2">Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" placeholder='write content here' required />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className="px-3 py-2">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Posterz">Posterz</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                </div>

                <div>
                    <p>Sub category</p>
                    <select onChange={(e) => setSubcategory(e.target.value)} className="px-3 py-2">
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                        <option value="Tshirt">Tshirt</option>
                        <option value="Hoodies">Hoodies</option>
                    </select>
                </div>

                <div>
                    <p>Product price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type='number' placeholder='25' required />
                </div>
            </div>

            <div className="">
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3 mb-2">
                    {["S", "M", "L", "XL", "XXL", "28", "30", "32"].map((size) => (
                        <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller">Best Seller</label>
            </div>

            <div className="flex justify-end w-full">
                <button type='submit' className='w-[100px] text-white bg-blue-600 hover:bg-blue-700 py-2'>Add Product</button>
            </div>
        </form>
    );
}

export default Add;
