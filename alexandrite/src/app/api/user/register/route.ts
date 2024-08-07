import User from "@/db/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body: { name: string, username: string, email: string, password: string } = await request.json()
        let findUser = await User.getOneUser(body.email)
        if (findUser) {
            return NextResponse.json(
                {
                    message: "Email must be unique"
                },
                {
                    status: 400
                }
            )
        }
        await User.createUser({ name: body.name, username: body.username, email: body.email, password: body.password })
        return NextResponse.json(
            {
                message: "register success"
            },
            {
                status: 201
            }
        )
        // console.log(body);
    } catch (error: any) {
        console.log(error);

    }
}