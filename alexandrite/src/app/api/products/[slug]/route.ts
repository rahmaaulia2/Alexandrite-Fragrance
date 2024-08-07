import Product from "@/db/models/Products"
import { NextResponse } from "next/server"

type paramsSlug = {
    params : {
        slug : string
    }
}

export async function GET(request:Request, {params} : paramsSlug) {
    // const { searchParams } = new URL(request.url)
    // const slug = searchParams.get('slug') 
    // console.log(params.slug);
    
    let data = await Product.getSlug(params.slug)
    // console.log(data);
    
    return NextResponse.json(data)
}