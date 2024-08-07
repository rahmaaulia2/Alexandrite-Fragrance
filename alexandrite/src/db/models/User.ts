import { z } from "zod";
import { database } from "../config/mongodb";
import { hashPassword } from "../helpers/bcrypt";

export const UserSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5)
})

type UserType = z.infer<typeof UserSchema>

class User {
    static collection(){
        return database.collection<UserType>("users")
    }
    static async getAllUser(){
        return await this.collection().find().toArray()
    }
    static async getOneUser(email:string){
        return await this.collection().findOne({email: email})
    }
    static async createUser(payload : UserType){
        const parsedData = UserSchema.safeParse(payload) //ini buat ngecek data yang di dapet sesuai sm userSchema atau engga
        if(!parsedData.success) {
            throw parsedData.error;
        }
        payload.password = hashPassword(payload.password)
        await this.collection().insertOne(payload)
    }
    
}

export default User