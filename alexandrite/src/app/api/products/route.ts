import Product from "@/db/models/Products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const page = searchParams.get("page")
    let dataProduct = await Product.getAllProduct(search, page)
    return NextResponse.json(dataProduct)
}

