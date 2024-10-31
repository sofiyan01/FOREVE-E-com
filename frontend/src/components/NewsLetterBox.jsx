import React from 'react'

function NewsLetterBox() {

    const onsubmit=(e)=>{
            e.preventDefault();
    }
  return (
    <div className="text-center " >
        <p className="text-2xl font-medium text-gray-800" > Subscribe now and get 20% off</p>
        <p  className="text-gray-400 mt-3">dummy lorem data will add data content after some time</p>
    
        <form  onSubmit={onsubmit} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 mb-40">

            <input  className="w-full sm:flex-1 outline-none" type='email' placeholder="Enter your Email" required />
            <button  type="submit" className="bg-black text-white text-xs px-10 py-3 " >SUBSCRIBE</button>

        </form>
    
    </div>
  
)
}

export default NewsLetterBox