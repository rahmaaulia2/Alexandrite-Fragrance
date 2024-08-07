"use server"
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveCookies(token: string) {
    cookies().set("Authorization", `Bearer ${token}`)
}


export default async function deleteCookies() {
    cookies().delete("Authorization")
    redirect("/login")
}

export async function addWishlist(productId: String) {
    let add = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const response = await add.json()

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        return alert(response.message)
    }
    console.log(response);

    // router.push("/login"))
}

export async function deleteWishlist(_id: string) {
    let cookie = cookies().get("Authorization")
    console.log(cookie);

    let deleteWish = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "DELETE",
        body: JSON.stringify({ _id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let response = await deleteWish.json()
    console.log(response);
    if (deleteWish) { console.log("berhasil delete") }
    // redirect('/product')
    revalidatePath('/wishlist', "layout")
}