"use client"

import { deleteWishlist } from '@/components/action';
import { useEffect, useState } from 'react';

interface wishlistType {
    _id: string,
    userId: string,
    productId: string,
    createdAt: string,
    updatedAt: string,
    productDetail: {
        _id: string,
        name: string,
        slug: string,
        description: string,
        excerpt: string,
        price: string,
        tags: string[],
        thumbnail: string,
        images: string[],
        createdAt: string,
        updatedAt: string
    }
}

const WishlistPage = () => {
    const [dataWishlist, setDataWishlist] = useState<wishlistType[]>([])
    async function getData() {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist")
        const data = await res.json()
        setDataWishlist(data)
        // return data
    }
    useEffect(() => { getData() }, [])
    // console.log(dataWishlist);

    console.log(dataWishlist[0]?.productDetail), "<<<<<<<<<<<";

    return (
        <>
            {/* <Head>
        <title>Wishlist</title>
      </Head>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-4">{product.price}</p>
                  <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">Remove from Wishlist</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
            <div className="h-screen bg-neutral-0 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Wishlist Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {dataWishlist.map((el, index) =>
                            <div key={index} className="justify-between mb-6 rounded-lg bg-neutral-700 p-6 shadow-md sm:flex sm:justify-start">
                                <img
                                    src={el.productDetail.thumbnail}
                                    // alt={el.productDetail.name}
                                    className="w-full rounded-lg sm:w-40"
                                />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-neutral-100">{el.productDetail.name}</h2>
                                        <p className="mt-1 text-xs text-neutral-100">{el.productDetail.excerpt}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        {/* <div className="flex items-center border-gray-100">
                                    <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                        -
                                    </button>
                                    <input
                                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                        type="number"
                                        defaultValue={2}
                                        min="1"
                                        style={{
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        }}
                                    />
                                    <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                        +
                                    </button>
                                </div> */}
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm text-neutral-100">{el.productDetail.price} IDR</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                                onClick={() => { deleteWishlist(el._id) }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishlistPage;
