import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from "../components/NewsLetterBox"

function About() {
  return (
    <div>
    <div className="text-2xl text-center pt-8 border-t">
      <Title text1={"ABOUT" }text2={"US"}/>
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16 ">
      <img className="w-full md:max-w-[480px]" src={assets.about_img} alt=''/>
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online.Our journey began with a simple idea: to provide a platform where customers can easily discover,explore,and purchase wide range of products from the comfort of their homes </p>
        <p>Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online.Our journey began with a simple idea: to provide a platform where customers can easily discover,explore,and purchase wide range of products from the comfort of their homes </p>
          <b className="text-gray-800">Our Mission</b>
          <p>Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online.Our journey began with a simple idea: to provide </p>
     
      </div>
    </div>
    <div className="text-xl py-4">
      <Title text1={"WHY"} text2={"CHOOSE US"}/>
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online </p>
      </div>
      <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online </p>
      </div>  <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className="text-gray-600">Forever was born out of a passion for innovation and a desire to resolutionize the way people shop online </p>
      </div>
    </div>
       <NewsLetterBox/>
    </div>
  )
}

export default About