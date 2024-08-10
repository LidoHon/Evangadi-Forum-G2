import React from 'react';
import question from '../../../assets/Untitled_design__2_-removebg-preview.png';
import think from '../../../assets/Untitled_design__4_-removebg-preview.png';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <div className="mt-12">
      <div>
        <img src={question} alt="" className="absolute left-2 top-5" />
        <img src={think} alt="" className="absolute right-1 top-5" />
        <h1 className="text-center text-7xl font-mono font-black mx-auto block mt-20">
          Don't make asking <br />
          awkward
        </h1>
        <p className="text-center mx-auto text-lg mt-6 md:w-2/5">
          No more hesitation to ask questions or answer to raised questions
          after an event. Evangadi Forum makes it easy to exchange info and keep
          the conversation going straight from your inbox.
        </p>
      </div>
      <div>
        <Link to={"/questions"}>
          <button className="bg-slate-700 text-white py-5 my-20 flex mx-auto rounded hover:bg-slate-800 hover:text-slate-200 hover:scale-105 transition-all duration-300 md:my-10 sm:px-16 md:px-20 lg:px-28 ">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
