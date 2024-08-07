import Card from '@/components/card'
import Slider from '@/components/slider';
import Footer from '@/components/footer';
import Link from 'next/link';

export const dynamic = "force-dynamic"

export interface dataProduct {
    id: string;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
}

export default async function home() {
    const images = [
        "https://images.unsplash.com/photo-1643797519086-cc9a821fbcfe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1631722670977-60c8b22dfcaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1659167664742-a592e00f5a29?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1659167746260-f6e4beaa2de7?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1626875959413-88bc29b4e3dc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    async function getData() {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/products";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            // console.log(response);
            
            return await response.json();
            // console.log(dataJson);
        } catch (error: any) {
            console.error(error.message);
        }
    }
    let dataJson: dataProduct[] = await getData()
    // console.log(dataJson);
    

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <Slider initialIndex={1} images={images} />
            </div>
            <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-600">
                        Products
                    </h2>
                    <Link
                        href="/product"
                        className="hidden text-sm font-semibold text-gray-600 hover:text-gray-500 sm:block"
                    >
                        See all
                        <span aria-hidden="true"> →</span>
                    </Link>
                </div>
            </div>
            <div className='grid grid-rows-3 grid-flow-col gap-4 justify-center p-4'>
                <Card dataW={dataJson} />
            </div>
            <div className="py-12 relative overflow-hidden bg-white">
                <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
                    <div className="w-full flex flex-col items-end pr-16">

                        <div className="h-full mt-auto overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1712565223772-1e569a991cef?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="h-full w-full object-contain"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
                        <div className="relative z-20 pl-12">
                            <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">
                                About <br />
                                Us
                            </h2>
                            <p className="text-white text-sm text-justify">
                                At Parfum Alexandrite, we are passionate about creating fragrances that inspire and captivate. <br />
                                Our journey began with a simple desire to transform the art of perfumery into an exquisite sensory experience. <br />
                                Each of our perfumes is meticulously crafted using the finest ingredients, sourced from around the world. <br />
                                Our expert perfumers blend these elements with precision and creativity, resulting in unique scents that evoke emotion and leave a lasting impression. <br />
                                We believe that a fragrance is more than just a scent, its a reflection of individuality and a powerful expression of personality. <br />
                                At Parfum Alexandrite, we invite you to discover the essence of luxury and elegance in every bottle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
