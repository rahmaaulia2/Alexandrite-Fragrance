"use client"
import { dataProduct } from "@/app/(withnavbar)/page";
import Link from "next/link";
import { useState } from "react";

export default function Card({ dataW }: { dataW: dataProduct[] }) {
    // console.log(dataW);
    const [isFav, setIsFav] = useState(false)
    return (
        <>
            <link
                href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
                rel="stylesheet"
            />
            {dataW.map((el, index) =>
                <div className="  mt-8  gap-8  md:grid-cols-2 xl:grid-cols-2 " key={index}>
                    <div className="flex flex-col">
                        <div className="bg-white shadow-md  rounded-3xl p-4">
                            <div className="flex-none lg:flex">
                                <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
                                    <img
                                        src={el.thumbnail}
                                        alt={el.name}
                                        className=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl"
                                    />
                                </div>
                                <div className="flex-auto ml-3 justify-evenly py-2">
                                    <div className="flex flex-wrap ">
                                        <div className="w-full flex-none text-xs text-blue-700 font-medium ">
                                            Alexandrite Fragrance
                                        </div>
                                        <h2 className="flex-auto text-lg font-medium">
                                            {el.name}
                                        </h2>
                                    </div>
                                    <p className="mt-3" />
                                    <div className="flex py-4  text-sm text-gray-500">
                                        <div className="flex-1 inline-flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <p className="">{el.price} IDR</p>
                                        </div>
                                    </div>
                                    <div className="flex p-4 pb-2 border-t border-gray-200 " />
                                    <div className="flex space-x-3 text-sm font-medium">
                                        <div className="flex-auto flex space-x-3">
                                            <Link href={`/product/slug=${el.slug}`}>
                                                <button className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2 ">
                                                    <span>See More</span>
                                                </button>
                                            </Link>
                                        </div>
                                        <button onClick={() => { setIsFav(!isFav) }} className={isFav ? "rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4" : "rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"}>
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}