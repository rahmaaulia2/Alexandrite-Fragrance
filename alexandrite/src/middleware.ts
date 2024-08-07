import { verify } from "@/db/helpers/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authorization = cookies().get("Authorization")
    // console.log(authorization);
    
    // console.log('ini masuk middleware');
    if (request.nextUrl.pathname.startsWith("/wishlist")) {
        if(!authorization?.value){
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
        if (!authorization?.value) {
            console.log("masuk if value")
            return NextResponse.json({
                err: "unauthorized"
            }, {
                status: 401
            }
            )
        }
        const [type, token] = authorization.value.split(" ")
        if (type !== "Bearer") {
            return NextResponse.json(
                {
                    err: "invalid token"
                },
                {
                    status: 401
                }
            )
        }
        const decoded = await verify<{
            id: string, 
            email: string,
            username: string
        }>(token)
        // console.log(decoded, "ini decoded");
 
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set("x-email", decoded.email)
        requestHeaders.set("x-id", decoded.id)
        requestHeaders.set("x-username", decoded.username)
        const response = NextResponse.next({
            request: {
                headers : requestHeaders
            }
        })
        return response
    }
    

}

export const config = {
    matcher: ['/api/wishlist/:path*', '/wishlist']
}