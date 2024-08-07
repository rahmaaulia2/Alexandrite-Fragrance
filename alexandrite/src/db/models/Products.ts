import { number, z } from "zod";
import { database } from "../config/mongodb";


const productSchema = z.object({
    name: z.string(), 
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type ProductType = z.infer<typeof productSchema>

class Product {
    static collection() {
        return database.collection<ProductType>("products")
    }
    static async getAllProduct(search: string | null, page: string | null) {
        let limit = 6
        let currentPage = Number(page) || 1
        if (search) {
            return await this.collection().find({ 'name': { '$regex': search || "", '$options': 'i' } }).toArray()
        }
        if (page) {
            return await this.collection().find().skip((currentPage - 1) * limit).limit(limit).toArray()
        }
        return await this.collection().find().skip((currentPage - 1) * limit).limit(limit).toArray()
    }
    static async getSlug(slug: string) {
        let dataSlug = await this.collection().findOne({ slug: slug })
        if (!dataSlug) {
            let error = new Error('Product not found')
            error.name = "NotFound"
            throw error
        }
        return dataSlug
    }

}

export default Product