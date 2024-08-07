"use client"
import { useEffect, useState } from "react";
import { dataProduct } from "../page";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { addWishlist } from "@/components/action";

export default function Product() {
    const [products, setProducts] = useState<dataProduct[]>([])
    const [query, setQuery] = useState("")
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isFav, setIsFav] = useState(false)

    async function getData() {
        try {
            let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}`;
            if (query) {
                url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?name=${query}`
                setPage(1)
            }
            const response = await fetch(url);
            let dataJson: dataProduct[] = await response.json()
            if (query) {
                setProducts(dataJson)
                setHasMore(false)
            } else {
                setProducts((prev) => {
                    return [...prev, ...dataJson]
                }) //menambahkan data ke data products, dengan tidak menghapus data sebelumnya
                setPage(page + 1)
                if (dataJson.length === 0) {
                    setHasMore(false)
                }
            }
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            // console.log(response);

            // return await response.json();
            // console.log(dataJson);
        } catch (error: any) {
            console.error(error.message);
        }
    }
    useEffect(() => { getData() }, [query])

    // console.log(dataJson);

    return (
        <>
            <div className="flex justify-center">
                <div className="w-96">
                    <div className="relative rounded-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </div>
                        <input
                            type="email" name="email" id="email"
                            className="bg-neutral-200 block w-full rounded-full border-0 py-1.5 pl-10 text-white placeholder:text-white placeholder focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search" />
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Trending products
                        </h2>
                    </div>
                    <InfiniteScroll
                        dataLength={products.length}
                        next={getData}
                        hasMore={hasMore}
                        loader={<div>Loading...</div>}>
                        {/* <div className="md:w-4/5 mx-auto grid md:grid-cols-4 grid-cols-2 gap-4 mb-24"> */}
                        <div className=" mt-8" >
                            <div className="relative -mb-6 w-full overflow-x-auto pb-6">
                                <ul
                                    role="list"
                                    className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
                                >
                                    {products.map((el, index) =>
                                        <li className="inline-flex w-64 flex-col text-center lg:w-auto" key={index}>
                                            <div className="group relative" >
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                                    <img
                                                        src={el.thumbnail}
                                                        alt={el.name}
                                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                    />
                                                </div>
                                                <div className="mt-6">
                                                    <p className="text-sm text-gray-500">Alexandrite Fragrance</p>
                                                    <h3 className="mt-1 font-semibold text-gray-900">
                                                        <a href={`/product/${el.slug}`}>
                                                            <span className="absolute inset-0" />
                                                            {el.name}
                                                        </a>
                                                    </h3>
                                                    <p className="mt-1 text-gray-900">{el.excerpt}</p>
                                                    <div className="flex space-x-3 text-sm font-medium mb-4 mt-4">
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
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        {/* </div> */}
                    </InfiniteScroll>

                </div>
            </div>
        </>
    )
}