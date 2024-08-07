import Wishlist from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    try {
        const userId = request.headers.get("x-id") as string
    // const wishlist = await 
    let data = await Wishlist.getAllWishlist(userId)
    return NextResponse.json(data)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message : "Internal server error"
        }, {status :500})
    }
    
}

export async function POST(request:Request) {
    const userId = request.headers.get("x-id") as string
    const body : {productId : string} = await request.json()
    const find = await Wishlist.findWishlist({userId, productId : body.productId})
    if(find){
        return NextResponse.json({
            message : "product already in wishlist"
        }, {
            status : 400
        })
    }
    const addWish = await Wishlist.addWishlist({
        userId : new ObjectId(String(userId)),
        productId : new ObjectId(String(body.productId)),
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString()
    })
    return NextResponse.json({
        data : addWish
    })
}

export async function  DELETE(request:Request) {
    const body : {_id : string} = await request.json()
    let find = await Wishlist.findById(body._id)
    if(!find){
        return NextResponse.json({
            message : "Product wishlist not found"
        }, {
            status : 400
        })
    }
    let del = await Wishlist.deleteWishlist(body._id)
    if(del){
        return NextResponse.json({message : "Deleted success"})
    }
}