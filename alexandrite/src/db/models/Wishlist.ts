import { z } from "zod";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export const WislistSchema = z.object({
    userId: z.instanceof(ObjectId),
    productId: z.instanceof(ObjectId),
    createdAt: z.string(),
    updatedAt: z.string()
})

type WishlisType = z.infer<typeof WislistSchema>

class Wishlist {
    static collection() {
        return database.collection<WishlisType>("wishlists")
    }

    static async getAllWishlist(userId : string){
        const agg = [
            {
              '$match': {
                'userId': new ObjectId(String(userId))
              }
            }, {
              '$lookup': {
                'from': 'products', 
                'localField': 'productId', 
                'foreignField': '_id', 
                'as': 'productDetail'
              }
            }, {
              '$unwind': {
                'path': '$productDetail', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$sort': {
                'createdAt': -1
              }
            }
          ]
        return await this.collection().aggregate(agg).toArray()
    }

    static async addWishlist(payload : WishlisType) {
        const parsedData = WislistSchema.safeParse(payload)
        if(!parsedData.success){
            throw parsedData.error
        }
        await this.collection().insertOne(payload)
        return "Success add wishlist"
    }
    static async findWishlist(payload : {userId : string, productId : string}){
        return await this.collection().findOne({userId : new ObjectId(String(payload.userId)), productId : new ObjectId(String(payload.productId))})
    }

    static async findById(_id : string){
        return await this.collection().findOne({_id : new ObjectId(String(_id))})
    }

    static async deleteWishlist(_id : string){
        return await this.collection().deleteOne({_id : new ObjectId(String(_id))})
    }
}

export default Wishlist