"use client"
// components/SliderServer.tsx
import { useState } from 'react';
import Link from "next/link";

interface SliderProps {
  initialIndex: number;
  images: string[];
}

const Slider = ({ initialIndex, images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleBack = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(1);
    }
  };

  return (
    <>
      <div>
        {/* <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl"> */}
        {/* <div className="rounded-full bg-gray-600 text-white absolute top-5 right-5 text-sm px-2 text-center z-10">
          <span>{currentIndex}</span>/{images.length}

        </div> */}

        {images.map((image, index) => (
          <figure
            key={index}
            className={`h-96 ${currentIndex === index + 1 ? 'block' : 'hidden'}`}
          >
            <img
              src={image}
              alt="Image"
              className="absolute inset-0 z-10 h-full w-full mt-14 object-cover opacity-70"
            />
            <div className=' bg-gray-400 w-full h-full p-12'>
              <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
                <div className="col-span-6">
                  <span className="uppercase text-white text-xs font-bold mb-2 block drop-shadow-lg shadow-black">
                    WE ARE EXPERTS
                  </span>
                  <h1 className="text-white font-extrabold text-5xl mb-8 drop-shadow-lg shadow-black">
                    Discover Your Signature Scent with Our Exclusive Fragrances
                  </h1>
                  <p className="text-stone-100 text-base drop-shadow-lg shadow-black">
                    Experience the Essence of Luxury with Our Exclusive Fragrances. Elevate Your Senses and Discover a New World of Scent.
                  </p>
                  <Link href="/register">
                    <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">
                      Get started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </figure>
        ))}

        <div>
          <button
            onClick={handleBack}
            className="absolute left-14 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200"
          >
            <svg
              className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-14 top-1/2 translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-gray-100 hover:bg-gray-200"
          >
            <svg
              className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* </article> */}
      </div>
    </>
  );
};

export default Slider;

